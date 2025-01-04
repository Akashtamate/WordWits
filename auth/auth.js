const authTitleEle = document.querySelector('.js-auth-title');
const emailIDEle = document.querySelector('.js-email-input');
const continueButtonEle = document.querySelector('.js-continue-button');
const createAccountButtonEle = document.querySelector('.js-create-account-button');
const errorContainerEle = document.querySelector('.js-error-container');
const errorTextEle = document.querySelector('.js-error-text');
const passwordContainerEle = document.querySelector('.js-password-container-validation');
const editButtonEle = document.querySelector('.js-edit-button');
const showButtonEle = document.querySelector('.js-show-button');
editButtonEle.style.display = 'none';
const passwordInputEle = document.querySelector('.js-password-input');
const forgotPasswordEle = document.querySelector('.js-forgot-password-link');
const autFormContianer = document.querySelector('.js-auth-form-container');
const email = 'abc@gmail.com'; //For testing 
const code = '1234'; //For testing
const password = 'abc'; //For testing

continueButtonEle.addEventListener('click', () => {
    handleContinueAction();
});


emailIDEle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleContinueAction();
    }
});

// Function to handle continue action
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

createAccountButtonEle.addEventListener('click', () => {
    if (createAccountButtonEle.textContent === 'Create account') {
        handleCreateAccount();
        console.log('Create account button clicked');
    }
    else {
        handleLogin();
    }
});

function handleCreateAccount() {
    if (passwordInputEle.checkValidity()) {
        passwordInputEle.style.border = '';
        errorContainerEle.setAttribute('id', 'hidden');
        
        if (passwordContainerEle.nextSibling === errorContainerEle) {
            errorContainerEle.parentNode.removeChild(errorContainerEle);
        }

        authTitleEle.textContent = 'You are all set!';
        autFormContianer.replaceChildren();

        const successMessage = document.createElement('h2');
        successMessage.classList.add('success-message', 'js-success-message');
        successMessage.appendChild(document.createTextNode('Your account has been created successfully. Please login to continue.'));
        autFormContianer.appendChild(successMessage);

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.classList.add('create-account-button', 'js-login-button');
        autFormContianer.appendChild(loginButton);

        loginButton.addEventListener('click', () => {
            location.reload();
        });
    }
    else if(passwordInputEle.value === '') {
        passwordInputEle.style.border = '1px solid red';
        errorTextEle.textContent = 'Password cannot be empty'; 
        passwordContainerEle.parentNode.insertBefore(errorContainerEle, passwordContainerEle.nextSibling);
        errorContainerEle.removeAttribute('id');
    }
}

//Write code to handle login
function handleLogin() {
    if(passwordInputEle.value === '') {
        passwordInputEle.style.border = '1px solid red';
        errorTextEle.textContent = 'Password cannot be empty';
        passwordContainerEle.parentNode.insertBefore(errorContainerEle, passwordContainerEle.nextSibling);
        errorContainerEle.removeAttribute('id');
    }
    else if(passwordInputEle.value !== password) {
        passwordInputEle.style.border = '1px solid red';
        errorTextEle.textContent = 'Password is incorrect';
        passwordContainerEle.parentNode.insertBefore(errorContainerEle, passwordContainerEle.nextSibling);
        errorContainerEle.removeAttribute('id');
    }
    else if(passwordInputEle.value === password && passwordInputEle.checkValidity()) {
        passwordInputEle.style.border = '';
        errorContainerEle.setAttribute('id', 'hidden');
        
        if (passwordContainerEle.nextSibling === errorContainerEle) {
            errorContainerEle.parentNode.removeChild(errorContainerEle);
        }

        //load game.html
        console.log('Login successful');
        window.location.href = '../html/main.html';
    }
}

// Function to create div to verify email
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

    const resendCodeLink = document.createElement('a');
    resendCodeLink.textContent = 'Request a new one.';
    resendCodeLink.classList.add('resend-code-link', 'js-resend-code-link');

    const resendCodeHeader = document.createElement('h3');
    resendCodeHeader.classList.add('resend-code-link-header', 'js-resend-code-link-header');
    resendCodeHeader.appendChild(document.createTextNode("Didn't receive the code? Check your spam folder or "));
    resendCodeHeader.appendChild(resendCodeLink);
    verifyEmailContainer.appendChild(resendCodeHeader);

    authTitleEle.parentNode.insertBefore(verifyEmailContainer, authTitleEle.nextSibling);

   
    submitButton.addEventListener('click', () => {
        handleSubmitClick(verifyEmailContainer);
    });

    verificationCodeInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleSubmitClick(verifyEmailContainer);
        }
    });
}

