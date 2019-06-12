navFixer();
menuToggler();
backgroundChanger();
slider();
photoOpener();
form();

function navFixer() {
  const navigation = document.querySelector('.navigation');
  if(window.pageYOffset > 0) {
    navigation.classList.add('navigation--fixed');
  }
  window.addEventListener('scroll', () => {
    if(window.pageYOffset > 0) {
      navigation.classList.add('navigation--fixed');
    }
    else navigation.classList.remove('navigation--fixed');
  });
};

function menuToggler() {
  let menu = document.querySelector('.navigation__list');
  let menuBtn = document.querySelector('.navigation__menu-btn');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('navigation__list--active');
  });
};

function backgroundChanger() {
  let img1 = document.querySelector('.img-1');
  img1.classList.add('burnout');
  let img2 = document.querySelector('.img-2');


  img1.addEventListener('transitionend', () => {
      if (img1.classList.contains('burnin')) {
        img1.classList.remove('burnin');
        img1.classList.add('burnout');
      }
      else if (img1.classList.contains('burnout')) {
        setTimeout(() => {
          img1.classList.remove('burnout');
          img1.style.opacity = '0';
        }, 2000);
        img2.style.zIndex = '-2';
        img2.classList.add('burnin');
        img2.style.opacity = '1';
      }
  });

  img2.addEventListener('transitionend', () => {
      if (img2.classList.contains('burnin')) {
        img2.classList.remove('burnin');
        img2.classList.add('burnout');
      }
      else if (img2.classList.contains('burnout')) {
        setTimeout(() => {
          img2.classList.remove('burnout');
          img2.style.opacity = '0';
        }, 2000);
        img2.style.zIndex = '-4';
        img1.classList.add('burnin');
        img1.style.opacity = '1';
      }
  });
};

function slider() {
  const container = document.querySelector(".photoset");
  const carousel = document.querySelector(".photoset__carousel");
  const cards = carousel.querySelectorAll(".photoset__photo");
  const leftButton = 'photoset__btn--left';
  const rightButton = 'photoset__btn--right';

  let cardWidth;
  let offset = 0;
  let badOffset;

  container.addEventListener('click', slide);

  function slide() {
    let direction = 0;
    cardWidth = cards[0].offsetWidth;
    badOffset = offset % cardWidth;
    if (event.target.classList.contains(leftButton) && offset < 0) {
      direction = 1;
    }
    else if (event.target.classList.contains(rightButton) && 
    offset > (-cardWidth * (cards.length - 3))) {
      direction = -1;
    }
    offset += (cardWidth * direction - badOffset) ;
    carousel.style.transform = `translateX(${offset}px)`;
  };
};

function photoOpener() {
  
  const photoset = document.querySelector('.photoset');
  let overlay = document.querySelector('.page__overlay');
  let container = document.querySelector('.opened');
  let leftButton = document.querySelector('.opened__btn--left');
  let rightButton = document.querySelector('.opened__btn--right');
  let photos = document.querySelectorAll('.photoset__img');
  photoset.addEventListener('click', () => {
    openPhoto(event.target);
  });
  overlay.addEventListener('click', () => {
    closePhotos();
  });

  leftButton.addEventListener('click', () => {
    let current;
    for (let i = 0; i < photos.length; i++) {
      if(photos[i].classList.contains('maximized')) {
        current = i;
      }
    }
    if (current > 0) {
      document.querySelector('.photo-opened').src = photos[current - 1].dataset.original;
      photos[current].classList.remove('maximized');
      photos[current - 1].classList.add('maximized');
    }
  });
  rightButton.addEventListener('click', () => {
    let current;
    for (let i = 0; i < photos.length; i++) {
      if(photos[i].classList.contains('maximized')) {
        current = i;
      }
    }
    if (current < photos.length - 1) {
      document.querySelector('.photo-opened').src = photos[current + 1].dataset.original;
      photos[current].classList.remove('maximized');
      photos[current + 1].classList.add('maximized');
    }
  });

  function openPhoto(target) {
    if(target.classList.contains('photoset__img')) {
      target.classList.add('maximized');
      overlay.style.display = 'block';
      container.style.display = 'block';
      let photoOpened = document.createElement('img');
      photoOpened.src = target.dataset.original;
      photoOpened.alt = target.alt;
      photoOpened.classList.add('photo-opened');
      container.appendChild(photoOpened);
    };
  };

  function closePhotos() {
    if (document.querySelector('.maximized')) {
      document.querySelector('.maximized').classList.remove('maximized');
      let images = container.querySelectorAll('.photo-opened');
      for (let image of images) {
        container.removeChild(image);
      }  
      container.style.display = '';
      overlay.style.display = '';
    };
  };
};

