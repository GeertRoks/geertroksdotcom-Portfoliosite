---
title: Onset Effects
description: "Guitar effects augmented by onset detection"
image: RandomDelay-UIsketch.png
date: 2020-06
status: publish
featured: false
tags:
 - Bachelor
 - Music Information Retrieval
 - Onset Detection
 - Guitar Effect
---

In my bachlor thesis I researched the use for onset detection in guitar pedals. I looked into which onset detectors work well on electric guitars in a real-time environment. Also, I looked at the the creative possibilities that adding an onset detector to a guitar effect provides.

I found multiple possible configurations. I presented these configurations to professionals in different music-related fields. The results were quite mixed, but one configuration had a clear preference. This configuration is the swell mode and can be listend to in the following audio clip.

::Audio-mp3
---
file: /project/onseteffects/Swell_Mode-AutoswellerReverb.mp3
---
::

The swell mode fades an effect in and out based on the onset detection. Effectively changing the dry-wet balance automatically.

::Gallery
---
path: /project/onseteffects/
images:
- file: swellmode-parameter-diagram.png
  description: 
- file: swellmode-volume-diagram.png
  description: 
---
::

---

Currently, I am developing hardware to facilitate this effect.

![Hardware prototype](/project/onseteffects/hardware_prototype.jpg)
