---
title: Easily spin up Virtual Machines in Proxmox with Cloud Init
description: "Setting up a virtual machines by following the steps of the installer in a regular Linux ISO, is very repetitive and wastes a lot of time. So, in this tutorial we'll make a template for virtual machines in Proxmox. These are used to quickly spin one up."
image: proxmox-templates-thumbnail.webp
date: 2025-04
status: publish
featured: false
tags:
  - Proxmox
  - Virtualization
  - DevOps
---

In my Homelab, I like to try out technologies and learn about IT infrastructure and DevOps. For this purpose, I often want to spin up a Virtual Machine (VM) in Proxmox to create a system on which I can try some technology or try out an idea. I initially created VMs by using a Debian ISO and going through the installer. This works fine, but it takes a lot of time to start up your VM and actually get started with experimenting. Instead we can create a template in Proxmox from which you can start a VM in a predefined starting state, significantly reducing the time to get started with an experiment.

# Create a Proxmox Template
So, how do we create a Proxmox Template? We can convert any Proxmox VM to a template. Then if we use the template, the new VM will have the same state as the VM we used to convert to a template. Note, that converting a VM to a template will destroy the original VM and cannot be undone. To start, we create a VM with the base image that we want. We can do this via the web GUI or via the terminal (change values accordingly):

```sh
qm create 900 --memory 4096 --net0 virtio,bridge=vmbr0 --virtio0 local:16 --cdrom local:iso/debian-12.10.0-amd64-netinst.iso --boot c --agent=1 --cores 2 --cpu cputype=host --name debian-12-template
```

I like to use the values between 900 and 999 as my template IDs, but you can choose whatever suits you best. Start the VM (`qm start 900`) and open the VNC console to walk through the image installer. Once you went through the installer and are able to get to the shell, power off the VM. To then convert the VM to a template, we type `qm template 900`. This will destroy the VM and create a template of its state.

