---
title: SSH configuration file
description: "This tutorial shows how to use the SSH config file to easily use ssh keys to connect to a server"
image: 
date: 2024-06
status: publish
featured: false
tags:
  - Linux
  - SSH
  - Ansible
---

[//]: # (blog post about ~/.ssh/config file)
[//]: # (Refer to ansible as that was why I looked at it)

## Step 1: Generate SSH keys
To connect to a server using ssh keys, we first need an ssh key. This key can be generated using the `ssh-keygen` command.
```bash
ssh-keygen -f ~/.ssh/server1 -t ed25519
```
The command has flags for adapting the key to your needs. The `-f` flag sets the filename of the key. Use a more descriptive name than the `server1` example here. The default location for an ssh key is in `~/.ssh/`, which is recommended to stick to. The `-t` flag sets the type of the key, where `rsa` is the default, but this key type is getting a bit outdated. The newer Ed25519 algorithm is both faster and more secure for its key size. RSA is more broadly supported, but support for Ed25519 is quickly catching up and is now supported for most common connections (Github, Gitlab, OpenSSH for connection to a remote machine). So, in most cases I would recommend to use `Ed25519` and for the cases it is not supported, look into `rsa` with a key size of at least 2048 bits (key size is specified using the `-b` flag).

## Step 2: Copy the public key to the machine
  The `ssh-keygen` command generates two files. In my example it will generate `server1` and `server1.pub` in the `~/.ssh` directory. The file without file extension is the private key, which needs to stay secret and you should not share. The file ending in `.pub` is the public key, which can be shared with the remote machine. These public and private keys are part of an asymmetric key cryptography strategy. This [Computerphile video](https://www.youtube.com/watch?v=GSIDS_lvRv4) explains the concept well.

The public key needs to be shared with the remote machine you want to connect to. You can do this manually by copying and pasting this key, but there also exists an easy to use command for this task. The `ssh-copy-id` command copies the public key specified using the `-i` flag to a specific user on the remote machine you want to log into. Change the example to match your situation.

```bash
ssh-copy-id -i ~/.ssh/server1.pub geert@192.168.1.4
```

You can now connect to the server using `ssh` and the generated ssh key.

```bash
ssh -i ~/.ssh/server1 geert@192.168.1.4
```

Notice that you don't have to provide a password anymore!

## Step 3: Add host configuration to SSH config file

To make the connection you do need to write a pretty long command, which can be shorted by specifying its details in an ssh configuration file.

```bash
vim ~/.ssh/config
```

In this config file you can add information about the connection, like the hostname (in this example its the local IP address of the server), user and ssh key. The config file consists of sections which start with a `Host`. This is like an alias.

```
Host server1
  HostName 192.168.1.4
  User geert
  IdentityFile ~/.ssh/server1
```

## Step 4: Test the connection

You can now connect to the `server1` machine by simply calling

```bash
ssh server1
```

And you are automatically signed in as the `geert` user on the remote machine without having to type a password.

## Step 5: Add more configurations

Repeat the steps for all ssh connections you regularly need and create a new section for each of them in the config file.

It is also possible to use the pattern matching characters for the `Host` to apply a certain configuration to every connection. The pattern characters are:
  - `*`: wildcard that matches zero or more characters
    - for example `Host *` will match all aliases and `Host 192.168.1.*` will match the whole `192.168.1.0/24` subnet
  - `?`: wildcard that matches exactly one character
    - for example `Host server?` will match the word server with any character added to it, so `server1`, but also `servers`
  - `!`: negates the host that comes after it
    - for example `Host * !server1` will match all aliases, except for `server1`

With these patterns you can make very complex configurations, giving you a lot of control, but sticking to a system where each section targets one remote connection is fine for most users that only need a handful of connections.


## Additional configurations

The `ssh` command obtains its configuration in a specific precedence order:
  1. command line options (specified with `-o` for the `ssh` command)
  2. user configuration options (specified in `~/.ssh/config`)
  3. system-wide configuration options (specified in `/etc/ssh/ssh_config`)

If you want to use multiple users for a remote host, then there are many ways to achieve this. A simple way is to leave out the `User` from the `~/.ssh/config` file. To connect to the device then use `ssh root@server1` or any other user. Otherwise, if most of the time you use a specific user, but occasionally want to use a different user, then you can temporarily overwrite the `User` option by specifying a new user on the command line, like so: `ssh -o "User=root" server1`. Lastly, the `ssh` command also has the `-F` option, which allows the user to set a different configuration file for the connection, which defaults to `~/.ssh/config`. So, one can also create a configuration file per user and select the desired configuration with the `-F` flag. Which method to choose mostly depends on your goals. I would advice to select the method that allows you to write the least amount of extra flags in your `ssh` command. Also, this example showed these options for the `User` option, but it can of course be done for any other option.

Some other useful options for the ssh configuration file are:
  - `Port`: sets the port number to connect on the remote (default: 22)
  - `PasswordAuthentication`: specifies whether it is allowed to connect to the remote using a password (default: yes)
  - `IdentitiesOnly`: specifies whether only the configured identity (ssh key) can be used (default: no)
  - `ForwardX11`: automatically allows for graphical apps to forward their display over the ssh connection, which is similar to specifying `ssh -X server1` (default: no)

All SSH configuration options can be found using the command `man ssh_config` or on the [ssh_config man page](https://www.man7.org/linux/man-pages/man5/ssh_config.5.html).

## Example configuration
