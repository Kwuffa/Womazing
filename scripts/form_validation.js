let forms = Array.from(document.getElementsByTagName("form"));
let buttons = Array.from(document.getElementsByTagName("button"));
let success_div = document.querySelector(".pushInfSuccess");
let error_div = document.querySelector(".pushInfError");
let errorText = [];
let valid = false;

buttons.forEach(button => {
    if(button.classList.contains("submitButton")) {
        button.addEventListener("click", function(event) {
            let thisForms = forms.filter(form => form.classList.contains(event.target.classList[1]));
            let inputs = [];
            thisForms.forEach(elem => {
                const inputsInForm = Array.from(elem.getElementsByTagName('input'));
                const textAreasInForm = Array.from(elem.getElementsByTagName('textarea'));
                inputs.push(...inputsInForm, ...textAreasInForm);
            });
            event.preventDefault();
        
            const errorSpans = document.querySelectorAll('.errorSpan');
            if (errorSpans.length > 0) {
                errorSpans.forEach(function(span) {
                    span.remove();
                })
            }
            
            for (const input of inputs) {
                valid = false;
                const value = input.value;
                if (input.name === "user_name") {
                    // 1.*value; 2.*input; 3.минимальная\4.максимальная длинна.Нужна ли проверка на: 4.длинну; 5.буквы;
                    standartPattern(value, input, 2, 30, true, true);  
                };
                if (input.name === "user_e-mail") {
                    standartPattern(value, input, 0, 320, true, false);
                    if(valid == false) validateEmail(input, value);
                };
                if (input.name === "user_phone") {
                    standartPattern(value, input, 0, 0, false, false);
                    if(valid == false) validatePhone(input, value);
                };
                if (input.name === "user_country") {
                    standartPattern(value, input, 2, 64, true, true);  
                };
                if (input.name === "user_city") {
                    standartPattern(value, input, 0, 50, true, true);  
                };
                if (input.name === "user_street") {
                    standartPattern(value, input, 2, 100, true, true);  
                };
                if (input.name === "user_house") {
                    standartPattern(value, input, 2, 50, true, false);
                    (valid == false && !(/^[\p{L}\d\s/-]+$/iu).test(value))
                    ? (errorText.push("запрещены цифры и некоторые символы, "), createError(input), errorText = []) : null;
                };
                if (input.name === "user_flat") {
                    standartPattern(value, input, 0, 8, true, false);  
                    (valid == false && !(/^[0-9]+$/).test(value))
                    ? (errorText.push("введите только цифры, "), createError(input), errorText = []) : null;
                };
                if (input.name === "user_message") {
                    validLen(value, 0, 500);
                    if(errorText.length > 0){
                        createError(input);
                        errorText = [];
                    }
                };
            }
            setTimeout(() => {
                const checEerrorSpans = document.querySelectorAll('.errorSpan');
                if (checEerrorSpans.length > 0) {
                    error_div.classList.add("active");
                    success_div.classList.remove("active");
                } else {
                    success_div.classList.add("active");
                    error_div.classList.remove("active");
                }
            }, 10);
        });
    };
});
// шаблон поведения валидации
function standartPattern(value, input, minLength, maxLength, needValidLen, needValidOnlyLetters) {
    valid = value.length == 0 ? (errorText.push("поле обязательное для ввода, "), createError(input), true) : (
        !hasLeadingSpaces(value) ? (createError(input), true) : (
            needValidLen && validLen(value, minLength, maxLength),
            needValidOnlyLetters && isLettersOnly(value),
            errorText.length > 0 ? (createError(input), true) : false
        )
    );
    errorText = [];
};
// проверка на пробел
function hasLeadingSpaces(str) {
    return str !== str.trim()?(errorText.push("уберите пробел в начале, "), false):true;
};
// проверка на длинну
function validLen(value, minRequiredLength, maxRequiredLength) {
    if(value.length < minRequiredLength) errorText.push("недостаточно символов, ");   
    if(value.length > maxRequiredLength) errorText.push("слишком много символов, "); 
};
// проверка на буквы
function isLettersOnly(str) {
    if(!(/^[\p{L}\s-]+$/u).test(str)) errorText.push("запрещены цифры и некоторые символы, ");  
};
// проверка на e-mail
function validateEmail(input, email) {
    if(!(/^((([0-9A-Za-z]{1}[-0-9A-z\.]*[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]*[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u).test(email)) {
        errorText.push("некорректный синтаксис почты, ");
        createError(input);
        errorText = [];
    } 
};
// проверка на номер телефона
function validatePhone(input, phone) {
    if(!(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/).test(phone)) {
        errorText.push("некорректный синтаксис номера телефона, ");
        createError(input);
        errorText = [];
    } 
};
// создание блока ошибки
function createError(element){
    let error = document.createElement('span');
    let errorStr = errorText.join(" ").slice(0, -2);
    error.className = "errorSpan";
    error.innerText = errorStr.charAt(0).toUpperCase() + errorStr.slice(1);
    element.after(error);
};
