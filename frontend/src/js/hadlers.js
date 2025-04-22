import { SELECTORS } from "./SELECTORS";
import FetchWrapper from "./api/fetchWrapper";
import { ENV } from "./constants";
import { loadJSON } from "./generateTemplate";

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
        resp.post(ENV.endpoint, students);
        //Обновляем таблицу
        loadJSON();
    });
};