let wrongCodeMessageContainer;
function handleSubmitClick(verifyEmailContainer) {
    
    const verificationCodeInput = verifyEmailContainer.querySelector('.js-verification-code-input');
    const verificationCodeValue = verificationCodeInput.value;
    const headerTwoContentEle = verifyEmailContainer.querySelector('.js-header-two-content');
    const mailSpanEle = verifyEmailContainer.querySelector('.js-mail-span');

    if(document.body.contains(wrongCodeMessageContainer)) {
        wrongCodeMessageContainer.remove();
    }

    if (verificationCodeValue === code) {
        verificationCodeInput.style.border = '';
        console.log('Code is correct');

        authTitleEle.textContent = 'Set a new password';

        headerTwoContentEle.replaceChildren();
        headerTwoContentEle.appendChild(document.createTextNode('Your emial '));
        headerTwoContentEle.appendChild(mailSpanEle);
        headerTwoContentEle.appendChild(document.createTextNode(' has been verified. Please set a new password.'));

        Array.from(verifyEmailContainer.children).forEach((child) => {
            if (child !== headerTwoContentEle) {
                verifyEmailContainer.removeChild(child);
            }
        });

        const newPasswordLabel = document.createElement('label');
        newPasswordLabel.textContent = 'Password';
        newPasswordLabel.setAttribute('for', 'new-password');
        newPasswordLabel.classList.add('auth-label', 'js-new-password-label');
        verifyEmailContainer.appendChild(newPasswordLabel);

        const newPasswordContiner = document.createElement('div');
        newPasswordContiner.classList.add('password-container', 'js-new-password-container');

        const newPasswordInput = document.createElement('input');
        newPasswordInput.setAttribute('type', 'password');
        newPasswordInput.required = true;
        newPasswordInput.setAttribute('id', 'new-password');
        newPasswordInput.classList.add('auth-input', 'js-new-password-input');
        newPasswordContiner.appendChild(newPasswordInput);

        const showButtonEle = document.createElement('button');
        showButtonEle.textContent = 'Show';
        showButtonEle.classList.add('show-edit-button', 'js-show-edit-button');
        newPasswordContiner.appendChild(showButtonEle);

        verifyEmailContainer.appendChild(newPasswordContiner);

        const setPasswordButton = document.createElement('button');
        setPasswordButton.textContent = 'Set Password';
        setPasswordButton.classList.add('create-account-button', 'js-submit-button');
        verifyEmailContainer.appendChild(setPasswordButton);

        showButtonEle.addEventListener('click', () => {
            if(newPasswordInput.type === 'password') {
                newPasswordInput.type = 'text';
                showButtonEle.textContent = 'Hide';
            }
            else {
                newPasswordInput.type = 'password';
                showButtonEle.textContent = 'Show';
            }
        });

        setPasswordButton.addEventListener('click', () => {
            handleSetPassword(verifyEmailContainer);
        });

    }
    else {
        const errMsg = 'The code you entered is incorrect. Please try again.';
        console.log('Code is incorrect');
        verificationCodeInput.style.border = '1px solid red';
        wrongCodeMessageContainer = wrongCodeMessage(verificationCodeInput, errMsg);
    }
}

// Function to display wrong code message
function wrongCodeMessage(verificationCodeInput, errMsg) {
    const wrongCodeMessageContainer = document.createElement('div');
    wrongCodeMessageContainer.classList.add('error-message', 'js-wrong-code-message-container');

    const wrongCodeImg = document.createElement('img');
    wrongCodeImg.setAttribute('src', '../icons/exclamation-warning-round-red-icon.svg');
    wrongCodeImg.setAttribute('alt', 'Error icon');
    wrongCodeImg.setAttribute('type', 'image/svg+xml');
    wrongCodeImg.classList.add('error-icon', 'js-error-icon');
    wrongCodeMessageContainer.appendChild(wrongCodeImg);

    const wrongCodeMessage = document.createElement('span');
    wrongCodeText = document.createTextNode(errMsg);
    wrongCodeMessage.classList.add('error-text', 'js-error-text');
    wrongCodeMessage.appendChild(wrongCodeText);
    wrongCodeMessageContainer.appendChild(wrongCodeMessage);
    
    verificationCodeInput.parentNode.insertBefore(wrongCodeMessageContainer, verificationCodeInput.nextSibling);

    return wrongCodeMessageContainer;
}

function handleSetPassword(verifyEmailContainer) {
    const newPasswordContiner = verifyEmailContainer.querySelector('.js-new-password-container');
    const newPasswordInput = verifyEmailContainer.querySelector('.js-new-password-input');
    const headerTwoContentEle = verifyEmailContainer.querySelector('.js-header-two-content');
    
    if(document.body.contains(wrongCodeMessageContainer)) {
        wrongCodeMessageContainer.remove();
    }

    if(newPasswordInput.checkValidity()) {
        newPasswordInput.style.border = '';
        authTitleEle.textContent = 'You are all set!';

        headerTwoContentEle.replaceChildren();
        headerTwoContentEle.appendChild(document.createTextNode('Your password has been updated successfully. Please login with your new password.'));

        Array.from(verifyEmailContainer.children).forEach((child) => {
            if (child !== headerTwoContentEle) {
                verifyEmailContainer.removeChild(child);
            }
        });

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.classList.add('create-account-button', 'js-login-button');
        verifyEmailContainer.appendChild(loginButton);

        loginButton.addEventListener('click', () => {
            location.reload();
        });
    }

    else {
        newPasswordInput.style.border = '1px solid red';
        wrongCodeMessageContainer = wrongCodeMessage(newPasswordContiner, 'Password cannot be empty');
    }

}



