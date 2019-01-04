<h1 align='center'>archer-svgs</h1>
<p align='center'>
  <a href="https://travis-ci.com/ShanaMaid/archer-svgs/">
    <img src="https://travis-ci.com/ShanaMaid/archer-svgs.svg" alt="travis ci badge">
  </a>
  <img src='https://img.shields.io/npm/v/archer-svgs.svg?style=flat-square' alt="version">
  <img src='https://img.shields.io/npm/l/archer-svgs.svg' alt="license">
  <img src='http://img.badgesize.io/https://unpkg.com/archer-svgs/lib/index.css?compression=gzip&label=gzip%20size:%20CSS&style=flat-square'>
  <img src='https://img.shields.io/npm/dt/archer-svgs.svg?style=flat-square' alt="downloads">
  <img src='https://img.shields.io/npm/dm/archer-svgs.svg?style=flat-square' alt="downloads-month">
  <a href='https://blog.shanamaid.top/archer-svgs/'><img src='https://img.shields.io/badge/website%20-archer-51b26d.svg'/></a>
</p>

English | [🇨🇳简体中文](./README-cn.md)

> wow, infinite svgs!You can use archer-svgs to load svg async and cache it in local storage, when you reuse svg without http request!Thin your js-bundle forever!

![](./demo/static/demo.gif)

> If you think so, support me with a star and a follow 😘

## Contents
* [Install](#install)
  * [npm](#npm)
  * [yarn](#yarn)
* [How to design?](#how-to-design)
  * [Init](#init)
  * [Prefetch](#prefetch)
* [Can I use?](#can-i-use)

### Install
#### npm
```bash
npm install archer-svgs
```
#### yarn
```bash
yarn add archer-svgs
```
### How to Design
#### Init
![](./demo/static/init.jpg)

### Prefetch
![](./demo/static/prefetch.jpg)

### Can I use?
`archer-svgs` based on `fetch` and `localStorage`.For `fetch`, use [whatwg-fetch](https://github.com/github/fetch) to `polyfill`!In other word, you can use archer-svgs if your brower support `xhr` and `localStorage`!As shown in the figure below:
![localStorage](./demo/static/ls.png)
![XMLHttpRequest](./demo/static/xhr.png)

## Contributos

## archer-svgs is Inspired or Powered By:
- [ionicons](https://github.com/ionic-team/ionicons)