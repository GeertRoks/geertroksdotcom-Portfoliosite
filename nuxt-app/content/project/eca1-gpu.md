---
title: GPU accelerated algorithm
description: "A GPU accelerated 2D convolution algorithm resulting in 230 times increased throughput for distance measuring robot"
image: eca1-scanning-robot.png
date: 2022-10
featured: true
tags:
 - Hardware Acceleration
 - Nvidia CUDA toolkit
 - C++
 - Master
---

This project is part of the course _Embedded Computer Architectures I_ of my master course at the University of Twente. It has been developed in collaboration with Thijs Bink, Jelle Hierck and Luuk van der Weide.

Our objective was to improve the performance of a 2D convolution algorithm. The input for the algorithm is the distance data of a scanning robot. The robot scans an arc of about 160&deg; in 80 steps and reports the distance to any objects between itself and 3 meters using the ultrasonic distance sensor. The firmware of the robot has been developed by us as well earlier in the course.

The exercise forced us to transform the distance vector into a matrix of 80 x 300. This matrix is the input data for the convolution algorithm, which tries to smoothen the data as pre-processing for object detection.

We had no pre-existing knowledge of working with GPUs and so we dove deep into the Nvidia CUDA toolkit documentation. We discovered many optimization parameters and so we built a simple tool that helped us optimize for these. Our main concerns were to optimize block and warp utilization as well as using the least conditional statements as GPUs do not have any branch prediction. However, the latter did not have as much influence as we expected it to have.

To see our improvements, we measured the performance of the convolution algorithm on a single thread of a CPU. The baseline had a throughput of about 1600 matrices per second. We developed 3 methods to increase the throughput using an Nvidia GPU. All of these resulted in significant throughput improvements, where the best performance had a throughput of 374756 matrices per second. That is 230 times faster than the baseline. We had the best improvements of our class and were rewarded with a perfect score of 10 out of 10.

::Gallery
---
path: /project/eca1-gpu/
images:
 - file: eca1-CUDA-explaination.png
   description: This image shows the hierarchy of a Nvidia GPU. Each thread of the GPU runs a kernel with the convolution algorithm, which access all memory surrounding the element the thread represents. These threads are bundled in blocks and all these blocks together construct the CUDA grid. The CUDA grid spans the complete application. Each block runs on a physical streaming multiprocessor of the GPU.
 - file: eca1-methods.png
   description: "The three methods used. 1.) Exact Fit: The CUDA grid only contains elements than can be calculated, since the convolution needs memory from around itself, the edges also need to be allocated. So 78 x 298 threads have to be divided into equal blocks with an area that is a multiple of 32 to optimize warp utilization. 2.) Conditional Fit:Since the Exact fit method has a size that is not easily dividable over equal blocks, it is hard to find good candidates. The conditional fit adds a conditional statement that checks if the thread that is called is within the memory that is allocated. If it is outside, it will skip that thread and if is in, it will execute the convolution code. This allows for easier sizing of the blocks. 3.) Memory padded: This method tries to improve on both previous methods. It fixes the sizing problem, by adding zeroes on the edge of the input data, so the CUDA grid spans 80 x 300 and therefore it also avoids using conditional statements, because all memory that needs to be accessed is allocated."
 - file: eca1-results.png
   description: "Results of our experiments. This graphs shows the results of our three methods where the Y-axis shows the improvement compared to the baseline. Also two methods of processing the data are shown. To get our results we calculate the convolution of a matrix for 100000 times. The for-loop method calls each iteration individually in a for-loop, where the Z-dim method calls a 3D matrix with a z-depth of 100000, so the GPU can balance the load over multiple iterations."
---
::
