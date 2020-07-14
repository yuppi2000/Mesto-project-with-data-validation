
const formElement = document.querySelector('.popup'); // Воспользуйтесь методом querySelector()
const form = document.querySelector('.popup__form');
const formEdit = document.querySelector('.profile__edit-btn');
const formClosed = document.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__info_name');
const jobInput = document.querySelector('.popup__info_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');
const galleryContainer = document.querySelector('.gallery__container');
const galleryTemplate = document.querySelector('#gallery__template').content;
const addFormElement = document.querySelector('.popup-add-card');
const addForm = document.querySelector('.popup-add-card__form');
const addButton = document.querySelector('.profile__add-btn');
const addFormClosed = document.querySelector('.popup-add-card__close');
const addCardNameInput = document.querySelector('.popup-add-card__info_name');
const addCardLinkInput = document.querySelector('.popup-add-card__info_link');
const pictureBig = document.querySelector('.popup_picture_big');
const pictureImage = document.querySelector('.popup__big-image');
const pictureTitle = document.querySelector('.popup__image-title');
const pictureBigClose = document.querySelector('.popup__image-close');
const inputList = Array.from(document.querySelectorAll('input'));


function escapeClose(evt) {
  if (evt.key === 'Escape') {
    close(document.querySelector('.popup_opened'));
  };
};

function open(elem)  {
  elem.classList.add('popup_opened');
  document.body.addEventListener('keydown', escapeClose);
}

function close(elem) {
  elem.classList.remove('popup_opened');
  document.body.removeEventListener('keydown', escapeClose);
};


function clearError (elem) {
  const errorSpanList = elem.querySelectorAll('.popup__error-message');
  const errorInputList = Array.from(elem.querySelectorAll(object.inputSelector));
  const buttonElement = elem.querySelector(object.submitButtonSelector);

  elem.firstElementChild.reset();
  toggleButtonState(object.inactiveButtonClass, errorInputList, buttonElement);
  errorSpanList.forEach((span) => {
    span.classList.remove(object.errorClass);
  });
  errorInputList.forEach((input) => {
    input.classList.remove(object.inputErrorClass);
  });
}

function editForm() {
  clearError(formElement);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  open(formElement);
}



function formSubmitHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
     job.textContent = jobInput.value;
    close(formElement);
}

function zoom (evt) {
  pictureImage.setAttribute('src', evt.target.src);
  pictureTitle.textContent = evt.target.title;
  open(pictureBig);
}


function like (evt) {
  evt.target.classList.toggle('gallery__link_active');
  evt.stopPropagation();
};

function deleteCard (evt) {
  const galleryElement = evt.target.closest('.gallery__item');
  galleryElement.querySelector('.gallery__link').removeEventListener('click', like);
  galleryElement.querySelector('.gallery__image').removeEventListener('click', zoom);
  galleryElement.remove();
  evt.stopPropagation();
};

function createElement(name, link) {
  const galleryElement = galleryTemplate.cloneNode(true);
  galleryElement.querySelector('.gallery__title').textContent = name;
  galleryElement.querySelector('.gallery__title').setAttribute('title', 'gallery__item');
  const galleryImage = galleryElement.querySelector('.gallery__image');
  galleryImage.src = link;
  galleryImage.title = name;

  galleryElement.querySelector('.gallery__link').addEventListener('click', like);
  galleryElement.querySelector('.gallery__delete').addEventListener('click', deleteCard, { once: true });
  galleryImage.addEventListener('click', zoom);
  return galleryElement;
};




function addElement() {
  initialCards.forEach(({name, link}) => {
    const galleryElement = createElement(name, link);
    galleryContainer.append(galleryElement);
  });
};




function addNewCard (evt) {
  evt.preventDefault();
  const galleryElement = createElement(addCardNameInput.value, addCardLinkInput.value);
  galleryContainer.prepend(galleryElement);
  close(addFormElement);
};





formEdit.addEventListener('click', editForm);
formClosed.addEventListener('click', () => close(formElement));

form.addEventListener('submit', formSubmitHandler);
addElement();
addForm.addEventListener('submit', addNewCard);
addButton.addEventListener('click', () => {open(addFormElement); clearError(addFormElement)});
addFormClosed.addEventListener('click', () => close(addFormElement));
pictureBigClose.addEventListener('click', () => close(pictureBig));


document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    close(document.querySelector('.popup_opened'));
  };
  evt.stopPropagation();
});
