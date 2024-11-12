---
title: Physical Unclonable Function
description: "An FPGA based framework for an AES secret key generator using a Ring Oscillator Physical Unclonable Function that reliably generates unique and unpredictable 128-bit AES keys"
image: XilinxKV260.png
date: 2023-07
status: publish
featured: true
tags:
  - FPGA
  - Security
  - Master
---

This project is part of the course _Dependable Computing Systems_ of my master Embedded Systems at the University of Twente. It has been developed in collaboration with Marten Trip and Jasper Vinkenvleugel.

Our goal was to design an AES secret key generator using a Physical Unclonable Function implemented on an FPGA. A Physical Unclonable Function, or PUF for short, is a cryptographic primitive that makes use of variations in the manufacturing process of electronic chips to act as a fingerprint for a specific device. The PUF needs to give a reliable response for the same request called a challenge. Ideally this response should be unique for every chip the PUF is implemented on. Therefore, the AES key that is generated for a specific challenge is evaluated on three metrics:
- **uniqueness**: the ability of one PUF to have uniquely distinguishable behavior compared to the same PUF structure implemented on different chips. Computed using inter-chip Hamming Distance, which in the ideal case is 50%
- **reliability**: the ability of the PUF to generate a consistent response R for a challenge C, regardless of any changes in the conditions of the environment. Computed using intra-chip Hamming Distance, which in the ideal case is 100%
- **uniformity**: the ability of the PUF to generate “unpredictable” responses, defined as the proportion of 0's and 1's of the response. Computed using the average Hamming Weight, which in the ideal case is 50%

A method to implement a PUF is to use a looping chain of an odd number of inverters to create a ring oscillator. The frequency of the oscillator will be determined by the impurities of the position of the chip it is implemented on. A comparison of two oscillators should always give the same answer for the same (location on the) chip, but a different answer when the same oscillators are implemented on a differnt chip. This gives one challenge response pair (CRP), thus a one bit fingerprint. To support more device fingerprints, more oscillators can be added.

::Gallery
---
path: /project/puf-keygen/
images:
  - file: ROPUF-example.webp
    description: "PUF based on ring oscillators. The frequency of the oscillators is determined by the impurities of the silicon of the specific location on the chip where they are located. Therefore, if it is implemented on a different chip or on a different location on the chip, the frequencies will be different and the result of the oscillator comparison will change based on which you test. When scaled up, it will act as a fingerprint for the specific device"
  - file: RO-block.webp
    description: "Diagram of the ring oscillator block for which the number of inverters can be set to any odd value."
  - file: PUF-block.webp
    description: "Diagram of the PUF block containing a variable amount of ring oscillators. The challenge sets the multiplexers to send the specific ring oscillators to the counters, which are constantly compared. Additionally, there is a count output for CRP space measurements"
  - file: nPUF-simplified.webp
    description: "Diagram of the top level block, called nPUF, of the PUF framework. This block has a trigger input to request a response for the challenge presented on the Challenge bus. A variable amount of RO_PUF blocks can be implemented to generate multiple responses at the same time. The results of the RO PUFs are measured after a given wait_cycles to get a stable result"
---
::

Our framework allows fine scaling controls of the PUF to fit the needs of the design in three levels of modularity: RO block, RO PUF block, nPUF block. The ring oscillator in the RO blocks have a variable amount of inverters that control the frequency, and multiple of these can be implemented in the RO PUF block to size the number of unique fingerprints. The nPUF block implements multiple RO PUF blocks to generate multiple responses for the same challenge at the same time. This allows us to generate an AES keys faster or have additional logic in the key generation algorithm for extra security measures.

We implemented a PUF with 4 RO PUF blocks, each containing 1024 ROs of 5 inverters on four AMD Kria KV260 FPGA boards. This setup shows a 49.72% uniqueness, a 99.62% reliability and 49.48% uniformity, where the reliability uses two measurements of the same chip at a high and low temperature. From these results we can see that, although for a small sample size, our framework operates close to the ideal case for a PUF (50% uniqueness, 100% reliability, 50% uniformity).

<!--
Every silicon wafer has impurities. From these impure wafers, chips are manufactured using lithography. This process is not able to create the exact same die every single time, thus introducing more variations. These variations are like a fingerprint for each chip. A PUF accesses this fingerprint, so that for a set of challenges given to the PUF, it will always give the same response for the same chip, but the same PUF will give a different response when implemented on a different chip. Since the behavior of the PUF is unique when implemented on different hardware, the behavior is unclonable. There are many techniques to exploit these variations. A popular technique is to use the variations in propagation delay of gates caused by the impurities.

For the course, we are tasked to create a PUF using ring oscillators. A ring oscillator uses a loop of an odd number of inverters to create a signal that oscillates. The frequency depends on how many inverters are used and their propagation delay. When the frequency of two of these ring oscillators are compared, then mostly one of the two is quicker than the other, due to the impurities of the inverters. For the same chip, the same oscillator should be faster every time this pair is measured, but for a different chip the other ring oscillator might be faster. The result of a comparison results in a 1 or a 0, depending on which oscillator "won". If this is repeated 128 times for different pairs of ring oscillators, a key is created that is unique to the chip it is generated on.
-->

For this project, I took the role as system architect, where I was mainly responsible for the design and development the modular architecture of the framework of the PUF. My teammates took responsibility of figuring out the VHDL constraint file to give us control over the placement of the RO blocks, to get a repeatable framework as well as taking care of the Jupyter Notebook running on the on-chip ARM core that controls the PUF. Before I started this project I had only an elementary understanding of FPGAs and VHDL, but this project allowed me to grow my understanding of FPGAs and VHDL development.

Credits cover image: [servethehome.com](https://www.servethehome.com/xilinx-kria-kv260-fpga-based-video-ai-development-kit-is-a-huge-step/xilinx-kria-kv-260-vision-ai-starter-kit-cover/)
