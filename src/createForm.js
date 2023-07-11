import { el, setChildren } from 'redom';
import IMask from 'imask';
import moment from 'moment';


export function createForm() {
    const box = el('div', {
        className: 'box',
    });
    const h1 = el('h1', 'Форма онлайн оплаты');

    const form = el('form', {
        className: 'form d-flex flex-column',
        action: '#',
    });

    const cardNumberLabel = el('label', {
        className: 'mb-3 position-relative',
        for: 'card',
    });

    const cardNumber = el('input', {
        className: 'form-control',
        id: 'cardNumber',
        placeholder: 'Введите номер карты',
        'data-valid': 'false',
        required: true,
    });

    const cardNumberErrorMessage = el(
        'span',
        'Введите номер карты в нужном формате XXXX X...',
        {
        className: 'error-message position-absolute text-danger',
        style: { top: '-20px', left: '10px', display: 'none' },
        }
    );

    const cardExpirationDateLabel = el('label', {
        className: 'mb-3 position-relative',
        for: 'cardExpirationDate',
    });

    const cardExpirationDate = el('input', {
        className: 'form-control',
        id: 'cardExpirationDate',
        placeholder: 'ММ/ГГ',
        'data-valid': 'false',
        required: true,
    });

    const cardExpirationDateErrorMessage = el(
        'span',
        'Введите срок действия карты в формате ХХ/ХХ',
        {
        className: 'error-message position-absolute text-danger',
        style: { top: '-20px', left: '10px', display: 'none' },
        }
    );

    const cardCvcLabel = el('label', {
        className: 'mb-3 position-relative',
        for: 'cardCvc',
    });

    const cardCvc = el('input', {
        className: 'form-control',
        id: 'cardCvc',
        placeholder: 'Введите CVC/CVV',
        'data-valid': 'false',
        required: true,
    });

    const cardCvcErrorMessage = el(
        'span',
        'Введите CVC/CVV (3 цифры на обороте карты)',
        {
        className: 'error-message position-absolute text-danger',
        style: { top: '-20px', left: '10px', display: 'none' },
        }
    );

    const emailLabel = el('label', {
        className: 'mb-3 position-relative',
        for: 'email',
    });

    const email = el('input', {
        type: 'email',
        className: 'form-control',
        id: 'email',
        placeholder: 'Введите email для отправки онлайн-чека',
        'data-valid': 'false',
        required: true,
    });

    const emailErrorMessage = el(
        'span', 'Введите email в формате xxx@xx.xx', {
        className: 'error-message position-absolute text-danger',
        style: { top: '-20px', left: '10px', display: 'none' },
    });

    const formButton = el('button', 'Оплатить', {
        className: 'btn btn-primary w-25',
        disabled: 'true',
    });

    setChildren(cardNumberLabel, [cardNumber, cardNumberErrorMessage]);
    setChildren(cardExpirationDateLabel, [
        cardExpirationDate,
        cardExpirationDateErrorMessage,
    ]);
    setChildren(cardCvcLabel, [cardCvc, cardCvcErrorMessage]);
    setChildren(emailLabel, [email, emailErrorMessage]);

    setChildren(form, [
        cardNumberLabel,
        cardExpirationDateLabel,
        cardCvcLabel,
        emailLabel,
        formButton,
    ]);

    setChildren(box, [h1, form]);

    const momentFormat = 'MM/YY';
    // let month;
    // let year;

    IMask(
        cardNumber,
        {
        mask: /^[0-9]\d{0,16}$/,
        mask: '0000 0000 0000 0000',
    });

    IMask(
        cardExpirationDate,
        {
        mask: Date,
        pattern: momentFormat,
        lazy: false,
        min: new Date,
    
        format: function (date) {
            return moment(date).format(momentFormat);
        },
        parse: function (str) {
            return moment(str, momentFormat);
        },
    
        blocks: {
            YY: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 99, 
            maxLength: 2,
            },
            MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
            }
        }
    });
  
    IMask(
        cardCvc,
        {
        mask: /^[0-9]\d{0,3}$/,
        mask: '000',
    });
  
    IMask(
        email,
        {
        mask: /^[a-z0-9A-Z]\S*@?\S*$/,
        });
  
    if(cardNumber.value){
        isValid(cardNumber.value);
    }

    return {
        box,
        form,
        cardNumberLabel,
        cardNumber,
        cardNumberErrorMessage,
        cardExpirationDateLabel,
        cardExpirationDate,
        cardExpirationDateErrorMessage,
        cardCvcLabel,
        cardCvc,
        cardCvcErrorMessage,
        emailLabel,
        email,
        emailErrorMessage,
        formButton,
      };
}
