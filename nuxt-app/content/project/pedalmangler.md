---
title: PedalMangler
description: "Pitch based effect pedal router"
image: PedalMangler_v1.1_Front1.png
date: 2020-07
status: publish
featured: false
tags:
 - Music Information Retrieval
 - Guitar Effect
 - C++
 - Bachelor
---

PedalMangler is an automatic effect pedal router. It allows the user to assign different timbres to distinct ranges of notes on the guitar. See a short demo of PedalMangler in the video below.

::Video-mp4
---
file: /project/pedalmangler/PedalMangler-ShowReel
---
::

The following audio clip is another demo of PedalMangler used on a guitar with a distortion on the low notes and delay on the high notes.
::Audio-wav
---
file: /project/pedalmangler/PedalMangler-Funkylick.wav
---
::

PedalMangler is realized in collaboration with Bram Giesen en Haider Raja as part of our bachelor graduation at the Applied University of the Arts Utrecht (HKU). It is also a follow-up project on [TransientMangler](/project/transientmangler/).

The TransientMangler project exposed us to Music Information Retrieval. It got us curious about what other ways we could use the retrieved information as control signals. We wanted to see if we can change the signal routing through different effect pedals, based on the pitch of the instrument. Therefore effectivly having different timbres over the range of the instrument. Our goal was to make a hardware prototype of this.

My role within this project was to research and implement a pitch detection algorithm that could return the pitch of the note reliably and in real-time. Next to that, I aslo acted as project manager.

Due to some setbacks, including the global Covid-19 pandamic, we were unable to finish the hardware prototype. So we switched gears and put full focus on developing a fully software based implementation of PedalMangler in a VST and LV2 plugin format.

PedalMangler is nominated for the HKU Awards 2020 in the category inovation.


::Gallery
---
path: /project/pedalmangler/
images:
- file: enclosure-v1/PedalMangler_top_hq.png
  description: Initial user interface design front
- file: enclosure-v1/PedalMangler_back_hq2.png
  description: Initial user interface design back
- file: enclosure-v1/PedalMangler_top_hq2.png
  description: Initial user interface design
- file: enclosure-v1/PedalMangler_back_hq.png
  description: Initial user interface design
- file: PedalMangler_fulldiagram_whitebackground.png
  description: Schematic showing the signal flows through PedalMangler
- file: PedalMangler_v1.1-GUI-playtest2.png
  description: User interface of software plugin
- file: PedalMangler_v1.1_Front1.png
  description: Final user interface design
---
::

:Gitlab{href="https://gitlab.com/csd-netwerk/dpf-plugins/pedalmangler-dpf"}

