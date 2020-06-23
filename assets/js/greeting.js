const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askName(){
    form.classList.add('showing');
    form.addEventListener('submit', handleSubmit);


}

function paintGreeting(text){
    form.classList.remove('showing');
    greeting.classList.add('showing');
    greeting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser===null){
        askName();
    }
    else{
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();
