//取得 Store options
const storeOptions = $('#stores > option')
  .map(function () {
    return this.value;
  })
  .get();

//取得 input
const $form = $('form');
const $formError = $('form .form__footer__error');

//Store
addRule('#store', function (value) {
  if (value.trim() === '') {
    return 'required';
  }
  if (!storeOptions.includes(value)) {
    return 'not result';
  }
});

//Name
addRule('#customer-name', function (value) {
  if (value.trim() === '') {
    return 'required';
  }
  if (!/^[\u4e00-\u9fa5a-zA-Z]+$/.test(value)) {
    return 'wrong format';
  }
});

//Phone
addRule('#customer-phone', function (value) {
  if (value.trim() === '') {
    return 'required';
  }
  if (!/^09[0-9]{8}$/.test(value)) {
    return 'wrong format';
  }
});

//Consumption amount
addRule('#consumption-amount', function (value) {
  if (value.trim() === '') {
    return 'required';
  }
  if (Number(value) <= 0) {
    return 'wrong format';
  }
});

//Submit
$form.on('submit', function (e) {
  e.preventDefault();
  $form.find('input').change();
  const $btnIcon = $form.find('.form__footer__btn img').first();
  const $btnText = $form
    .find('.form__footer__btn .form__footer__btn-text')
    .first();
  const errors = $form
    .find('.form__panel__item__error')
    .filter(function () {
      return this.textContent.trim() !== '';
    })
    .get();
  const firstError = errors[0] ? errors[0].textContent : null;
  if (firstError) {
    //failure
    $form.removeClass('form--success');
    $form.addClass('form--failure');
    $btnIcon.attr('src', '../images/failure.svg');
    $btnIcon.css('display', 'block');
    $btnText.text('failure');
    $formError.text(firstError);
  } else {
    //success
    $form.removeClass('form--failure');
    $form.addClass('form--success');
    $btnIcon.attr('src', '../images/success.svg');
    $btnIcon.css('display', 'block');
    $btnText.text('success');
    $formError.text('');
  }
});

function addRule(input, validator) {
  $(input).on('change', function (e) {
    const value = e.target.value;
    const $listItem = $(input).parents('.form__panel__item');
    const $error = $listItem.find('.form__panel__item__error');

    const error = validator(value);

    if (error) {
      $(this).css('border', '3px solid #E06D6D');
      $error.text(error);
    } else {
      $error.text('');
    }
  });
}

//取得wrap的高度並放入intro內
$(window).on('resize', function () {
  var $wrapHeight = $('.intro .wrap').outerHeight(true);
  const $intro = $('.intro');
  $intro.css('height', $wrapHeight);
});
