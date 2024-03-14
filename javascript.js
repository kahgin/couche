// Open a specific sidebar
function openSidebar(sidebarId) {
    var sidebar = document.getElementById(sidebarId);
    if (window.innerWidth < 768) {
        sidebar.style.width = "100%";
    } else {
        sidebar.style.width = "400px"; 
    }
    sidebar.style.right = "0";
    document.getElementById("overlay").style.display = "block"; // Show the overlay
    var closeButton = sidebar.querySelector('.closeSidebarButton');
    if (closeButton) {
        closeButton.style.display = "block";
    }
}

// Close a specific sidebar
function closeSidebar(sidebarId) {
    var sidebar = document.getElementById(sidebarId);
    sidebar.style.right = "-100%";
    document.getElementById("overlay").style.display = "none"; // Hide the overlay
    var closeButton = sidebar.querySelector('.closeSidebarButton');
    if (closeButton) {
        closeButton.style.display = "none";
    }
}

// Close all sidebars
function closeAllSidebars() {
    ["userbar","cartbar"].forEach(barId => {
        closeSidebar(barId);
    });
    document.getElementById("overlay").style.display = "none"; // Hide the overlay
}

document.addEventListener('DOMContentLoaded', (event) => {
    var overlay = document.getElementById("overlay");
    if (overlay) {
        overlay.addEventListener('click', closeAllSidebars);
    }
});

window.addEventListener('resize', function() {
    var sidebars = document.querySelectorAll('.sidebar');
    sidebars.forEach(function(sidebar) {
        if (window.innerWidth < 768) {
            sidebar.style.width = "100%";
        } else {
            sidebar.style.width = "";
        }
    });
});

//For @media hamburger
function toggleHamburgerMenu() {
    var dropdown = document.getElementById('hamburgerDropdown');
    var buttons = dropdown.getElementsByTagName('button');

    // Check if the dropdown is already displayed
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        // If hidden, show the dropdown
        dropdown.style.display = 'flex';
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = 'block';
        }
    } else {
        // If shown, hide the dropdown
        dropdown.style.display = 'none';
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.display = 'none';
        }
    }
}

// Login <-> Sign up
function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "flex";
        signupForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        signupForm.style.display = "flex";
    }
}

// Forgotten password -> Login
function showLoginForm() {
    var loginForm = document.getElementById('loginForm');
    var forgottenPasswordForm = document.getElementById('forgottenPasswordForm');
    var signupForm = document.getElementById('signupForm');

    loginForm.style.display = 'flex';
    forgottenPasswordForm.style.display = 'none';
    signupForm.style.display = 'none';
}

// Login -> Forgotten Password
function showForgottenPasswordForm() {
    var loginForm = document.getElementById('loginForm');
    var forgottenPasswordForm = document.getElementById('forgottenPasswordForm');
    var signupForm = document.getElementById('signupForm');

    loginForm.style.display = 'none';
    forgottenPasswordForm.style.display = 'flex';
    signupForm.style.display = 'none';
}

// Contact-us attachment
function handleFileSelect(event) {
    const fileName = event.target.files[0].name;
    console.log("Selected file:", fileName);
}

// Toggle accordion
document.addEventListener("DOMContentLoaded", function () {
    var acc = document.getElementsByClassName("accordionLabel");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var accordionContent = this.nextElementSibling;

            if (accordionContent.style.display === "block") {
                accordionContent.style.display = "none";
                this.style.fontWeight = "300";
            } else {
                accordionContent.style.display = "block";
                this.style.fontWeight = "500";
            }
        });
    }
});

// For login, signup & reset password form
// Helper function for error messages
function displayError(inputElement, message) {
    const messageSpanId = inputElement.id + 'ValidationMessage';
    const messageSpan = document.getElementById(messageSpanId);
    if (message) {
        messageSpan.textContent = message;
        messageSpan.classList.add('error');
        inputElement.classList.add('inputError');
    } else {
        messageSpan.textContent = '';
        messageSpan.classList.remove('error');
        inputElement.classList.remove('inputError');
    }
}

