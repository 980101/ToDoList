const toDoForm = document.querySelector(".form-list");
const toDoInput = toDoForm.querySelector(".form-list #item");
const toDoList = document.querySelector(".ul-list");

const TODOS_LS = "toDos";

let toDos = [];

function checkToDo(event) {
    const div = event.target;
    const span = div.parentNode.children[1];
    div.classList.toggle("toggled");
    span.classList.toggle("toggled");

    if (div.classList.contains("toggled")) {
        // 활성화 된 경우
        const checkBox_icon = document.createElement("i");
        checkBox_icon.setAttribute("class", "fas fa-check");
        div.appendChild(checkBox_icon);
    } else {
        // 비활성화 된 경우
        div.removeChild(document.querySelector(".fa-check"));
    }
}

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const item = document.createElement("li");
    const item_div_checkBox = document.createElement("div");
    const item_span_content = document.createElement("span");
    const item_btn_delete = document.createElement("button");
    const newId = toDos.length + 1;

    // checkBox
    item_div_checkBox.addEventListener("click", checkToDo);

    // content
    item_span_content.innerText = text;

    // btn_delete
    item_btn_delete.setAttribute("class", "fas fa-times");

    item_btn_delete.addEventListener("click", deleteToDo);
    
    // item
    let itemInfos = [item_div_checkBox, item_span_content, item_btn_delete];
    for (let info of itemInfos) {
        item.appendChild(info);
    }
    item.id = newId;

    toDoList.appendChild(item);

    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";   //입력 했을 때, input 공간을 비워준다.
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);    //parse: string->object
        parsedToDos.forEach(toDo => paintToDo(toDo.text));
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();