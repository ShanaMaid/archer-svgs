a = new Archer();
a.setConfig({
  svgs: {
    bb: {
      url: '//raw.githubusercontent.com/ShanaMaid/archer-svgs/master/svgs/user-plus-fill.svg',
      version: 1
    },
    cc: {
      url: '//raw.githubusercontent.com/ShanaMaid/archer-svgs/master/svgs/music.svg',
      version: 1,
      cache: false,
    },
  }
});
// a.downloadSvg('bb');
a.startPreFetch();