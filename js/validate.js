
const object = {
  form: '.popup__form',
  inputSelector: '.popup__info',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_error',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error-message_active'
};


const showInputError = (object, form, elem, errorMessage) => {
  const errorElement = form.querySelector(`#${elem.id}-error-message`);
  elem.classList.add('popup__error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};


const hideInputError = (object, form, elem) => {
  const errorElement = form.querySelector(`#${elem.id}-error-message`);
  elem.classList.remove('popup__error');
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};


const isValid = (object, form, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(object, form, formInput, formInput.validationMessage);
  } else {
    hideInputError(object, form, formInput);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
    buttonElement.disabled = true;

  } else {
    buttonElement.classList.remove(object.inactiveButtonClass);
    buttonElement.disabled = false;

  }
};

const setEventListeners = (object, form) => {
  const inputList = Array.from(form.querySelectorAll(object.inputSelector));
  const buttonElement = form.querySelector(object.submitButtonSelector);
  toggleButtonState(object, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', ()=> {
      isValid(object, form, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
  });
};




const enableValidation = (validationOptions) => {
  const formList = Array.from(document.querySelectorAll(validationOptions.form));
  formList.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(validationOptions, form);
  })
};

enableValidation(object);
