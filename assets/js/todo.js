const toDoForm = document.querySelector('.js-toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDoList = document.querySelector('.js-toDoList');

const TODO_LS = 'toDo';

let toDoArray = [];

function deleteToDo(event){
    const li = event.target.parentElement;
    toDoList.removeChild(li);
    const cleanToDos = toDoArray.filter(toDo=>toDo.id !== +li.id);
    console.log(cleanToDos);
    toDoArray = cleanToDos;
    saveToDo();
}

function saveToDo(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDoArray));
}

function loadToDo(){
    const loadedToDo = localStorage.getItem(TODO_LS);
    if(loadedToDo !== null){
        const parsedToDo =JSON.parse(loadedToDo);
        parsedToDo.forEach(toDo=>{
            paintToDo(toDo.text);
        });
    }
    else{

    }
}

function paintToDo(text){
    const newId = toDoArray.length + 1;
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    delBtn.innerText = 'Done';
    delBtn.addEventListener('click',deleteToDo);
    const span = document.createElement('span');
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id: newId
    };
    toDoArray.push(toDoObj);
    saveToDo();
}

function toDoHandleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function init(){
    loadToDo();
    toDoForm.addEventListener("submit",toDoHandleSubmit)
}

init();