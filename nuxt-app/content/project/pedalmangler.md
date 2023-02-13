---
title: PedalMangler
description: "Pitch based effect pedal router"
image: PedalMangler_top_hq2.png
date: 2020-07
featured: true
tags:
 - HKU
 - Music Information Retrieval
 - C++
---

PedalMangler is an automatic effect pedal router. It changes the pedal chain by listening to the instrument signal, retrieving information about the note being played.

The following audio clip is a demo of PedalMangler used on a guitar with a distortion on the low notes and delay on the high notes. Note this is one live guitar through PedalMangler. No cuts and no overdubs.

::Audio-wav
---
file: /project/pedalmangler/PedalMangler-Funkylick.wav
---
::

::Gallery
---
path: /project/pedalmangler/
images:
- file: PedalMangler_fulldiagram_whitebackground.png
  description:
---
::

PedalMangler is realized in collaboration with Bram Giesen en Haider Raja as part of our bachelor graduation at the Applied University of the Arts Utrecht (HKU). It is also a follow-up project on [TransientMangler](/project/transientmangler/).

The TransientMangler project exposed us to Music Information Retrieval. It got us curious about what other ways we could use the retrieved information as control signals. We wanted to see if we can change the signal routing through different effect pedals, based on the pitch of the instrument. Therefore effectivly having different timbres over the range of the instrument. Our goal was to make a hardware prototype of this.

My role within this project was to research and implement a pitch detection algorithm that could return the pitch of the note reliably and in real-time. Next to that, I aslo acted as project manager.

Due to some setbacks, including the global Covid-19 pandamic, we were unable to finish the hardware prototype. So we switched gears and put full focus on developing a fully software based implementation of PedalMangler in a VST and LV2 plugin format. This plugin can be downlaoded [here](https://pedalmangler.com/releases/v0.2/).

Our project got nominated for the HKU Awards 2020 in the category inovation.

---

::Video-mp4
---
file: /project/pedalmangler/PedalMangler-ShowReel
---
::

::Gallery
---
path: /project/pedalmangler/
images:
- file: PedalMangler_top_hq2.png
  description: Initial user interface design
- file: PedalMangler_v1.1-GUI-playtest2.png
  description: User interface of software plugin
- file: PedalMangler_v1.1_Front1.png
  description: Final user interface design
---
::

[Code on Gitlab](https://gitlab.com/csd-netwerk/dpf-plugins/pedalmangler-dpf)

[PedalMangler site](https://pedalmangler.com)
