export class Notification {
    constructor(obj) {
        this.text = obj.textNotification;
    }
    showPopap() {
        const div = document.createElement("div");
        div.classList.add("popapAddStudent");
        div.innerHTML = `<p>${this.text}</p>`;
        document
            .querySelector(".container")
            .insertAdjacentElement("beforeend", div);
        setTimeout(() => {
            div.classList.add("show");
        }, 1000);
        setTimeout(() => {
            this.hiddenPopap();
        }, 3000);
        setTimeout(() => {
            this.remove();
        }, 4000);
    }
    hiddenPopap() {
        const el = document?.querySelector(".popapAddStudent");
        el.classList.add("hidden");
    }
    remove() {
        const el = document?.querySelector(".popapAddStudent");
        el.remove();
    }
}
