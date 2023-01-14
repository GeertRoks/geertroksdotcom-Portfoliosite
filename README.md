# PersonalWebsite
The source code for my personal website: www.geertroks.com. Built with NuxtJS.

## To Do
#### Development
  - [x] clickable tags
    - [x] make a tag component
    - [x] projects page filtering via query
    - [x] rewrite tag query to tag path
  - [x] footer
  - [x] integrate more of primary color into projects, single project and contact pages
  - [x] Make projects load staticaly on the server (ie. remove client-only tags, but without the hydration error popping up) -> only shows in dev mode, so no problem
  - [x] fix card date (move it to right upper corner, just below the image)
  - [x] fix nav bar scroll issue with long scrolls 
  - [x] make copyright year dependent on current year
  - [x] mobile friendly site
    - [x] make nav bar take less height in mobile view
    - [x] make project page image take less height in mobile view
    - [x] give text a little margin in mobile view
    - [x] fix navbar mobile menu drop down behavior into overlay behavior
    - [x] fix footer in mobile form
    - [x] homepage avatar above name in mobile view
  - [ ] make contact form operational
    - [ ] send data to email
    - [ ] setup form endpoint (formspree.io? or selfhosted?)
  - [ ] Media support for project pages
    - [ ] video support
      - [ ] mp4
      - [ ] Youtube
    - [ ] image support
      - [ ] jpg
      - [ ] Gallery option
      - [ ] size option (max-width, max-height)
      - [ ] placement options (left, right, center)
    - [ ] audio support
      - [ ] mp3
    - [ ] project view next/prev project if it is a series. Add a line under the article and then two buttons

  - optional:
    - [ ] Let navbar disapear when scrolling long, so more room for reading, but reapear when scrolling up (firefox app style)
    - [ ] add blog

#### Production:
  - [ ] write content
  - [ ] dockerize project
    - [x] dockerize nuxt project
    - [x] dockerize static file server
    - [ ] orgestrate with docker compose
  - [ ] use `.env` file for settings
    - [ ] add image server location
  - [ ] GitHub actions for automatic updating of content to server


### Color feedback
  - all buttons same color + hover
  - line under navbar
  - hover over navbar elements + color for active page
  - line under headings for extra color
  - hover over social buttons (same as local links)
  - footer white for less attention
  - buttons under project page for other projects and back to all projects
  - tags not clickable in cards, but use a filter on top
  - Social buttons svg gray-100 (same as background)
  - headers left allign or center?
  - vertical line left next to homepage title/about for accent  (possiblity)
  - contact page: alternative layout with 2/3 contact form on left and picture on right
