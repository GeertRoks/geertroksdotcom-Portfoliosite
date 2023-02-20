---
title: TransientMangler
description: "Real-Time pitch down effect for drums"
image: transientMangler.jpg
date: 2019-11
status: publish
featured: false
tags:
 - Bachelor
 - Music Information Retrieval
---

TransientMangler is a pitch down VST and LV2 plugin for drums. It mimiks the time warping function of Ableton in real-time. This project is a bachelor group project in collaboration with Bram Giesen and Haider Raja.

The plugin works by playing the input signal at a slower rate than normal which lowers the pitch. When a new note (or a transient) is detected the signal jumps forward so it is caught up with the current samples. This jumping forward preserves the groove of the real-time input. However, because the signal is streched, the envelope of the notes are also stretched. To compensate this, an envelope generator reshapes the envelope of the pitched down note.

::Gallery
---
path: /project/transientmangler/
images:
- file: TransientMangler-diagram.png
  description: 
---
::

My role was to find a way to detect the begining of a new note and implement it in code. This introduced me to onset detection and the field of Music Information Retrieval.

The audio example below shows the transientMangler manipulating the pitch and envelope of a drum loop.

::Audio-wav
---
file:/project/transientmangler/transientManglerDemo.wav
---
::

This project served as inspiration for my bachelor graduation project [_PedalMangler_](/portfolio/pedalmangler/) and my bachelor thesis [_Onset Effects_](/portfolio/onset_augmented_effects/).

[Code on Gitlab](https://gitlab.com/csd-netwerk/dpf-plugins/transientmangler-dpf)
