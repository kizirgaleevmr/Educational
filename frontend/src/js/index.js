import { loadJSON } from "./generateTemplate";
import { addStudents } from "./hadlers";

document?.addEventListener("DOMContentLoaded", async () => {
    loadJSON();
    addStudents();
});
