<p align="center">
<h1>UNIME</h1>
</p>
<b>UNIME</b> (previously named <b>MIRAI</b>) is an anime website that provides you with anime completely free without ads.

The site: [UNIME](https://unime.vercel.app/)

![Banner](https://i.imgur.com/pHrKSHE.png)

<h2>Motivation</h2>
Before I learned HTML/CSS/Javascript to become a web developer, I'd always dreamt of creating an anime page for myself to watch without ads, which drove me to learn the necessary technology and tools required for this first "from scratch" project.

## Table of contents
- [TECHNOLOGIES](#TECHNOLOGIES-AND-SOME-DEPENDENCIES-I-USE)
- [SHOWCASE](#SHOWCASE)
- [WHAT NEED TO IMPROVE](#IMPROVE)
- [SOURCES](#SOURCES)
- [TODO](#TODO)
- [INSTALLATION](#INSTALLATION)

## TECHNOLOGIES AND SOME DEPENDENCIES I USE
- ReactJS
- HTML
- CSS
- Javascript
- Bootstrap
- Vercel
- React Router DOM
- Swiper
- AXIOS
- MUI
- etc.

*RECENTLY ADDED*:
- TailwindCSS

## SHOWCASE
<p align="center">
<h3>VIETNAMESE HOME PAGE</h3>
</p>

![HomePageVI](https://i.imgur.com/SCv7Bpf.png)

<p align="center">
<h3>ENGLISH HOME PAGE</h3>
</p>

![HomePageENG](https://i.imgur.com/37mMEmK.png)

<p align="center">
<h3>VIETNAMESE ANIME PAGE</h3>
</p>

![AnimeVI](https://i.imgur.com/A4GY1YJ.png)
<p align="center">
<h3>ENGLISH ANIME PAGE</h3>
</p>

![AnimeENG](https://i.imgur.com/ADLwhSr.jpg)
<p align="center">
<h3>VIETNAMESE INFO PAGE</h3>
</p>

![InfoPageVI](https://i.imgur.com/ZDa2qUL.png)
<p align="center">
<h3>ENGLISH INFO PAGE</h3>
</p>

![InfoPageENG](https://i.imgur.com/suSnIQy.png)
<p align="center">
<h3>IMAGE SEARCH PAGE</h3>
</p>

![ImageSearch-1](https://i.imgur.com/2VMefYl.png)
<p align="center">
<h3>IMAGE SEARCH RESULT PAGE</h3>
</p>

![ImageSearch-2](https://i.imgur.com/IuEirjO.png)
<p align="center">
<h3>WATCH PAGE</h3>
</p>

![WatchPage](https://i.imgur.com/dkfAUXU.png)
<p align="center">
<h3>LOGIN PAGE</h3>
</p>

![LoginPage](https://i.imgur.com/NOwsSmG.png)



Everything is responsive, shrink down the web page or using it on device for further more detail.

## IMPROVE
- A better way for writing these kinds of projects in the future.
- Write a better CSS, since it's my first-hand project, I did mess up the global CSS which lead me to override a lot of CSS.
- Apply more ways and technologies needed (like Redux, useMemo, useRef, etc. for more flexibility in handling data)
- Fix bugs if it's still around, but I'm trying on other projects, so progress on this will be plodding.

# SOURCES
- This is a free project, the data is from [Vuighe](https://vuighe.net/), please support them.
- Combine with [Anilist](https://anilist.co/) data and [Youtube](https://www.youtube.com/) for trailer provider and further information for anime.

*Recently added:*
- [ZoroAnime](https://zoro.to/)
- [GogoAnime](https://ww4.gogoanimes.org/)

# TODO:
- :white_check_mark: ~~VI and ENG section~~
- :white_check_mark: ~~Search anime by image~~
- :white_check_mark: ~~Watch anime~~
- :white_check_mark: ~~Anilist mapping~~
- :white_check_mark: ~~Skip intro, change episode~~
- :white_check_mark: ~~Responsive~~
- :white_check_mark: ~~Social login~~
- :white_check_mark: ~~Comments~~
- :white_check_mark: ~~Watched history~~
- :black_square_button: User profile
- Maybe more features if I have time...

# INSTALLATION
* This mostly will only work at Localhost, which in your local environment only, it'll not be available for deployment to another domain, etc.

- Simply use `git clone https://github.com/huy232/mirai.git` to clone my project to your local.
- Use `git i` to install all needed dependencies in this project.
- Place your own .env - environment file here:

![EnviromentSetup](https://i.imgur.com/SmyQZOr.png)

- Inside the .env file, set up like this:

> REACT_APP_SUPABASE_ANON_KEY  = YOUR ANON SUPABASE KEY

> REACT_APP_SUPABASE_URL = YOUR SUPABASE URL

- Go to [Supabase](https://supabase.com/) and create your own database, in there, get the `SUPABASE URL` and `SUPABASE ANON KEY`.

![EnviromentSetup-2](https://i.imgur.com/NACl9L4.png)

- Use `npm start` to run the project.
- Feel free to modify, fork and make it better.

Feel free to contact or bug report to me, if you see any better solutions, more optimized ways of coding, or just want to share it with me, I'll gladly and kindly listen to it, have a nice day!