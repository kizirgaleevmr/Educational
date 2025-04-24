import { SELECTORS } from "./SELECTORS";
import FetchWrapper from "./api/fetchWrapper";
import { ENV } from "./constants";
import { loadJSON } from "./generateTemplate";
import { Notification } from "./components/notification";

export const addStudents = async () => {
    //Получема данные из формы
    SELECTORS?.form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const students = {};
        const formData = new FormData(event.target);

        for (let [key, value] of formData) {
            students[key] = value;
        }

        //Добавляем студента в базу
        const resp = new FetchWrapper(ENV.apiUrl);
        await resp.post(ENV.endpoint, students);
        //показываем всплывающее окно
        const notification = new Notification({
            textNotification: "Данные пользвателя добавлены",
        });
        notification.showPopap("popapAddStudent");
        //Обновляем таблицу
        resetForm();
        loadJSON();
    });
};

/**
 * Функция для очистки формы
 */
function resetForm() {
    const form = SELECTORS?.form;
    for (let [key, value] of Object.entries(form)) {
        if (value.name) {
            document.getElementById(`${value.name}`).value = "";
        }
    }
}
