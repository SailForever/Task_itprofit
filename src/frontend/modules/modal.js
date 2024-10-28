document.addEventListener('DOMContentLoaded', function () {
    let popup = document.getElementById("popup");
    let btn = document.getElementById("popup-open-button");
    let body = document.body;

    btn.addEventListener('click', () => {
        popup.classList.add("popup-open");
        popup.classList.remove("popup-close");
        body.classList.add("no-scroll");
    })

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.add("popup-close");
            popup.classList.remove("popup-open");
            body.classList.remove("no-scroll")
        }
    })
})