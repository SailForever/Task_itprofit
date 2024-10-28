document.getElementById("feedback-form").addEventListener("formValid", () => {

    const DATA = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        tel: document.getElementById("tel").value,
        message: document.getElementById("message").value,
    }

    const POST_SERVER_URL = 'http://localhost:9090/api/registration';

    async function postRequest() {
        try {
            const response = await fetch(POST_SERVER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DATA)
            })

            const result = await response.json();
            console.log(result);

            const feedbackForm = document.getElementById("feedback-form");

            if (result.status === "success") {
                feedbackForm.reset();
                feedbackForm.insertAdjacentHTML("beforeend", `
                    <div class="response-msg">
                    <p class="response-msg__msg">${result.message}</p>
                    </div>
                `);

            } else if (result.status === "error") {
                feedbackForm.reset();
                feedbackForm.insertAdjacentHTML("beforeend", `
                    <div class="response-msg">
                    <p class="response-msg__msg">${result.message}</p>
                    </div>
                `);
                // Проверка, есть ли ошибки полей в ответе
                if (!result.fields) {
                    // Добавляем симулированные ошибки полей, если их нет в ответе. Серверную часть нельзя изменять
                    result.fields = {
                        name: "Имя должно быть заполнено",
                        email: "Неверный формат email",
                        tel: "Телефон должен содержать только цифры",
                        message: "Сообщение должно быть заполнено"
                    };
                }

                let errorMsgsHTML = `<div class="error-msg">`;
                for (let field in result.fields) {
                    errorMsgsHTML += `
                        <p class="error-msg__msg">${result.fields[field]}</p>
                    `;
                }
                errorMsgsHTML += `</div>`;
                feedbackForm.insertAdjacentHTML("beforeend", errorMsgsHTML);
            }

        } catch (error) {
            console.error('Ошибка: ', error);
        }
    }

    postRequest();
});
