const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");    // element의 이름을 가져 오는 거니깐 form으로 하면 에러
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function filterFn(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const check = document.createElement("div");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;

    // check in li 생성
    // check 되었을 때
    check.addEventListener("click", ()=> {
        check.classList.toggle("toggled");
        span.classList.toggle("toggled");

        if (check.classList.contains("toggled")) {
            // check 요소 안에 '체크 아이콘'을 추가한다.
            const icon = document.createElement("i");
            icon.setAttribute("class", "fas fa-check");
            check.appendChild(icon);
        } else {
            check.removeChild(document.querySelector(".fa-check"));
        }
    });

    // span in li 생성
    span.innerText = text;
    // delBtn in li 생성
    // delBtn에 모양 적용
    delBtn.setAttribute("class", "fas fa-times");

    delBtn.addEventListener("click", deleteToDo);
    
    li.appendChild(check);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;

    // li 표시
    toDoList.appendChild(li);
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

//모든 item을 print 한다.
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);

    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);    //parse: string->object
        parsedToDos.forEach(function(toDo) {
            paintToDo(toDo.text);
        })
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();