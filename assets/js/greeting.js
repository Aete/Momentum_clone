const greetingForm = document.querySelector(".js-greetingForm");
const greetingInput = greetingForm.querySelector("input");
const greeting = document.querySelector(".js-greeting");

const USER_LS = "currentUser";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = greetingInput.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askName(){
    greetingForm.classList.add('showing');
    greetingForm.addEventListener('submit', handleSubmit);


}

function paintGreeting(text){
    greetingForm.classList.remove('showing');
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
