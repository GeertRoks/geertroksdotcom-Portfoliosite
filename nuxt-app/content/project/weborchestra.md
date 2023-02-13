---
title: WebOrchestra
description: "Networked live music system"
image: WebOrchestra.png
date: 2019-07
featured: false
tags:
 - HKU
 - NodeJs
 - networking
 - midi
 - audio synthesis
---

WebOrchestra is a network installation where multiple computers are combined to perform a single piece of music.

This project started out as a collaboration project with Bram Giesen and Ward Slager, in the third year of my Bachelor at the Applied University of the Arts Utrecht (HKU). We developed an interactive network installation that generated music and distributed that over multiple computers. My role within this project was to design and develop the network and server. Therefore, I learned myself NodeJS and computer networking during this project.

After this project was done, I continued on my own. I wanted to implement real-time control, so musicians would be able to play the networked computers.

I developed a network that allows for fast communication from a master to the multiple slaves over Open Sound Control (OSC). The master sends control data to the server over OSC. The server then sends this control data to the right computers. The computers run a browser in which a website is open that runs a javascript synthesizer. The OSC messages from the server control the synthesizer. I build MaxMSP patches to control the synthesizers.

::Gallery
---
path: /project/weborchestra/
images:
- file: WebOrchestra_network_setup.png
  description:
---
::

Two musicians (Stijn Cappetijn and Lauran Neerincx) who have written and performed a piece for WebOrchestra. The setup of the system they used, consists of 16 IMacs, divided into 4 groups. Each group is a single instrument. Each computer is a voice within the group it belongs to, giving the performers 4 voice polyphony. The computers are setup around the musicians and the audience is allowed to walk between the musicians and the computers, making the performace an intimate experience. The video below shows a part of that performance.

::Video-mp4
---
file: /project/weborchestra/WebOrchestra_performanceStijnLauran
---
::
