# PersonalWebsite
The source code for my personal website: www.geertroks.com, built using Nuxt 3, Nuxt Content and TailwindCSS. This site is designed to be simple and professional, yet playful to reflect my personality. It's main goal is to showcase my portfolio, but it also supports a blog section to share specific things I have learned.

## To Do
- [x] clickable tags
  - [x] make a tag component
  - [x] projects page filtering via query
  - [x] rewrite tag query to tag path
- [x] footer
- [x] mobile friendly site
  - [x] make navbar take less height in mobile view
  - [x] make project page image take less height in mobile view
  - [x] give text a little margin in mobile view
  - [x] fix navbar mobile menu drop down behavior into overlay behavior
  - [x] fix footer in mobile form
  - [x] homepage avatar above name in mobile view
- [ ] contact form
  - [x] add option to disable contact page, site-wide
  - [ ] send data to email
  - [ ] setup form endpoint (formspree.io? or selfhosted?)
  - [ ] OR develop an endpoint yourself
    - [ ] Setup database (mongodb of SQL)
    - [ ] setup UI like a mail service
    - [ ] filter spam/malicious form entries using regex or already existing service
    - [ ] email notifications of new messages
    - [ ] make it a separate git project, so others can use it as well
- [x] Media support for project pages
  - [x] video support
    - [x] mp4
    - [x] YouTube
  - [x] image support
    - [x] jpg
    - [x] Gallery option
    - [x] size option (max-width, max-height) -> using MDC syntax and tailwind classes
    - [x] placement options (left, right, center) -> using MDC syntax and tailwind classes
  - [x] audio support
    - [x] mp3
  - [x] Add Gitlab component
- [x] add blog
- [x] dockerize project
  - [x] dockerize nuxt project
  - [x] dockerize static file server
  - [x] orgestrate with docker compose
- [x] use `.env` file for settings
  - [x] add image server location
- [x] GitHub actions for automatic updating of content to server

- optional:
  - [ ] project view next/prev project if it is a series. Add a line under the article and then two buttons
  - [ ] Let navbar disappear when scrolling long, so more room for reading, but reappear when scrolling up (Firefox app style)


