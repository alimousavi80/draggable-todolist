let $ = document;

const modalBox = $.querySelector(".modal-box");
const container = $.querySelector(".container");
const input = $.querySelector("#input");
const column1 = $.querySelector(".column1");
const columns = $.querySelectorAll(".column");
const handler = $.querySelector(".todo-container");

$.querySelector(".box-container__addtodo-btn").addEventListener("click", showModal);
$.querySelector("#close").addEventListener("click", hideModal);
$.querySelector(".modal__addtodo-btn").addEventListener("click", addTodo);

let allTodos = [];

function showModal() {
    console.log("gg2");
    
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

    console.log(allTodos);

    saveToLocal(allTodos);
    generateTodo(allTodos);
}

function saveToLocal(items) {
    localStorage.setItem("todo", JSON.stringify(items));
}

function generateTodo(todosItem) {
    let divElem, pElem, spanElem;

    handler.innerHTML = "";
    todosItem.forEach((item) => {
        divElem = $.createElement("div");
        divElem.classList.add("todos");
        divElem.id = item.id;
        divElem.draggable = "true";
        pElem = $.createElement("p");
        pElem.classList.add("todo-text");
        pElem.innerText = item.title;
        spanElem = $.createElement("span");
        spanElem.classList.add("closing");
        divElem.append(pElem, spanElem);
        handler.appendChild(divElem);
        spanElem.addEventListener("click", () => remove(item.id));
        divElem.addEventListener("dragstart", function startedDragg(e) {
            e.dataTransfer.setData("todo", item.id);
        });
    });
}

function remove(data) {
    console.log(data);
    const selected = $.getElementById(data);
    selected.remove();
    let testical = allTodos.findIndex((item) => {
        return item.id == data;
    });
    allTodos.splice(testical, 1);
    saveToLocal(allTodos);
}

columns.forEach((item) => {
    console.log("gg");

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
