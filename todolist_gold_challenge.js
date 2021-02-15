
const todoForm = document.querySelector(".todo_form"),
input = todoForm.querySelector(".add_todo"),
doUl = document.querySelector(".do"),
doneUl = document.querySelector(".done"),
welPop = document.querySelector(".wellDone_pop");
doTxt = doUl.querySelector(".do_txt");
doneTxt = doneUl.querySelector(".done_txt");


const TODO_LIST = "todolist";
const DONE_LIST = "donelist";
let todo_Array = [];
let done_Array = [];

welPop.style.display ="none";

function doneDone(e){
    const btn = e.target;
    const li = btn.parentNode;
    const span = li.childNodes[0];

    doneUl.removeChild(li);

    const text = span.textContent;

    doFunc(text);

    if(doneUl.childElementCount <= 1){
        doneTxt.innerText ="you can do it";
    }

}

function delDone(e){
    const doneBtn = e.target;
    const li = doneBtn.parentNode;

    const list = document.querySelectorAll(".doUl_list");

    doneUl.removeChild(li);

    if(doneUl.childElementCount <= 1){
        doneTxt.innerText ="you can do it";
    }
    
}

function saveDone(){
    localStorage.setItem(DONE_LIST, JSON.stringify(done_Array));
}

/*done list*/
function doneFunc(text){
    const li = document.createElement("li"),
        span = document.createElement("span"),
        btn = document.createElement("button"),
        doneBtn = document.createElement("button");

    li.appendChild(span);
    li.appendChild(btn);
    li.appendChild(doneBtn);

    doneUl.appendChild(li);
    
    span.innerText = text;
    btn.innerText = "x";
    doneBtn.innerText = "back";

    input.value = "";

    btn.addEventListener("click", delDone);
    doneBtn.addEventListener("click", doneDone);

    if(doneUl.childElementCount >= 1){
        doneTxt.innerText ="";
    }

    const doneId = done_Array.length + 1;

    li.id = doneId;

    const doneTodosObj = {
        id : doneId,
        text : text
    }

    done_Array.push(doneTodosObj);

    saveDone();
}

function delTodo(e){
    const btn = e.target;
    const li = btn.parentNode;

    doUl.removeChild(li);

    if(doUl.childElementCount <= 1){
        doTxt.innerText ="Add to do";
    }

}

const welTxt = ["well Done!", "Wonderful", "You are the Best", "I'm proud of you :)", "Wow!", "Great!", "amazing!", "perfect!"];


function doneTodo(e){
    const doneBtn = e.target;
    const li = doneBtn.parentNode;

    doUl.removeChild(li);
    //doneUl.appendChild(li);

    const txt = li.childNodes[0].textContent;
    doneFunc(txt);

    //welPop
    const show = welPop.style.display ="block";

    const popP = document.createElement("p");
    const popSpan = document.createElement("span");
    const popBtn = document.createElement("button");

    popP.appendChild(popSpan);
    popP.appendChild(popBtn);

    welPop.appendChild(popP);
    
    const randomTxt = Math.floor(Math.random()*welTxt.length);

    popSpan.innerText = welTxt[randomTxt];
    popBtn.innerText ="x";

    if(show){
        setTimeout(function(){
            welPop.removeChild(popP);
        }, 5000);
    }

    popBtn.addEventListener("click", popDel);

    if(doUl.childElementCount <= 1){
        doTxt.innerText ="Add to do";
    }
}


function popDel(e){
    const btn =e.target;
    const p = btn.parentNode;
    welPop.removeChild(p);
}
/*
    function editTodo(e){
        const editBtn = e.target;        
        const li = editBtn.parentNode;
        const span = li.childNodes[0];
        const doneBtn = li.childNodes[3];

        const spanTxt = span.textContent;

        const newTxt = document.createElement("input");
        newTxt.classList.add("newTxt");
        const cancelBtn = document.createElement("button");
        //span.style.display="none";
        li.replaceChild(newTxt, span);
        li.replaceChild(cancelBtn, doneBtn);

        editBtn.innerText ="edit it";
        cancelBtn.innerText = "cancel";
        newTxt.value = spanTxt;

        editBtn.addEventListener("click", editComplet);
        cancelBtn.addEventListener("click", cancelEdit);   
    }

    function editComplet(e){
        const editBtn = e.target;  
        const li = editBtn.parentNode;  
        const input = li.childNodes[0];
        const cancelBtn = li.childNodes[3];

        const editedTxt = document.createElement("span"); 
        const doneBtn = document.createElement("button"); 

        li.replaceChild(editedTxt, input);
        li.replaceChild(doneBtn, cancelBtn);

        editedTxt.innerText = input.value;
        doneBtn.innerText = "done";
        editBtn.innerText = "edit";

        doneBtn.addEventListener("click", editTodo);
    }

    function cancelEdit(){
        const cancelBtn = e.target;  
        const li = editBtn.parentNode;  
    }
*/


