---
title: Physical Unclonable Function
description: "AES secret key generator using a Ring Oscillator Physical Unclonable Function (RO PUF)"
image: XilinxKV260.png
date: 2023-07
status: draft
featured: true
tags:
  - FPGA
  - Security
  - Master
---

This project is part of the course _Dependable Computing Systems_ of my master Embedded Systems at the University of Twente. It has been developed in collaboration with Marten Trip and Jasper Vinkenvleugel.

A Physical Unclonable Function, or PUF for short, is a cryptographic primitive that makes use of variations in the manufacturing process of electronic chips. Every silicon wafer has impurities. From these impure wafers, chips are manufactured using lithography. This process is not able to create the exact same die every single time, thus introducing more variations. These variations are like a fingerprint for each chip. A PUF accesses this fingerprint, so that for a set of challenges given to the PUF, it will always give the same response for the same chip, but the same PUF will give a different response when implemented on a different chip. Since the behavior of the PUF is unique when implemented on different hardware, the behavior is unclonable. There are many techniques to exploit these variations. A popular technique is to use the variations in propagation delay of gates caused by the impurities.

For the course, we are tasked to create a PUF using ring oscillators. A ring oscillator uses a loop of an odd number of inverters to create a signal that oscillates. The frequency depends on how many inverters are used and their propagation delay. When the frequency of two of these ring oscillators are compared, then mostly one of the two is quicker than the other, due to the impurities of the inverters. For the same chip, the same oscillator should be faster every time this pair is measured, but for a different chip the other ring oscillator might be faster. The result of a comparison results in a 1 or a 0, depending on which oscillator "won". If this is repeated 128 times for different pairs of ring oscillators, a key is created that is unique to the chip it is generated on.

During the project, I have been mostly responsible for developing the architecture and implementing this using VHDL. The architecture has a modular design, where interfaces are designed, so that the exact implementation of each module can be changed out for other designs easily. The design also allows for use of multiple PUFs, as well as setting the amount of ring oscillators per PUF and setting the amount of inverters per ring oscillator. Therefore, the designer can easily size the PUF to a desired area.

We evaluated our design using 3 metrics: Uniqueness, Reliability and Uniformity.

I had little experience with VHDL before starting this project. I had only worked on some small enities and mostly just simulation. This project has taught me lot about modular architecture and forcing placement of elements on an FPGA using a constraints file.


::Gallery
---
path: /project/PUF-keygen/
images:
 - file:
   description:
---
::

Credits cover image: [servethehome.com](https://www.servethehome.com/xilinx-kria-kv260-fpga-based-video-ai-development-kit-is-a-huge-step/xilinx-kria-kv-260-vision-ai-starter-kit-cover/)
