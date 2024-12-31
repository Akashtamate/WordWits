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
const autFormContianer = document.querySelector('.js-auth-form-container');
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

forgotPasswordEle.addEventListener('click', () => {
    autFormContianer.style.display = 'none';
    authTitleEle.textContent = 'Verify your email address';
    createDivToVerifyEmail();
});

function createDivToVerifyEmail() {
    const verifyEmailContainer = document.createElement('div');
    verifyEmailContainer.classList.add('verify-email-container', 'js-verify-email-container');

    const mailSpanEle = document.createElement('span');
    mailSpanEle.classList.add('mail-span', 'js-mail-span');
    mailSpanEle.textContent = emailIDEle.value;

    const headerTwoContentEle = document.createElement('h2');
    headerTwoContentEle.classList.add('header-two-content', 'js-header-two-content');
    headerTwoContentEle.appendChild(document.createTextNode('Enter the code we sent to '));
    headerTwoContentEle.appendChild(mailSpanEle);
    headerTwoContentEle.appendChild(document.createTextNode(' to update your password. This code expires in 10 minutes.'));
    verifyEmailContainer.appendChild(headerTwoContentEle);

    const verficationCodeLabel = document.createElement('label');
    verficationCodeLabel.textContent = 'Verification code';
    verficationCodeLabel.setAttribute('for', 'verification-code');
    verficationCodeLabel.classList.add('verification-code-label', 'js-verification-code-label');
    verifyEmailContainer.appendChild(verficationCodeLabel);

    const verificationCodeInput = document.createElement('input');
    verificationCodeInput.setAttribute('type', 'text');
    verificationCodeInput.setAttribute('id', 'verification-code');
    verificationCodeInput.classList.add('verification-code-input', 'js-verification-code-input');
    verifyEmailContainer.appendChild(verificationCodeInput);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('submit-button', 'js-submit-button');
    verifyEmailContainer.appendChild(submitButton);

    authTitleEle.parentNode.insertBefore(verifyEmailContainer, authTitleEle.nextSibling);

}