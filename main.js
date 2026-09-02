let $ = document;

const modalBox = $.querySelector(".modal-box");
const container = $.querySelector(".container");
const input = $.querySelector("#input");
const column1 = $.querySelector(".column1");
const columns = $.querySelectorAll(".column");
const noStatusContainer = $.querySelector(".no-status-container");
const notStartedContainer = $.querySelector(".not-started-container");
const inProgressContainer = $.querySelector(".in-progress-container");
const completedContainer = $.querySelector(".completed-container");

let allTodos = [];
console.log(allTodos);

function showModal() {
    modalBox.classList.add("active-modal");
    container.classList.add("hide-main");
}

function hideModal() {
    modalBox.classList.remove("active-modal");
    container.classList.remove("hide-main");
}

function addTodo() {
    if (input.value !== "") {
        let todos = {
            id: allTodos.length,
            title: input.value,
            position: "no status",
        };
        allTodos.push(todos);
        saveToLocal(allTodos);
        generateTodo(allTodos);
    }
}

function saveToLocal(items) {
    localStorage.setItem("todo", JSON.stringify(items));
}

function generateTodo(todosItem) {
    noStatusContainer.innerHTML = "";
    notStartedContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    todosItem.forEach((item) => {
        console.log(item.position);

        if (item.position === "no status") {
            noStatusContainer.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="todos" data-position="${item.position}" id=${item.id} draggable="true" ondragstart="startedDragg(event , '${item.id}')">
                        <p class="todo-text">${item.title}</p>
                        <svg onclick="remove(${item.id})" class="todo__delete-btn">
                            <use href="#bin-icon"></use>
                        </svg>
                    </div>
                    `,
            );
        }
        if (item.position === "not started") {
            notStartedContainer.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="todos" data-position="${item.position}" id=${item.id} draggable="true" ondragstart="startedDragg(event , '${item.id}')">
                        <p class="todo-text">${item.title}</p>
                        <svg onclick="remove(${item.id})" class="todo__delete-btn">
                            <use href="#bin-icon"></use>
                        </svg>
                    </div>
                    `,
            );
        }
        if (item.position === "in progress") {
            inProgressContainer.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="todos" data-position="${item.position}" id=${item.id} draggable="true" ondragstart="startedDragg(event , '${item.id}')">
                        <p class="todo-text">${item.title}</p>
                        <svg onclick="remove(${item.id})" class="todo__delete-btn">
                            <use href="#bin-icon"></use>
                        </svg>
                    </div>
                    `,
            );
        }
        if (item.position === "completed") {
            completedContainer.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="todos" data-position="${item.position}" id=${item.id} draggable="true" ondragstart="startedDragg(event , '${item.id}')">
                        <p class="todo-text">${item.title}</p>
                        <svg onclick="remove(${item.id})" class="todo__delete-btn">
                            <use href="#bin-icon"></use>
                        </svg>
                    </div>
                    `,
            );
        }
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
        foundItem.dataset.position = item.children[0].innerHTML;
        console.log(allTodos[foundItem.id].position);
        console.log(item.children[0].innerHTML);

        allTodos[foundItem.id].position = item.children[0].innerHTML;
        console.log(allTodos[foundItem.id].position);
        console.log(allTodos);

        saveToLocal(allTodos);

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
$.querySelector(".box-container__addtodo-btn").addEventListener(
    "click",
    showModal,
);
$.querySelector("#close").addEventListener("click", hideModal);
$.querySelector(".modal__addtodo-btn").addEventListener("click", addTodo);
