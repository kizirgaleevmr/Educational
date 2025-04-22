import FetchWrapper from "./api/fetchWrapper.js";
import { ENV } from "./constants.js";
import { SELECTORS } from "./SELECTORS.js";

//Получаем данные с сервера
async function getDateStudents() {
    const response = new FetchWrapper(ENV?.apiUrl);
    const data = response.get(ENV?.endpoint);
    return data;
}

//Генерируем таблицу
async function generateTable(data) {
    console.log(data);
    let template = "";
    //очищаем таблицу от данных
    SELECTORS.tbody.innerText = "";
    data.forEach((students) => {
        template += `<tr>
        <td>${students.firstName}</td>
        <td>${students.surname}</td>
        <td>${students.address}</td>
        <td>${students.age}</td>
        <td><button type="button">X</button></td>
        </tr>`;
    });
    SELECTORS.tbody.insertAdjacentHTML("beforeend", template);
}

//добавляем данные с сервера в таблицу
export async function loadJSON() {
    const response = await getDateStudents();
    generateTable(response);
}
