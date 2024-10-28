document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedback-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            const event = new Event('formValid');
            form.dispatchEvent(event);
        }
    })

    const inputs = document.querySelectorAll('.input-item, .textarea');

    //при потере фокуса показываем ошибку, если значение пустое или неправильное
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (!input.value) {
                showError(input, 'Это поле обязательно для заполнения');
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Введите корректный адрес электронной почты');
            } else {
                clearError(input);
            }
        });
    });

    function validateForm() {
        let isValid = true
        inputs.forEach(input => {
            if (!input.value) {
                showError(input, 'Это поле обязательно для заполнения');
                isValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                showError(input, 'Введите корректный адрес электронной почты');
                isValid = false;
            } else {
                clearError(input);
            }
        })
        return isValid;
    }

    function showError(input, message) {
        if (input.nextSibling && input.nextSibling.className === 'error-message') {
            return;
        }
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        input.classList.add('error');
        input.parentElement.insertBefore(errorElement, input.nextSibling);
    }

    function clearError(input) {
        input.classList.remove('error');
        if (input.nextSibling) {
            input.nextSibling.remove();
        }
    }

    function validateEmail(email) {
        if (!email) {
            return false;
        }
        const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailTest.test(String(email));
    }
})
