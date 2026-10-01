let forms = Array.from(document.getElementsByTagName("form"));
let buttons = Array.from(document.getElementsByTagName("button"));
let errorText = [];
let valid = false;

let callbackground = document.querySelector(".background-for-call");
let body = document.getElementById("body");
let call_block = document.querySelector(".call_wrapper");
import { cancel_Func } from "./call_appearance.js";

buttons.forEach(button => {
    if(button.classList.contains("submitButton")) {
        button.addEventListener("click", function(event) {
            let success_div = document.querySelector(`.pushInfSuccess.${event.target.classList[1]}`);
            let error_div = document.querySelector(`.pushInfError.${event.target.classList[1]}`);
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
                    // ИСПРАВЛЕНО: Мин. длина города теперь 2
                    standartPattern(value, input, 2, 50, true, true);  
                };
                if (input.name === "user_street") {
                    // ИСПРАВЛЕНО: Последний параметр false (разрешаем цифры для улиц типа "5th Avenue")
                    standartPattern(value, input, 2, 100, true, false);  
                    (valid == false && !(/^[\p{L}\d\s/.,-]+$/iu).test(value))
                    ? (errorText.push("invalid characters, "), createError(input), errorText = []) : null;
                };
                if (input.name === "user_house") {
                    // ИСПРАВЛЕНО: Мин. длина дома теперь 1. Текст ошибки изменен.
                    standartPattern(value, input, 1, 50, true, false);
                    (valid == false && !(/^[\p{L}\d\s/-]+$/iu).test(value))
                    ? (errorText.push("invalid characters, "), createError(input), errorText = []) : null;
                };
                if (input.name === "user_flat") {
                    // ИСПРАВЛЕНО: Разрешаем буквы и дроби в номерах квартир (например, 12A или 4/2)
                    standartPattern(value, input, 1, 8, true, false);  
                    (valid == false && !(/^[\p{L}\d\s/-]+$/iu).test(value))
                    ? (errorText.push("invalid characters, "), createError(input), errorText = []) : null;
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
                    if(error_div) error_div.classList.add("active");
                    if(success_div) success_div.classList.remove("active");
                } else {
                    if(success_div) success_div.classList.add("active");
                    if(error_div) error_div.classList.remove("active");
                    Array.from(inputs).forEach((input, index) => {
                        if(event.target.classList[1] == "orderCall"){
                            setTimeout(() => {
                                input.value = "";
                            }, 300 * index);
                        }else{
                            setTimeout(() => {
                                input.value = "";
                            }, 100 * index);
                        };
                    });
                    setTimeout(() => {
                        if(event.target.classList[1] == "orderCall"){
                            if(success_div) success_div.classList.remove("active");
                            cancel_Func(callbackground, call_block, body);
                        };
                    }, 1500);
                    if(event.target.classList[1] == "orderForm"){
                        setTimeout(()=>{
                            sessionStorage.setItem('countItems', 0);
                            sessionStorage.setItem('sec_item', '<div class="items"></div>');
                            sessionStorage.setItem('orderTotal_items', '<div class="orderItems"></div>');
                            document.location = "success_page.html";
                        }, 2000);
                    };
                };
            }, 10);
        });
    };
});

function standartPattern(value, input, minLength, maxLength, needValidLen, needValidOnlyLetters) {
    valid = value.length == 0 ? (errorText.push("this field is required, "), createError(input), true) : (
        !hasLeadingSpaces(value) ? (createError(input), true) : (
            needValidLen && validLen(value, minLength, maxLength),
            needValidOnlyLetters && isLettersOnly(value),
            errorText.length > 0 ? (createError(input), true) : false
        )
    );
    errorText = [];
};

function hasLeadingSpaces(str) {
    return str !== str.trim()?(errorText.push("remove leading space, "), false):true;
};

function validLen(value, minRequiredLength, maxRequiredLength) {
    if(value.length < minRequiredLength) errorText.push("not enough characters, ");   
    if(value.length > maxRequiredLength) errorText.push("too many characters, "); 
};

function isLettersOnly(str) {
    if(!(/^[\p{L}\s-]+$/u).test(str)) errorText.push("numbers and special characters are not allowed, ");  
};

function validateEmail(input, email) {
    if(!(/^((([0-9A-Za-z]{1}[-0-9A-z\.]*[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]*[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u).test(email)) {
        errorText.push("invalid email format, ");
        createError(input);
        errorText = [];
    } 
};

function validatePhone(input, phone) {
    if(!(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/).test(phone)) {
        errorText.push("invalid phone format, ");
        createError(input);
        errorText = [];
    } 
};

function createError(element){
    let error = document.createElement('span');
    let errorStr = errorText.join(" ").slice(0, -2);
    error.className = "errorSpan";
    error.innerText = errorStr.charAt(0).toUpperCase() + errorStr.slice(1);
    element.after(error);
};