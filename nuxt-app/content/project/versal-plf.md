---
title: Phylogenetic Likelihood Function using AMD Versal SoC
description: "Accelerator for important calculation in genetics using heterogenous platform with FPGA and AI engines. This project is the product of my Master thesis and confirmed my professional interest in acceleration and high-performance computing projects"
image: amd-versal.jpg
date: 2024-10
status: draft
featured: true
tags:
  - Acceleration
  - High-Performance Computing
  - FPGA
  - AI processor
  - C++
  - Master
---

My master thesis project concerned with exploring the AMD Versal Adaptive SoCs for a specific phylogenetics application. Phylogenetics is the study of evolutionary relationships of organisms, where these relationships are represented in a phylogenetic tree to uncover the evolutionary history. The Phylogenetic Likelihood Function (PLF) is an important calculation in this analysis that can take up to 95% of the total analysis time, thus has a great potential for acceleration. Previous efforts explored acceleration of the PLF using CPU vector intrinsics, GPUs and FPGAs with positive results, therefore the AMD Versal platform with both GPU-like vector processors and an FPGA on the same die seems promising to get the best of each type of processor.

::Gallery
---
path: /project/versal-plf/
images:
  - file: general-versal-plf-mapping.webp
    description: "Schematic overview of one accelerator instance. A CPU host program moves data to the AMD Versal platform, where FPGA kernels prepare this data and hand it to the AI processors that do the main PLF calculations. The output is processed by an output FPGA kernel that also applies scaling to prevent numerical underflow to finally hand the result back to the host program."
  - file: parallel-host-program.webp
    description: "Schematic overview showing the execution control of the host program over multiple instances of the accelerator. The program has multiple threads, where one thread transfers data of a PCIe lane and two threads are needed for one accelerator instance. The host program divides the load evenly over the instances."
---
::

To efficiently map the algorithm to the platform I performed a design-space exploration to understand the bandwidth of each computation component and the data movement between these components. From this multiple configurations were created, which reduced the design space to five parameters to investigate. The best performing configuration showed that this proposed system was limited by data movement (especially PCIe data movement). Comparing the system against a PLF calculation running on one high-end CPU core we can observe up to 10.6x faster performance, however when the CPU implementation uses more CPU cores we see similar performance (8 cores) or our system performing worse (16 cores). On the other hand, the PLF on the presented Versal-based system can still achieve up to 11x speedup compared to previous efforts.

<!--
Image of results
-->

This project has taught me a lot about myself, including that I am very detail-oriented, so much so that I sometimes lose sight of the bigger picture. Now that I am aware of this, I try to take a step back more often to see wheter the particular detail I am working on helps the project as a whole. Additionally, I also confirmed for myself that I really enjoy to work on optimizing a certain application for a specific platform, where the optimization can be in reduced execution time, reduce power consumption or any other metric. These kind of high-performance computing projects (especially using heterogeneous computing architectures) really excite me.

::paper{link="https://essay.utwente.nl/103959/"}
Read my thesis
::

:Gitlab{href="https://gitlab.com/utwente-graduation-versal-plf/plf-dna"}
