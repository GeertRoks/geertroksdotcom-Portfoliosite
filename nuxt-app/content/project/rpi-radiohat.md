---
title: Raspberry Pi RadioHAT
description: A HAT for the Raspberry Pi to allow PWM audio and additional peripherals
image: DSC_0151.JPG
date: 2022-12
status: publish
featured: true
tags:
  - Raspberry Pi
  - Electronics
  - C++
  - 3D printing
---

<!-- Make an instructables! -->

For a personal need I created a digital radio and Spotify connect player. I used a Raspberry Pi Zero W and developed a custom HAT (Hardware Attached on Top) for it. 

The HAT has a mono PWM audio output, based on the design for the PedalPi by Electrosmash. I designed the HAT in a way that it can be used for other projects as well. So, there are general pins for buttons, switches and LEDs to create a custom interface and also a power section to give steady 5V power to the Pi.

The digital radio audio is obtained via MPD (Music Playing Daemon) and the Spotify Connect server is the [spotifyd](https://github.com/Spotifyd/spotifyd) library. I developed a custom bash script that interfaces between the peripherals and the code. I also setup an ALSA config to be able to switch between the two audio sources.

::Gallery
---
path: /project/rpi-radiohat/
images:
  - file: modules-separated.jpg
    description: The Raspberry Pi zero W and the RadioHAT
  - file: modules-connected.jpg
    description: The Raspberry Pi zero W and the RadioHAT connected
  - file: modules-connected-with-jack.jpg
    description:
  - file: test-setup.jpg
    description: Test setup of the system. Audio circuit on a breadboard and UI peripherals.
---
::

This project was very much in my comfort zone, but still I learned a lot of new things. Most importantly, I had never created a manufactured PCB. Until then, I only used perfboard for my projects. I quite liked the process and it was easier than I thought it would be. I will definitely do this more often in the future.

:Github{href="https://github.com/GeertRoks/rpi_radioHAT"}
