# PersonalWebsite
The source code for my personal website: www.geertroks.com. Built with NuxtJS.

## To Do
#### Development
  - [x] clickable tags
    - [x] make a tag component
    - [x] projects page filtering via query
    - [x] rewrite tag query to tag path
  - [x] footer
  - [ ] integrate more of primary color into projects, single project and contact pages
  - [ ] Make projects load staticaly on the server (ie. remove client-only tags, but without the hydration error popping up)
  - [x] fix card date (move it to right upper corner, just below the image)
  - [ ] fix nav bar scroll issue with long scrolls (it disappears at a random time; probably because of a wrapper for the footer and overflow in the wrong div) It acctually looks good though, but has to be implementent in a more asteatically pleasing way then. For example disappear when passing the tags in a post and reapearing when scrolling up (firefox style)
  - [x] make copyright year dependent on current year
  - [x] mobile friendly site
    - [x] make nav bar take less height in mobile view
    - [x] make project page image take less height in mobile view
    - [x] give text a little margin in mobile view
    - [x] fix navbar mobile menu drop down behavior into overlay behavior
    - [x] fix footer in mobile form

#### Production:
  - [ ] write content
  - [ ] dockerize project
    - [ ] dockerize nuxt project
    - [ ] dockerize static file server
    - [ ] orgestrate with docker compose
  - [ ] use `.env` file for settings
    - [ ] add image server location
  - [ ] GitHub actions for automatic updating of content to server