function form() {
  let phone = document.querySelector('.widget__input');
  let phoneSubmit = document.querySelector('.widget__btn');
  let navSubmit = document.querySelector('.navigation__btn');
  let mainForm = document.querySelector('.main-form');
  let mainFormName = document.querySelector('.main-form__name');
  let mainFormComment = document.querySelector('.main-form__comment');
  let mainFormSubmit = document.querySelector('.main-form__submit');
  let mainFormPhone = document.querySelector('.main-form__phone');
  let overlay = document.querySelector('.page__overlay');
  let feedback = document.querySelector('.page__server-feedback');

  overlay.addEventListener('click',() => {
    mainForm.style.display = 'none';
    overlay.style.display = 'none';
    feedback.style.display = 'none';
    phone.value = mainFormPhone.value;
  });

  phoneValidator(phone);
  phoneValidator(mainFormPhone);
  formOpener(navSubmit);
  formOpener(phoneSubmit);
  nameValidator(mainFormName);
  function phoneValidator(phone) {
    phoneValidate();
    phone.addEventListener('focus', () => {
      if (phone.value == '' || phone.value == '+' || phone.value == '+7') {
        phone.value = '+7 '; 
      };
      phone.style.boxShadow = '';
    });
    phone.addEventListener('blur', () => {
      if (phone.value == '+7 ' || phone.value == '+7' || phone.value == '+') {
        phone.value = ''; 
      };
      phoneValidate();
    });
    phone.addEventListener('keypress', () => {
      if (!/\d/.test(event.key)) {
        event.preventDefault();
      };

      if (phone.value.match(/\d/g).length >= 11) {
        event.preventDefault();
      };

      if (phone.value.match(/\d/g).length == 4) {
        phone.value = '+7 (' + (phone.value.match(/\d\d\d/g))[0] + ') ';
      };
      if (phone.value.match(/\d/g).length == 7) {
        (phone.value = '+7 (' + (phone.value.match(/\d\d\d/g))[0] + ') '
        + (phone.value.match(/\d\d\d/g))[1] + ' ');
      };
      if (phone.value.match(/\d/g).length == 9) {
        (phone.value = '+7 (' + (phone.value.match(/\d\d\d/g))[0] + ') '
        + (phone.value.match(/\d\d\d/g))[1] + ' ' + phone.value.match(/\d/g)[7] + phone.value.match(/\d/g)[8] + ' ');
      };
    });
    function phoneValidate() {
      if (phone.value && phone.value.match(/\d/g).length >= 11) {
        phone.style.boxShadow = 'rgb(0, 255, 0) 0px 0px 1.5px 1px';
        phone.dataset.validated = 'true'; 
      }
      else phone.dataset.validated = 'false';
    };
  }

  function nameValidator(name) {
    function nameValidate() {
      if(/[A-Za-zА-Яа-яЁё]+/.test(name.value)) {
        name.style.boxShadow = 'rgb(0, 255, 0) 0px 0px 1.5px 1px';
        name.dataset.validated = 'true';
        console.log(name.dataset.validated);
      }
      else name.dataset.validated = 'false';
    };
    nameValidate();
    name.addEventListener('blur', nameValidate);
    name.addEventListener('focus', () => {
        name.style.boxShadow = '';
    });
  };
    

  function formOpener(btn) {
    btn.addEventListener('click', () => {
      event.preventDefault();
      overlay.style.display = 'block';
      mainForm.style.display = 'flex';
      mainFormPhone.value = phone.value;
    });
  };
  mainFormSubmit.addEventListener('click', () => {
    event.preventDefault();
    if (mainFormName.dataset.validated == 'false') {
      mainFormName.style.boxShadow = 'rgb(255, 0, 0) 0px 0px 1.5px 1px';
      console.log('Wrong name');
      return;
    };
    if (mainFormPhone.dataset.validated == 'false') {
      mainFormPhone.style.boxShadow = 'rgb(255, 0, 0) 0px 0px 1.5px 1px';
      console.log('Wrong phone number');
      return;
    };
    const server = 'https://ethabyssserver.herokuapp.com/'
    let xhr = new XMLHttpRequest();  
    xhr.open('POST', server, true);

    xhr.send(JSON.stringify({
      "name" : mainFormName.value,
      "phone" : mainFormPhone.value,
      "comment" : mainFormComment.value
    }));

    xhr.onload = function() {
      mainForm.style.display = 'none';
      feedback.style.display = 'block';
      feedback.innerText = 'Запрос успешно отправлен!';
    };
    xhr.onerror = function() {
      mainForm.style.display = 'none';
      feedback.style.display = 'block';
      feedback.innerText = 'Запрос не удалось отправить :с';
    };
      // получить результат из this.responseText или this.responseXML
  });
};