function saveToDos(){
    localStorage.setItem(TODO_LIST, JSON.stringify(todo_Array));
}


/*do list*/
function doFunc(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");
   // const editBtn = document.createElement("button");
    const doneBtn = document.createElement("button");

    li.appendChild(span);
    li.appendChild(btn);
  //  li.appendChild(editBtn);
    li.appendChild(doneBtn);

    doUl.appendChild(li);
    
    span.innerText = text;
    btn.innerText = "x";
   // editBtn.innerText = "edit";
    doneBtn.innerText = "done";

    input.value = "";
    
    btn.addEventListener("click", delTodo);
    doneBtn.addEventListener("click", doneTodo);
    //editBtn.addEventListener("click", editTodo);

    if(doUl.childElementCount >= 1){
        doTxt.innerText ="";
    }

    const newId = todo_Array.length + 1;

    li.id = newId;

    const todoObj = {
        id : newId,
        text : text
    }

    todo_Array.push(todoObj);

    saveToDos();
}





function formFunc(e){
    e.preventDefault();

    const text = input.value;

    if(text == ""){
        alert("what to do?");
    }else{
        doFunc(text);
    }

    
}

function loadToDos(){
    const getToDos = localStorage.getItem(TODO_LIST);

    if(getToDos !== null){
        const parsedToDos = JSON.parse(getToDos);

        parsedToDos.forEach(function(todos){
            doFunc(todos.text);
        });
    }

}

function loadDone(){
    const doneTodos = localStorage.getItem(DONE_LIST);

    if(doneTodos !== null){
        const parsedDone = JSON.parse(doneTodos);

        parsedDone.forEach(function(done){
            doneFunc(done.text);
        });
    }
}

function init(){
    todoForm.addEventListener("submit", formFunc);
    loadToDos();
    loadDone();
}

init();


/*-----------유저 이름 물어보고 저장하기------------*/

const askPop = document.querySelector(".ask_name_pop");
const askForm = askPop.querySelector(".ask_n_form");
const askInpt = askForm.querySelector(".ask_n_inpt");
const mask = document.querySelector(".mask");

const nameWelcom = document.querySelector(".header_wrap .name_sec");
const memoArea = document.querySelector(".memo textarea");

const USER_LS = "current_user";
const SHOW_POP = "show_ask_pop";
const MEMO = "current_memo";

function saveName(val){
    localStorage.setItem(USER_LS, val);

    welComeFunc(val);
}

function handleSubmit(e){
    e.preventDefault();
    const currentVal = askInpt.value;

    askPop.classList.add("anim_ask_pop");
    mask.classList.add("anim_mask");

    setInterval(function(){
        mask.classList.remove(SHOW_POP);
    }, 1000);
    

    saveName(currentVal);
}


function askForName(){
    askPop.classList.add(SHOW_POP);
    mask.classList.add(SHOW_POP);
    askForm.addEventListener("submit", handleSubmit);
}

function welComeFunc(val){
    nameWelcom.innerText = `Welcome ${val}!`;
}

function saveMemo(){
    const memoVal = memoArea.value;

    localStorage.setItem(MEMO, memoVal);
}


function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    const currentMemo = localStorage.getItem(MEMO);

    if(currentUser === null){
        askForName();
    }else{
        welComeFunc(currentUser);
    }

    if(currentMemo === null){
        memoArea.addEventListener("input", saveMemo);    
    }else{
        memoArea.value = currentMemo;
    }
}


function nameInit(){
    loadName();


}

nameInit();



