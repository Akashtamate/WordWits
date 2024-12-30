const authTitleEle = document.querySelector('.js-auth-title');
const emailIDEle = document.querySelector('.js-email-input');
const continueButtonEle = document.querySelector('.js-continue-button');
const createAccountButtonEle = document.querySelector('.js-create-account-button');
const errorContainerEle = document.querySelector('.js-error-container');
const passwordContainerEle = document.querySelector('.js-password-container-validation');
const editButtonEle = document.querySelector('.js-edit-button');
const showButtonEle = document.querySelector('.js-show-button');
editButtonEle.style.display = 'none';
const passwordInputEle = document.querySelector('.js-password-input');
const forgotPasswordEle = document.querySelector('.js-forgot-password-link');
const email = 'abc@gmail.com'; //For testing 


continueButtonEle.addEventListener('click', () => {
    handleContinueAction();
});


emailIDEle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleContinueAction();
    }
});


function handleContinueAction() {
    if (emailIDEle.checkValidity()) {
        if (emailIDEle.value !== email) {
            authTitleEle.textContent = 'Create your free account';
            createAccountButtonEle.textContent = 'Create account';
        }
        else {
            authTitleEle.textContent = 'Login to your account';
            createAccountButtonEle.textContent = 'Login';
            forgotPasswordEle.removeAttribute('id', 'hidden-forgot-password');
        }
        console.log('Email is correct');
        errorContainerEle.setAttribute('id', 'hidden');
        emailIDEle.style.border = '1px solid black';
        emailIDEle.disabled = true;
        editButtonEle.style.display = '';
        passwordContainerEle.removeAttribute('id', 'hidden-password');
        createAccountButtonEle.removeAttribute('id', 'hidden-create-account');
        continueButtonEle.style.display = 'none';

    } else {
        emailIDEle.style.border = '1px solid red';
        errorContainerEle.removeAttribute('id');
    }
}


editButtonEle.addEventListener('click', () => {
    authTitleEle.textContent = 'Login or create an account';
    emailIDEle.disabled = false;
    passwordContainerEle.setAttribute('id', 'hidden-password');
    createAccountButtonEle.setAttribute('id', 'hidden-create-account');
    forgotPasswordEle.setAttribute('id', 'hidden-forgot-password');
    continueButtonEle.style.display = '';
    editButtonEle.style.display = 'none';
    emailIDEle.value = '';
});

showButtonEle.addEventListener('click', () => {
    if(passwordInputEle.type === 'password') {
        passwordInputEle.type = 'text';
        showButtonEle.textContent = 'Hide';
    }
    else {
        passwordInputEle.type = 'password';
        showButtonEle.textContent = 'Show';
    }
});