[// GUI]: # (In the web GUI of Proxmox you can right click on your VM and select `Convert to template`. We can use the template by right clicking on it again and select clone.)

Now that we have the template, we can clone the template and create a new VM with it using `qm clone 900 101 --full --name "cloned-debian-vm"`, where `101` is the id of the new VM.

<details>
<summary><i>Clone options: Linked vs Full clone</i></summary>
We can choose to either do a `Linked Clone` or a `Full Clone`. The linked clone always keeps a connection to its parent VM/template, meaning that if the parent is deleted, all of the children that are derived from it with a linked clone, will also be destroyed. The full clone is standalone and does not have this behavior, which is what you want in most cases. The advantage of the linked clone is that it will take a little less room on your drive, as the full clone needs to duplicate some information from the template. By default a clone of a template is linked, so we can add `--full` to create a full clone.
</details>

Once the template is cloned and we have a new VM with the same state as the template, we can start the new VM (`qm start 101`). However, you will quickly notice that the state that was stored in our template was not ideal. A main problem we may notice when making multiple copies of the template, is that all of our VMs have the same IP address. That is because each VM has the same machine id, letting the DHCP server think that all of our VMs are the same machine. We could have removed the machine id before we made the template by running `truncate -s 0 /etc/machine-id`, but that often does not solve all problems. For example, you may not want all of your VMs have the exact same user and/or password. For this exact reason, many Linux distributions publish so called Cloud versions. These images are ready to deploy and don't have an installer to walk through. Additionally, the cloud images have many configurations wiped away for you to fill in with a configuration tool like [cloud-init](https://cloudinit.readthedocs.io/en/latest/index.html#), so you can easily spin up the image in any cloud environment.

[//]: # (we need to change a few configurations to prepare it as an template. Most importantly, the ssh host keys and machine ID need to be removed, otherwise you will get the problem that all clones of the template will be identified the same and thus will get the same IP address from the DHCP server. We can remove the ssh host keys simply by `rm /etc/ssh/ssh_host_*` and empty out the machine ID with `truncate -s 0 /etc/machine-id`.)

[//]: # (These values can be repopulated with cloud-init, which is explained further on in this post. For now, just install the cloud init package with `apt install cloud-init`. Then we can )

# Cloud Images
Cloud Images can be downloaded from the sites of the Linux Distributions. Search for the name of you preferred distro with *Cloud Image* added to the search query and you will most probably find the cloud versions of your favourite distro. Often there are many variants to choose from, including specific versions for AWS, Azure and other cloud providers. For Promox, you want to look for a generic or KVM specific build. Then always be sure you pick the correct CPU architecture of the image; most people use the same CPU architecture of the host for their VMs, so an `amd64` architecture is probably the one you want. Finally, you want to be sure to have the qcow2 file of the image.

So when you found the correct image, we can download that image to our Proxmox machine using 
```
wget <url-to-cloud-image>
```

Once we have the cloud image, we can create a new VM, which we will use to create a new template. The previous template and VM can be removed using `qm destroy 900` and `qm destroy 101`. The new VM can then be created, without CD-ROM for the ISO or any disk.

```sh
qm create 900 --memory 4096 --net0 virtio,bridge=vmbr0 --agent=1 --cores 2 --cpu cputype=host --name debian-12-template
```

We will then add the cloud image as a disk to this VM using `qm disk import 900 <cloud-image> local-lvm`, where the cloud-image is the `.img` or `.qcow2` file we downloaded with `wget` and `local-lvm` refers to our storage. The disk is now available to the VM, but not yet attached. Mount the disk using `qm set 900 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-900-disk0`, where `vm-900-disk0` is the cloud image disk name we have just imported.

Some finishing touches, include setting the disk as the boot device: `qm set 900 --boot c --bootdisk scsi0`, and allowing for the VNC connections to the VM in the web GUI: `qm set 900 --serial0 socket --vga serial0`.

We now have a VM that uses a cloud image. We should not start the VM, because then a machine ID will be generated, which will be persistent when we make a template from this VM. Before we can clone the VM we should setup cloud-init for this VM.

# What is Cloud Init?

Cloud-init is an industry standard for cloud instance initialization. It allows you to parameterize certain aspects of an operating system for the instantiation and provisioning of cloud instances. This tool can be used for many cloud providers, including Proxmox, and has a [great documentation](https://cloudinit.readthedocs.io/en/latest/index.html), which includes a [good high-level overview](https://cloudinit.readthedocs.io/en/latest/explanation/introduction.html#introduction) of what cloud-init can do. Somethings that are useful to parameterize with cloud-init are: default users, ssh keys and default programs.

Proxmox has built-in support for cloud-init and you will find a dedicated tab for cloud-init for each VM in the web GUI, as well as cloud init commands in the Proxmox CLI. To make use of it we first need to add a cloud-init drive: `qm set 900 --ide2 local-lvm:cloudinit`. We can then set the default user, its ssh keys and some network settings, as well as perform an automatic package upgrade on first boot: `qm set 900 --ciuser <user-name> --sshkeys <path-to-public-ssh-key-file> --ipconfig0 "ip6=auto,ip=dhcp --ciupgrade`. To apply the changes to the cloud-init drive, run `qm cloudinit update 900`.

Now we are all set. Let's create a template of the VM with the cloud image: `qm template 900` and make a clone `qm clone 900 101 --full --name "debian-cloud-image"`. We can now quickly and easily create new VMs by cloning the template, to get started immediately with our experiments.

# Automated cloud image template generation
Creating a Cloud image template does involve some repetitive steps and thus is perfect to automate. Below you find a script that automates these steps. I have adapted this script from [Apalrd](https://www.apalrd.net/posts/2023/pve_cloud/) and added a few extra's that make creating a template a breeze. At the bottom you can define a dictionary with the URLs of the cloud images you want.

```sh
#!/bin/bash

#Path to your ssh authorized_keys file
#Alternatively, use /etc/pve/priv/authorized_keys if you are already authorized on the Proxmox system
export ssh_keyfile=/root/id_rsa.pub

#Username to create on VM template
export username=geert

#Name of your storage
export storage=local-lvm

# Create a Proxmox template
# arguments:
#   vm_id
#   vm_name
#   cloud image file (absolute path)
function create_template() {
    #Print all of the configuration
    echo "Creating template $2 ($1)"

    #Create new VM
    qm create $1 --name $2
    #Set networking to default bridge
    qm set $1 --net0 virtio,bridge=vmbr0
    #Set display to serial
    qm set $1 --serial0 socket --vga serial0
    #Set memory, cpu, type defaults
    #If you are in a cluster, you might need to change cpu type
    qm set $1 --memory 1024 --cores 2 --cpu host
    #Set boot device to new file
    qm set $1 --scsi0 ${storage}:0,import-from="$3",discard=on
    #Set scsi hardware as default boot disk using virtio scsi single
    qm set $1 --boot order=scsi0 --scsihw virtio-scsi-single
    #Enable QEMU guest agent in case the guest has it available
    qm set $1 --agent enabled=1,fstrim_cloned_disks=1
    #Add cloud-init device
    qm set $1 --ide2 ${storage}:cloudinit
    #Set CI ip config
    #IP6 = auto means SLAAC (a reliable default with no bad effects on non-IPv6 networks)
    #IP = DHCP means what it says, so leave that out entirely on non-IPv4 networks to avoid DHCP delays
    qm set $1 --ipconfig0 "ip6=auto,ip=dhcp"
    #Import the ssh keyfile
    qm set $1 --sshkeys ${ssh_keyfile}
    #Add the user
    qm set $1 --ciuser ${username}
    #Resize the disk to 8G, a reasonable minimum. You can expand it more later.
    #If the disk is already bigger than 8G, this will fail, and that is okay.
    qm disk resize $1 scsi0 8G
    #Make it a template
    qm template $1
}

# Find next available vm id
# arguments:
#   id offset (default 100)
# returns:
#   vm_id
function next_available_vmid() {
  # no argument provided: use default way
  if [ $# -eq 0 ]
    then
      echo $(pvesh get /cluster/nextid)
  fi

  # find next available vm id with offset
  start_id=$1
  current_id=$start_id
  while true; do
    if qm list | grep -q "$current_id "; then
      ((current_id++))
    else
      echo "$current_id"
      exit 0
    fi
  done

  echo current_id
}


# Create a Proxmox template from a cloud image
# arguments:
#   image_url
#   image_name (optional)
function cloud_image_template() {

  # set vm name,
  # if name is not provided use cloud image filename
  local vm_name="$2"
  if [ -z "$vm_name" ]; then
    vm_name="${1##*/}"
    vm_name="${vm_name%.*}"
  fi

  # Check if there already exists a VM (template) with the given name
  if qm list | grep -q "$vm_name "; then
    local vmids=$(qm list | grep "$vm_name " | awk '{print $1}' | paste -sd,)
    echo "VM name already exists: $vm_name ($vmids)"
    return
  fi

  # Downlaod the cloud image file and store it with the custom name
  local extension="${1##*.}"
  local cloud_image_file="/var/lib/vz/images/$vm_name.${extension}"
  wget -nc -O $cloud_image_file $1

  # create the Proxmox template from the cloud image
  echo "next available vm id: $(next_available_vmid 900)"
  create_template $(next_available_vmid 900) $vm_name $cloud_image_file
}

## Main program

# dictionary with url name combinations
declare -A distros
distros["ubuntu-2204-template"]="https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img"
distros["debian-12-template"]="https://cloud.debian.org/images/cloud/bookworm/latest/debian-12-genericcloud-amd64.qcow2"
distros["Rocky-8-template"]="http://dl.rockylinux.org/pub/rocky/8/images/x86_64/Rocky-8-GenericCloud.latest.x86_64.qcow2"
distros["Fedora-41-tempalte"]="https://download.fedoraproject.org/pub/fedora/linux/releases/41/Cloud/x86_64/images/Fedora-Cloud-Base-Generic-41-1.4.x86_64.qcow2"

for distro_name in "${!distros[@]}"; do
  cloud_image_template ${distros[$distro_name]} $distro_name
done

```

# Custom Cloud Init

The options provided by Proxmox are often enough for basic configurations, but cloud-init provides many features, including defining default programs. These options can be defined in a [cloud-config file](https://cloudinit.readthedocs.io/en/latest/explanation/about-cloud-config.html), which is part of the cloud-init standard. You can add such a cloud-config with the [Proxmox CLI](https://pve.proxmox.com/wiki/Cloud-Init_Support#_custom_cloud_init_configuration): `qm set 101 --cicustom user=local:cloud-init-user.yml`. The cloud-config file can be split up in multiple files to create a suite of configs for various cloud platforms, network configurations, or user account requirements.

