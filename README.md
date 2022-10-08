# Filmhot - AdFree Movie / Anime Watching Website

<p align="center">
  <img alt="Stars" src="https://badgen.net/github/stars/napthedev/filmhot">
  <img alt="Forks" src="https://badgen.net/github/forks/napthedev/filmhot">
  <img alt="Issues" src="https://badgen.net/github/issues/napthedev/filmhot">
  <img alt="Commits" src="https://badgen.net/github/commits/napthedev/filmhot">
</p>

## Movie sources

- LokLok App.  
  napthedev created a documentation on how to leak their API: [https://documenter.getpostman.com/view/18986031/UVXdNeFD](https://documenter.getpostman.com/view/18986031/UVXdNeFD)

## Main technology used

- React, Typescript, Tailwind
- Zustand (state management)
- SWR (data fetching)
- Firebase (authentication, comments)
- Swiper (slider)

## Features

- Full HD movies with subtitles in many languages.
- Suggested movies.
- Top searches.
- Search by names.
- Filter by regions, categories, periods.
- Discovery (short videos like Tiktok).
- Watch history.
- Comments (this feature requires a Google account).

## How to use this repo

- Clone the project.
- Run `pnpm i`/`npm i`.
- Create your own Firebase project and add VITE_FIREBASE_CONFIG to .env (see .env.example).
- Create an index in your Firebase project for collection `comments` with two field paths: movieId (Ascending) and createdAt (Descending).
- Run `pnpm build`/`npm run build`.
- Run `pnpm preview`/`npm run preview`.

## Screenshots, Preview

![Screenshot 1](https://res.cloudinary.com/naptest/image/upload/v1641805138/filmhot/filmhot_npivh7.jpg)
![Screenshot 2](https://res.cloudinary.com/naptest/image/upload/v1641805139/filmhot/filmhot-2_wprbaq.jpg)
![Screenshot 3](https://res.cloudinary.com/naptest/image/upload/v1641805139/filmhot/filmhot-3_x77nha.jpg)
![Screenshot 4](https://res.cloudinary.com/naptest/image/upload/v1641805139/filmhot/filmhot-4_l8x5h7.jpg)

## Summary

- This repo is a fork of the previously archived `https://github.com/napthedev/filmhot`, with support for PWA.
