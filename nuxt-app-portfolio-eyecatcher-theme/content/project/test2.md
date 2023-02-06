---
title: Markdown style sheet
description: "All possible styles available in markdown"
image: http://localhost:3434/images/street1.jpg
date: 2022-02
featured: true
tags:
  - test
  - markdown
  - css
  - tailwindcss
  - examples
---

headers
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem. Vulputate eu scelerisque felis imperdiet. Quam vulputate dignissim suspendisse in est ante in. Quis auctor elit sed vulputate mi. Est velit egestas dui id ornare arcu odio ut sem. Turpis egestas pretium aenean pharetra magna. Sit amet commodo nulla facilisi nullam vehicula. Velit scelerisque in dictum non consectetur a. Justo nec ultrices dui sapien eget mi proin sed. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Viverra adipiscing at in tellus integer. Facilisis gravida neque convallis a cras semper. Fames ac turpis egestas sed. Eu mi bibendum neque egestas. Hendrerit dolor magna eget est lorem. Id ornare arcu odio ut sem nulla pharetra. Semper quis lectus nulla at. Viverra orci sagittis eu volutpat. Adipiscing at in tellus integer feugiat scelerisque varius morbi.

---

image

![link to photo](http://localhost:3434/images/hands.jpg)

---

link

[link to photo](http://localhost:3434/images/hands.jpg)

---

blockquote

> quote of a wise man

---

code

python
```python[file.py]{4-6,7} meta-info=val
i = 4
if i < 3:
  print("yes")
else:
  print("no")
```

javascript
```javascript[file.js]{4-6,7} meta-info=val
export default () => {
  console.log('Code block')
}
```

code inline

`/home/pi/rpi_hat` and `const int = 4;`

---

lists

- an
- unordered
- list

1. and
2. an
3. ordered
4. list

---

font types

**bold text**

_italic text_

---

table


| Key   | Type      | Description   |
|-------|-----------|---------------|
| 1     | Wonderful | Table         |
| 2     | Wonderful | Data          |
| 3     | Wonderful | Website       |


---

## Markdown Components

#### Github code test
:github

#### Gallery test

::gallery
---
images:
  - file: images/face1.jpg
    description: Wow, what a beautifull face! Look at that smile
  - file: images/face2.jpg
    description: Handsome guy, right? Very creative
  - file: images/face1.jpg
  - file: images/street1.jpg
  - file: images/hands.jpg
  - file: images/city.jpg
  - file: images/texture.jpg
  - file: images/face1.jpg
  - file: images/face2.jpg
---
::

#### Video mp4 test

::video-mp4
---
file: 'images/showcase-take2-2.mp4'
---
::

#### Video YouTube test

::video-yt
---
video_id: 'iP1AoH2Ab78'
---
::

#### Audio mp3 test

::audio-mp3
---
file: 'images/audio-test.mp3'
---
::
