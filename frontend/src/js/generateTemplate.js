import FetchWrapper from "./api/fetchWrapper.js";
import { ENV } from "./constants.js";
import { SELECTORS } from "./SELECTORS.js";
import { Notification } from "./components/notification.js";
//Получаем данные с сервера
async function getDateStudents() {
    const response = new FetchWrapper(ENV?.apiUrl);
    const data = response.get(ENV?.endpoint);
    return data;
}

//Генерируем таблицу
async function generateTable(data) {
    let template = "";
    //очищаем таблицу от данных
    SELECTORS.tbody.innerText = "";
    data.forEach((students) => {
        template += `<tr>
        <td>${students.firstName}</td>
        <td>${students.surname}</td>
        <td>${students.address}</td>
        <td>${students.age}</td>
        <td><button type="button" id=${students.id}>X</button></td>
        </tr>`;
    });
    SELECTORS.tbody.insertAdjacentHTML("beforeend", template);
    delet();
}

//добавляем данные с сервера в таблицу
export async function loadJSON() {
    const response = await getDateStudents();
    generateTable(response);
}

function delet() {
    //Удаление студента
    const tr = Array.from(document?.querySelectorAll("tr button"));
    tr.forEach((students) => {
        students.addEventListener("click", async (event) => {
            const delet = await fetch(
                ENV?.apiUrl + ENV?.endpoint + "/" + event.target.id,
                {
                    method: "DELETE",
                },
            );

            if (delet.ok) {
                const notification = new Notification({
                    textNotification: "Данные удалены",
                });
                notification.showPopap();
            }
            loadJSON();
        });
    });
}
