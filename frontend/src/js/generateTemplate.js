import FetchWrapper from "./api/fetchWrapper.js";
import { ENV } from "./constants.js";
import { SELECTORS } from "./SELECTORS.js";
import { Notification } from "./components/notification.js";

//Получаем данные с сервера
async function getDateStudents() {
    const response = new FetchWrapper(ENV?.apiUrl);
    const data = await response.get(ENV?.endpoint);
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
        <td>
        <button class="edit fa-solid fa-pencil" type="button" id=${students.id} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
        <button class="trash fa-solid fa-trash" type="button" id=${students.id}></button></td>
        </tr>`;
    });
    SELECTORS.tbody.insertAdjacentHTML("beforeend", template);
    delet();
    updateStudent(temp);
}

//добавляем данные с сервера в таблицу
export async function loadJSON() {
    const response = await getDateStudents();
    generateTable(response);
}

function delet() {
    //Удаление студента
    const tr = Array.from(document?.querySelectorAll("tr .trash"));
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
                notification.showPopap("delet");
            }
            loadJSON();
        });
    });
}
//функция для обновления записи
async function updateStudent(obj) {
    const btn = Array.from(document?.querySelectorAll("tr .edit"));
    btn.forEach((students) => {
        students.addEventListener("click", async (event) => {
            const students = {};
            const parentEl = [
                ...event.target.parentElement.parentNode.children,
            ];
            // получаем в input  записи о студенте
            students.id = event.target.id;
            students.firstName = parentEl[0].textContent;
            students.surname = parentEl[1].textContent;
            students.address = parentEl[2].textContent;
            students.age = parentEl[3].textContent;
            SELECTORS.modal.innerHTML = temp(students);
            saveUpdate();
        });
    });
}
// Отправляем запрос на обновление данных
async function saveUpdate() {
    const btn = document?.querySelector(".modal-btn");
    btn.addEventListener("click", async (event) => {
        const students = {};
        const input = Array.from(
            document?.querySelectorAll(".modal-body input"),
        );
        console.log(input);
        //Собираем данные в объект для отправки
        students.id = event.target.id;
        students.firstName = input[0].value;
        students.surname = input[1].value;
        students.address = input[2].value;
        students.age = input[3].value;
        console.log(students);
        await fetch(ENV?.apiUrl + ENV?.endpoint + "/" + event.target.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(students),
        });
        loadJSON();
    });
}
// Генерируем input  для модального окна
function temp(obj) {
    const student = obj;
    const modalBtn = document?.querySelector(".modal-btn");
    // Добавляем id к кнопке
    modalBtn.id = student.id;
    return `<form action="#" id="updateStudentForm">
    <label for="firstName">Your name</label>
                    <input
                        class="input"
                        type="text"
                        id="firstName"
                        required
                        name="firstName"
                        value=${student.firstName}
                    />
                    <label for="surname">Your surname</label>
                    <input
                        class="input"
                        type="text"
                        id="surname"
                        required
                        name="surname"
                        value=${student.surname}
                    />
                    <label for="address">Your address</label>
                    <input
                        class="input"
                        type="text"
                        id="address"
                        required
                        name="address"
                        value=${student.address}
                    />
                    <label for="age">Your age</label>
                    <input
                        class="input"
                        type="number"
                        id="age"
                        required
                        name="age"
                        value=${student.age}
                    />
    </form>`;
}
