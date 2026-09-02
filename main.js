let $ = document;

const modalBox = $.querySelector(".modal-box");
const container = $.querySelector(".container");
const input = $.querySelector("#input");
const column1 = $.querySelector(".column1");
const columns = $.querySelectorAll(".column");
const handler = $.querySelector(".todo-container");

$.querySelector(".box-container__addtodo-btn").addEventListener(
    "click",
    showModal,
);
$.querySelector("#close").addEventListener("click", hideModal);
$.querySelector(".modal__addtodo-btn").addEventListener("click", addTodo);

let allTodos = [];

function showModal() {
    modalBox.classList.add("active-modal");
    container.classList.add("hide-main");
}

function hideModal() {
    modalBox.classList.remove("active-modal");
    container.classList.remove("hide-main");
}

function addTodo() {
    let todos = {
        id: allTodos.length,
        title: input.value,
    };
    allTodos.push(todos);
    saveToLocal(allTodos);
    generateTodo(allTodos);
}

function saveToLocal(items) {
    localStorage.setItem("todo", JSON.stringify(items));
}

function generateTodo(todosItem) {
    handler.innerHTML = "";
    todosItem.forEach((item) => {
        handler.insertAdjacentHTML(
            "beforeend",
            `
            <div class="todos" id=${item.id} draggable="true" ondragstart="startedDragg(event , '${item.id}')">
                <p class="todo-text">${item.title}</p>
                <svg onclick="remove(${item.id})" class="todo__delete-btn">
                    <use href="#bin-icon"></use>
                </svg>
            </div>
            `,
        );
    });
}

function startedDragg(event, id) {
    event.dataTransfer.setData("todo", id);
}

function remove(data) {
    const selected = $.getElementById(data);
    selected.remove();
    let testical = allTodos.findIndex((item) => {
        return item.id == data;
    });
    allTodos.splice(testical, 1);
    saveToLocal(allTodos);
}

columns.forEach((item) => {
    item.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    item.addEventListener("drop", (e) => {
        let classs = e.dataTransfer.getData("todo");
        const foundItem = $.getElementById(classs);
        item.append(foundItem);
    });
});

function getData() {
    const getItems = JSON.parse(localStorage.getItem("todo"));
    if (getItems) {
        allTodos = getItems;

        generateTodo(allTodos);
    }
}

window.addEventListener("load", getData);
