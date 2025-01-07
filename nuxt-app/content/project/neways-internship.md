---
title: NXP i.MX8M boot process security
description: Internship project where I researched the boot security measures of the NXP i.MX8M SoC in order for it to be deployed as edge device in the wild. Gathered detailed knowledge of Secure boot, ARM TrustZone, as well as inter-processor communication using RPMsg for the cooperation between an ARM application processor and ARM real-time processor.
image: variscite-nxp-som.jpg
date: 2023-12
status: publish
featured: true
tags:
  - Yocto
  - Linux
  - Security
  - C++
  - FreeRTOS
  - Master
  - Internship
---

During my master I took the opportunity to do an internship at Neways Technologies BV. in Enschede. For a smart metering project, they were interested in hardening the security of their NXP i.MX8M based edge device. My assignment was to research and report back on how to implement Secure Boot on these NXP SoCs.

Secure boot uses cryptographic keys to ensure that only the intended operating system is allowed to boot on the system and thus prevents attackers from booting the device with a malicious operating system. The operating system image is signed with a cryptographic signature (signed with a private key) and which can be verified with the public key pair at boot time. However, how do we know that the public key, that we verify the image with, has not been tampered with? We need something that we can trust, also called a root of trust. The NXP chip provides E-fuses that can be set once that can provide this root of trust.

::SingleImage
---
path: /project/neways-internship/
image:
  file: HAB-secureboot-process.webp
  description: "Diagram of the Secure Boot process for the NXP i.MX8M SoC"
---
::

To enable Secure Boot I needed to create a custom Linux image using the Yocto Project. This was my first experience with building custom images and learned a lot about the boot process of Linux based systems. 

Furthermore, since I progressed quickly, we decided to increase the scope of the project and also look into establishing a Trusted Execution Environment (TEE) with the ARM TrustZone technology. This TEE is only able to run cryptographically verified applications that can be used to offload data sensitive tasks in the user space, for example signing a message with a private key. A user space app asks the TEE for a message to be signed and receives the signed messages, without having to know what the keys is.

Finally, the company wanted to know how to establish a bidirectional communication channel between the main processor and a real-time co-processor on the SoC. I researched three methods on how to establish this connection: 1) shared memory, 2) Mailboxes and 3) Remote Processor Messaging (RPMsg). Where RPMsg is a framework integrated in the Linux Kernel that uses shared memory and mailboxes under the hood and provides an abstraction layer for easy usage in user space.

I presented my findings in a presentation to the company, as well as gave a live demo of a system that showcases each point of research in this internship. The demo system boots using Secure boot and will fail if the boot image has been tampered with. A temperature sensor is connected to the SPI bus of the system, which is read from the real-time co-processor running FreeRTOS. The main processor runs a program that requests the current temperature value, showcasing the inter processor communication using RPMsg. This user space program can also use the Trusted Execution Environment that is established with ARM TrustZone, to sign a packet containing this sensor value, as well as verify this signed packet.


::SingleImage
---
path: /project/neways-internship/
image:
  file: demo_setup.webp
  description: "Diagram of the demo system. The co-processor can read a value from the temperature sensor over SPI. The main processor can request this value using RPMsg and generate a signature for this data using the TEE established by ARM TrustZone."
---
::

The research was well received within the company, as well as by my university supervisor. I learned a lot during this experience about cryptography, building custom Linux images using the Yocto Project and inter-processor communication. I am looking forward to develop these skills further in my career.

> According to the supervisor's feedback, Geert faced the internship with a proactive attitude and carried out the required tasks very well. He also was proactive in discussing the details of his activity and showed the ability to learn quickly and improve his approach.
Geert's report was very comprehensive, particularly in its review of the state-of-the-art and standard practices in security techniques. He provided both in-depth and broad coverage of information, proving to be of great value. This report will be a foundational resource for other students pursuing research in this field.

-- <cite>University supervisor</cite>


::Document
---
path: /project/neways-internship/
file: internship-report.pdf
---
Download my internship report
::
