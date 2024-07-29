// Helper function for displaying error messages
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

// Validation functions for each field of the contact form
function validateContactName() {
    return validateField('contactName', /.+/, "This field is required.", "");
}

function validateContactEmail() {
    return validateField('contactEmail', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "This field is required.", "Please enter a valid email address.");
}

function validateContactPhone() {
    return validateField('contactPhone', /^\d{10}$/, "This field is required.", "Please enter a valid phone number.");
}

function validateContactDesc() {
    return validateField('contactDesc', /.+/, "This field is required.", "");
}

function validateContactSubject() {
    const subjectSelect = document.getElementById('subject');
    if (subjectSelect.value) {
        displayError(subjectSelect, '');
        return true;
    } else {
        displayError(subjectSelect, "This field is required.");
        return false;
    }
}

// Form submission handler for the contact form
function handleContactForm(event) {
    event.preventDefault();
    const isNameValid = validateContactName();
    const isEmailValid = validateContactEmail();
    const isPhoneValid = validateContactPhone();
    const isDescValid = validateContactDesc();
    const isSubjectValid = validateContactSubject();

    if (isNameValid && isEmailValid && isPhoneValid && isDescValid && isSubjectValid) {
        alert("We've received your message! Thank you for reaching out to us.");
        event.target.reset();
    }
}

// Attach event listeners to the contact form and its fields
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
        document.getElementById('contactName').addEventListener('input', validateContactName);
        document.getElementById('contactEmail').addEventListener('input', validateContactEmail);
        document.getElementById('contactPhone').addEventListener('input', validateContactPhone);
        document.getElementById('contactDesc').addEventListener('input', validateContactDesc);
        document.getElementById('subject').addEventListener('change', validateContactSubject);
    } else {
        console.error('contactForm element not found');
    }
});