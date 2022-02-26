/*валидация формы*/
function validate(form, options) {
    var setings = {
        errorFunction: null,
        submitFunction: null,
        highlightFunction: null,
        unhighlightFunction: null
    };
    $.extend(setings, options);
    var $form = $(form);

    if ($form.length && $form.attr('novalidate') === undefined) {
        let validate = $form.validate({
            errorClass: 'errorText',
            focusCleanup: true,
            focusInvalid: false,
            invalidHandler: function (event, validator) {
                if (typeof (setings.errorFunction) === 'function') {
                    setings.errorFunction(form);
                }
            },
            errorPlacement: function (error, element) {
                error.appendTo(element.closest('.form_input'));
            },
            highlight: function (element, errorClass, validClass) {
                if ($(element).attr('type') === 'file') {
                    $(element).parents('.form__input--file').addClass('error')
                }

                $(element).addClass('error');
                $(element).closest('.form_row').addClass('error').removeClass('valid');
                if (typeof (setings.highlightFunction) === 'function') {
                    setings.highlightFunction(form);
                }
            },
            unhighlight: function (element, errorClass, validClass) {
                if ($(element).attr('type') === 'file') {
                    $(element).parents('.form__input--file').removeClass('error')
                }

                $(element).removeClass('error');
                if ($(element).closest('.form_row').is('.error')) {
                    $(element).closest('.form_row').removeClass('error').addClass('valid');
                }
                if (typeof (setings.unhighlightFunction) === 'function') {
                    setings.unhighlightFunction(form);
                }
            },
            submitHandler: function (form) {
                if (typeof (setings.submitFunction) === 'function') {
                    setings.submitFunction(form);
                } else {
                    popNext("#call_success", "call-popup");

                    // setTimeout(() => {
                    //     form.submit();
                    // }, 2000)
                }
            }
        });
        $('[required]', $form).each(function () {
            $(this).rules("add", {
                required: true,
                messages: {
                    required: "Поле обязательно для заполнения"
                }
            });
        });
        if ($('[type="email"]', $form).length) {
            $('[type="email"]', $form).rules("add",
                {
                    messages: {
                        email: "Невалидный email"
                    }
                });
        }
        if ($('.tel-mask[required]', $form).length) {
            $('.tel-mask[required]', $form).rules("add",
                {
                    messages: {
                        required: "Введите номер мобильного телефона."
                    }
                });
        }
        $('[type="password"]', $form).each(function () {
            if ($(this).is("#re_password") == true) {
                $(this).rules("add", {
                    minlength: 3,
                    equalTo: "#password",
                    messages: {
                        equalTo: "Неверный пароль.",
                        minlength: "Недостаточно символов."
                    }
                });
            }
        });
        $('[type="file"]', $form).each(function () {
            $(this).rules("add", {
                required: true,
                filesize_max: 1000000,
                accept: "image/jpeg, image/jpg, image/png, application/doc, application/pdf",
                messages: {
                    accept: "Разрешенные форматы jpeg, jpg, png, doc или pdf.",
                    required: "Загрузите резюме"
                }
            });
        });

        jQuery.validator.addMethod("filesize_max", function (value, element, param) {
            var isOptional = this.optional(element),
                file;

            if (isOptional) {
                return isOptional;
            }

            // let fileInput = $(this.currentElements).closest('.form__input--file');
            // console.log(fileInput);
            // fileInput.innerHTML = `<span class="form__input-name">${element.files[0].name}</span>`;

            if ($(element).attr("type") === "file") {

                if (element.files && element.files.length) {

                    file = element.files[0];

                    return (file.size && file.size <= param);
                }
            }
            return false;

        }, "Максимальный размер файла 10мб.");

        $form.on('submit', function (e) {
            e.preventDefault();

            let errorList = validate.errorList;
            let errorElement = $('.form__input--error');

            if (errorList.length < 1) {

            } else {
                errorElement.remove();

                errorList.forEach(error => {
                    let div = document.createElement('div');
                    let parent = error.element.closest('.form__input');
                    div.classList.add('form__input--error');
                    div.textContent = error.message;

                    if (parent) {
                        parent.append(div);
                    }
                });
            }
        });
    }
}

/*Отправка формы с вызовом попапа*/
function validationCall(form) {
    var thisForm = $(form);
    var formSur = thisForm.serialize();
    $.ajax({
        url: thisForm.attr('action'),
        data: formSur,
        method: 'POST',
        success: function (data) {
            if (data.trim() == 'true') {
                thisForm.trigger("reset");
                popNext("#call_success", "call-popup");
            } else {
                thisForm.trigger('reset');
            }
        }
    });
}

function popNext(popupId) {
    $.fancybox.open({
        src: popupId,
        opts: {
            afterClose: function () {
                $('form').trigger("reset");
                clearTimeout(timer);
            }
        },
    });

    let timer = null;

    timer = setTimeout(function () {
        $('form').trigger("reset");
        $.fancybox.close(popupId);
        $('.backdrop').trigger('click');
    }, 2000);
}

/*маска на инпуте*/
function Maskedinput() {
    if ($('.tel-mask')) {
        $('.tel-mask').mask('+7 (999) 999 -  99 - 99 ');
    }
}

validate('#call-popup .contact-form', {submitFunction: validationCall});
validate('#form-cooperation');
validate('#form-callback');
validate('#form-tender');
validate('#form-vacancy');
validate('#form-vacancy-page');

$(document).ready(function () {
    Maskedinput();
});

(function (window, document) {
    'use strict';
    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect) return true;
    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function () {
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function () {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };
    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
        data = localStorage.getItem('inlineSVGdata');
        if (data) {
            insert();
            return true;
        }
    }
    try {
        request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', revision);
                }

            }
        }
        request.send();
    } catch (e) {
    }
}(window, document));