// Field validation function
function validateField(fieldId, regex, emptyMessage, invalidMessage) {
    const inputElement = document.getElementById(fieldId);
    if (!inputElement.value) {
        displayError(inputElement, emptyMessage);
        return false;
    } else if (regex && !regex.test(inputElement.value)) {
        displayError(inputElement, invalidMessage);
        return false;
    } else {
        displayError(inputElement, '');
        return true;
    }
}

// Validation functions for each field
function validateLoginEmail() {
    return validateField('loginEmail', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "This field is required.", "Please enter a valid email address.");
}
function validateLoginPassword() {
    return validateField('loginPassword', /.+/, "This field is required.", "");
}
function validateSignupUsername() {
    return validateField('signupUsername', /.+/, "This field is required.", "");
}
function validateSignupEmail() {
    return validateField('signupEmail', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "This field is required.", "Please enter a valid email address.");
}
function validateSignupPassword() {
    return validateField('signupPassword', /.+/, "Password is required.", "");
}
function validateSignupConfirmPassword() {
    var password = document.getElementById('signupPassword').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var messageSpan = document.getElementById('signupConfirmPasswordValidationMessage');

    if (!confirmPassword) {
        messageSpan.textContent = "Confirm password is required.";
        messageSpan.classList.add('error');
        return false;
    } else if (password !== confirmPassword) {
        messageSpan.textContent = "Passwords do not match.";
        messageSpan.classList.add('error');
        return false;
    } else {
        messageSpan.textContent = '';
        messageSpan.classList.remove('error');
        return true;
    }
}
function attachValidationListeners(fieldId, validationFunction) {
    var inputElement = document.getElementById(fieldId);
    inputElement.addEventListener('input', validationFunction);
    inputElement.addEventListener('blur', validationFunction);
}
attachValidationListeners('signupPassword', function() {
    validateSignupPassword();
    validateSignupConfirmPassword();
});
attachValidationListeners('confirmPassword', validateSignupConfirmPassword);

function validateForgotEmail() {
    return validateField('forgotEmail', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Email is required.", "Please enter a valid email address.");
}
// Form submission handlers
function handleLoginForm(event) {
    event.preventDefault();
    const isEmailValid = validateLoginEmail();
    const isPasswordValid = validateLoginPassword();
    if (isEmailValid && isPasswordValid) {
        alert("You've logged in successfully.");
        event.target.reset();
    }
}
function handleSignupForm(event) {
    event.preventDefault();
    const isUsernameValid = validateSignupUsername();
    const isEmailValid = validateSignupEmail();
    const isPasswordValid = validateSignupPassword();
    const isConfirmPasswordValid = validateSignupConfirmPassword();
    if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        alert("You've signed up successfully.");
        event.target.reset();
    }
}
function handleForgotPasswordForm(event) {
    event.preventDefault();
    const isEmailValid = validateForgotEmail();
    if (isEmailValid) {
        alert("Please check your mailbox. We've sent you an email.");
        event.target.reset();
    }
}

// Attach event listeners to forms
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgottenPasswordForm');

    loginForm.addEventListener('submit', handleLoginForm);
    signupForm.addEventListener('submit', handleSignupForm);
    forgotPasswordForm.addEventListener('submit', handleForgotPasswordForm);

    document.getElementById('loginEmail').addEventListener('input', validateLoginEmail);
    document.getElementById('loginPassword').addEventListener('input', validateLoginPassword);
    document.getElementById('signupUsername').addEventListener('input', validateSignupUsername);
    document.getElementById('signupEmail').addEventListener('input', validateSignupEmail);
    document.getElementById('signupPassword').addEventListener('input', validateSignupPassword);
    document.getElementById('confirmPassword').addEventListener('input', validateSignupConfirmPassword);
    document.getElementById('forgotEmail').addEventListener('input', validateForgotEmail);
});

// Password visibility toggle
function togglePassword(buttonId) {
    const passwordFieldId = buttonId === 'toggleBtn1' ? 'loginPassword' : buttonId === 'toggleBtn2' ? 'signupPassword' : 'confirmPassword';
    const passwordInput = document.getElementById(passwordFieldId);
    const toggleButton = document.getElementById(buttonId);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Show';
    }
}

// For the subscription form
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('newsletterForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Thank you for subscribing!');
        form.reset();
    });
});