var translation = {
    first: '|&lt; Premier',
    previous: '&lt; Précédent',
    random: 'N\'importe',
    next: 'Prochain &gt;',
    last: 'Dernier &gt;|'
  },
  startWithLast = false, 
  fileType = "png",
  suffix = "." + fileType,
  folder = 'assets/',
  pages = [
    'slogan.png',
    'bd-en-ligne.png',
    'l-austerite.png',
    'la-pub.png',
    'du-boulot.png',
    'charlie.png',
    'un-cafe.png',
    'fiat-luxe.png',
    'c-ta-crere.png',
    'time-out.png',
    'je-like-pas.png',
    'de-pis-en-pis.png',
    'toune.png',
    'le-futur-ete.png',
    'c-est_pas_gai.png',
    'le-truc.png',
    'fin-de-partie.png',
    'don-de-soi.png',
    'festival.png',
    'infortunes-du-rire.png',
    'cuisses.png',
    'sante.png',
    'automobilistes.png',
    'but-d-jouet.png',
    'qui-rira-le-dernier.png',
    'cadeau.png',
    'universel.png',
    'exil.png',
    'mise-a-jour.png',
    'presentations.png',
    'pornophiles.png',
    'faux-departs.png',
    'zero-probleme.png',
    'tribut.png',
    'chocolat.png',
    'la-joke.png'
  ],
  prevBtn = document.querySelectorAll('.prev'),
  nextBtn = document.querySelectorAll('.next'),
  firstBtn = document.querySelectorAll('.first'),
  lastBtn = document.querySelectorAll('.last'),
  randomBtn = document.querySelectorAll('.random'),
  preloadFirst = document.querySelector('.preload__first'),
  preloadPrevious = document.querySelector('.preload__previous'),
  preloadRandom = document.querySelector('.preload__random'),
  preloadNext = document.querySelector('.preload__next'),
  preloadLast = document.querySelector('.preload__last');
  prevBtn[0].innerHTML = translation.previous,
  nextBtn[0].innerHTML = translation.next,
  firstBtn[0].innerHTML = translation.first,
  lastBtn[0].innerHTML = translation.last,
  randomBtn[0].innerHTML = translation.random,
  function () {
    var urlpath = location.pathname,
    qty = pages.length - 1,
    pageNum = (startWithLast) ? pages.indexOf(urlpath.slice(1) + suffix) : 0,
    imageTag = document.querySelector('#comic'),
    setEvent = function (element, funcName) {
      for (var counter = element.length; counter > 0; ) counter--,
      element[counter].addEventListener('click', funcName)
    },
    gotoPrevious = function () {
      pageNum -= 1,
      0 > pageNum &&
      (pageNum = 0),
      updatePage()
    },
    gotoNext = function () {
      pageNum += 1,
      pageNum > qty &&
      (pageNum = qty),
      updatePage()
    },
    gotoFirst = function () {
      pageNum = 0,
      updatePage()
    },
    gotoLast = function () {
      pageNum = qty,
      updatePage()
    },
    gotoRandom = function () {
      pageNum = pages.indexOf(preloadRandom.getAttribute('data-file')),
      S = getRandomPage(),
      updatePage()
    };
    pageNum < 0 &&
    (pageNum = qty),
    setEvent(prevBtn, gotoPrevious),
    setEvent(nextBtn, gotoNext),
    setEvent(firstBtn, gotoFirst),
    setEvent(lastBtn, gotoLast),
    setEvent(randomBtn, gotoRandom);
    var updatePage = function () {
      imageTag.src = folder + pages[pageNum],
      currentURL = pages[pageNum].slice(0, - 4),
      preloadAll(),
      history.pushState(null, null, currentURL),
      pageNum === qty ? disableLastBtn() : enableLastBtn(),
      0 === pageNum ? disableFirstBtn() : enableFirstBtn()
    },
    disableLastBtn = function () {
      var e = document.querySelector('.disable--last');
      e ||
      document.querySelector('.controls').classList.add('disable--last')
    },
    enableLastBtn = function () {
      var e = document.querySelector('.disable--last');
      e &&
      document.querySelector('.controls').classList.remove('disable--last')
    },
    disableFirstBtn = function () {
      var e = document.querySelector('.disable--first');
      e ||
      document.querySelector('.controls').classList.add('disable--first')
    },
    enableFirstBtn = function () {
      var e = document.querySelector('.disable--first');
      e &&
      document.querySelector('.controls').classList.remove('disable--first')
    },
    getRandomPage = function () {
      for (var e = pageNum; e == pageNum; ) e = Math.floor(Math.random() * qty);
      return e
    },
    preloadAll = function () {
      nextComic = pageNum + 1,
      nextComic > qty &&
      (nextComic = qty),
      previousComic = pageNum - 1,
      previousComic < 0 &&
      (previousComic = 0),
      preloadFirst.src = folder + pages[0],
      preloadPrevious.src = folder + pages[previousComic],
      preloadRandom.src = folder + pages[S],
      preloadRandom.setAttribute('data-file', pages[S]),
      preloadNext.src = folder + pages[nextComic],
      preloadLast.src = folder + pages[qty]
    };
    pageNum != qty &&
    updatePage();
    var S = getRandomPage();
    preloadAll(),
    window.addEventListener(
      'popstate',
      function () {
        var e = pageNum,
        urlpath = location.pathname;
        pageNum = '' == urlpath.slice(1) ? qty : pages.indexOf(urlpath.slice(1) + suffix),
        pageNum != e &&
        (imageTag.src = folder + pages[pageNum], pageNum === qty ? disableLastBtn() : enableLastBtn(), 0 === pageNum ? disableFirstBtn() : enableFirstBtn())
      }
    )
  }();