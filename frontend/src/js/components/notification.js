export class Notification {
    constructor(obj) {
        this.text = obj.textNotification;
    }
    showPopap(text) {
        const div = document.createElement("div");
        div.classList.add(text);

        div.innerHTML = `<p>${this.text}</p>`;
        document
            .querySelector(".container")
            .insertAdjacentElement("beforeend", div);
        setTimeout(() => {
            div.classList.add("show");
        }, 1000);
        setTimeout(() => {
            this.hiddenPopap(text);
        }, 3000);
        setTimeout(() => {
            this.remove(text);
        }, 4000);
    }
    hiddenPopap(text) {
        const el = document?.querySelector(`.${text}`);
        el.classList.add("hidden");
    }
    remove(text) {
        const el = document?.querySelector(`.${text}`);
        el.remove();
    }
}
