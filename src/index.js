import 'babel-polyfill';

import { el, mount } from 'redom';
import { createForm } from './createForm.js';
import visa from './assets/images/visa.svg';
import mastercard from './assets/images/mastercard.svg';
import mir from './assets/images/mir.svg';
import unionpay from './assets/images/unionpay.svg';
import americanExpress from './assets/images/american-express.svg';
import dinersClub from './assets/images/diners-club.svg';
import jcb from './assets/images/jcb.svg';

const valid = require('card-validator');

const container =document.getElementById('app');

// const container = el('div', {
//     className: 'container',
// });
const onlineForm = createForm();

mount(container, onlineForm.box);

let imageEl;
let _isValid;
const regExpEmale = /\.[a-z]{2,6}$/i;

function createDataValidAtributeFalse(input) {
    input.setAttribute('data-valid', false);
    _isValid = input.dataset.valid;
}
  
function createDataValidAtributeTrue(input) {
    input.setAttribute('data-valid', true);
    _isValid = input.dataset.valid;
}
  
function showErrorMessage(errorMessage, input) {
    errorMessage.style.display = 'block';
    input.classList.add('is-invalid');
}
  
function hideErrorMessage(errorMessage, input) {
    errorMessage.style.display = 'none';
    input.classList.remove('is-invalid');
}
  
function createImagePay(src) {
    imageEl = el('img', {
      className: 'img-fluid position-absolute',
      src: src,
      style: {
        top: '3px',
        right: '10px',
        width: '50px',
        borderRadius: '15px',
      },
    });
}
  
function getDataInput() {
    let cardNumberData = onlineForm.cardNumber.dataset.valid;
    let cardExpirationDateData = onlineForm.cardExpirationDate.dataset.valid;
    let cardCvcData = onlineForm.cardCvc.dataset.valid;
    let emailData = onlineForm.email.dataset.valid;
  
    const isDisabled =
      cardNumberData !== 'true' ||
      cardExpirationDateData !== 'true' ||
      cardCvcData !== 'true' ||
      emailData !== 'true';
      onlineForm.formButton.disabled = isDisabled;
}
  
onlineForm.cardNumber.addEventListener('blur', () => {
    let numberValidation = valid.number(onlineForm.cardNumber.value);
  
    if (!numberValidation.isPotentiallyValid) {
      imageEl?.remove();
      showErrorMessage(onlineForm.cardNumberErrorMessage, onlineForm.cardNumber);
      createDataValidAtributeFalse(onlineForm.cardNumber);
      getDataInput();
    } else {
      hideErrorMessage(onlineForm.cardNumberErrorMessage, onlineForm.cardNumber);
      createDataValidAtributeTrue(onlineForm.cardNumber);
      getDataInput();
    }
  
    if (numberValidation.card) {
        if (numberValidation.card.type === 'visa') {
            imageEl?.remove();
            createImagePay(visa);
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'mastercard') {
            imageEl?.remove();
            createImagePay(mastercard);
            imageEl.style.top = 0;
            imageEl.style.height = '38px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'mir') {
            imageEl?.remove();
            createImagePay(mir);
            imageEl.style.top = '-6px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'american-express') {
            imageEl?.remove();
            createImagePay(americanExpress);
            imageEl.style.top = '-2px';
            imageEl.style.height = '40px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'jcb') {
            imageEl?.remove();
            createImagePay(jcb);
            imageEl.style.top = '-4px';
            imageEl.style.height = '45px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'unionpay') {
            imageEl?.remove();
            createImagePay(unionpay);
            imageEl.style.top = '-4px';
            imageEl.style.height = '45px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
        if (numberValidation.card.type === 'diners-club') {
            imageEl?.remove();
            createImagePay(dinersClub);
            imageEl.style.top = '-4px';
            imageEl.style.height = '45px';
            mount(onlineForm.cardNumberLabel, imageEl);
        }
    }
});
  
onlineForm.cardExpirationDate.addEventListener('blur', () => {
    let cardExpiration = valid.expirationDate(
        onlineForm.cardExpirationDate.value
    );

    if (!cardExpiration.isPotentiallyValid) {
    showErrorMessage(
        onlineForm.cardExpirationDateErrorMessage,
        onlineForm.cardExpirationDate
    );
    createDataValidAtributeFalse(onlineForm.cardExpirationDate);
    getDataInput();
    } else {
    hideErrorMessage(
        onlineForm.cardExpirationDateErrorMessage,
        onlineForm.cardExpirationDate
    );
    createDataValidAtributeTrue(onlineForm.cardExpirationDate);
    getDataInput();
    }
});
  
onlineForm.cardCvc.addEventListener('blur', () => {
    let cvcValid = valid.cvv(onlineForm.cardCvc.value);

    if (!cvcValid.isValid) {
    showErrorMessage(onlineForm.cardCvcErrorMessage, onlineForm.cardCvc);
    createDataValidAtributeFalse(onlineForm.cardCvc);
    getDataInput();
    } else {
    hideErrorMessage(onlineForm.cardCvcErrorMessage, onlineForm.cardCvc);
    createDataValidAtributeTrue(onlineForm.cardCvc);
    getDataInput();
    }
});
  
onlineForm.email.addEventListener('blur', () => {

    if (!onlineForm.email.value.match(regExpEmale)) {
        showErrorMessage(onlineForm.emailErrorMessage, onlineForm.email);
        createDataValidAtributeFalse(onlineForm.email);
        getDataInput();
      } else {
        hideErrorMessage(onlineForm.emailErrorMessage, onlineForm.email);
        createDataValidAtributeTrue(onlineForm.email);
        getDataInput();
      }
});
  
onlineForm.form.addEventListener('submit', e => {
    e.preventDefault();

    cardNumber.value = '';
    cardExpirationDate.value = '';
    cardCvc.value = '';
    email.value = '';
});
  







