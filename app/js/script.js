// Selectring DOM elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");

// Empty form array
let empty = [];

// Word capitalizer
const capitalizer = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

// Render Error function
const showError = (input, message = "") => {
    const inputParent = input.parentElement;
    const errorMessage = inputParent.querySelector("small");
    errorMessage.innerText = message;
    inputParent.className = "form-control form-control--error";
};
// Render Suceess Message
const showSuccess = (input) => {
    const inputParent = input.parentElement;
    inputParent.className = "form-control form-control--success";
};
// Chech email validation with regex
function isValidEmail(emailInput) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(emailInput.value).toLowerCase()))
        showError(emailInput, `${capitalizer(emailInput.id)} is not Valid!`);
    else showSuccess(emailInput);
}

// Check username validation with regex
function isValidUsername(usernameInput) {
    const re = /^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
    if (!re.test(String(usernameInput.value).toLowerCase()))
        showError(
            usernameInput,
            `${capitalizer(usernameInput.id)} is not Valid!`
        );
    else showSuccess(usernameInput);
}

// Check for not being empty
const isRequired = function (inputArray) {
    inputArray.forEach((input) => {
        if (input.value.trim() === "" || !input.value) {
            showError(input, `${capitalizer(input.id)} is Required.`);
            empty.push(false);
        } else {
            showSuccess(input);
            empty.push(true);
        }
    });
};

const isEqual = function (input1, input2) {
    if (input1.value === input2.value && input1.value !== "") {
        showSuccess(input1);
        showSuccess(input2);
    } else if (input1.value === "" || input2.value === "") {
        showError(input1, `${capitalizer(input1.id)} is Required!`);
        showError(input2);
    } else {
        showError(input1, `${capitalizer(input1.id)} is not the Same!`);
        showError(input2);
    }
};

// Form submit listener
form.addEventListener("submit", function (eventPeram) {
    eventPeram.preventDefault();

    isRequired([username, email, password, passwordConfirm]);
    if (empty.every((value) => value === true)) {
        isEqual(password, passwordConfirm);
        isValidUsername(username);
        isValidEmail(email);
    }
});
