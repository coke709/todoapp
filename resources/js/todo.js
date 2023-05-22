let validate = data => {
    if(!data.todoTitle){
        return {"isValid":false, "msg":"제목은 반드시 입력하셔야 합니다."};
    }

    if(data.todoStartedAt >= data.todoEndAt){
        return {"isValid":false, "msg":"종료시간은 시작시간 이후여야 합니다."};
    }

    return {"isValid":true};
}

let generateTodoObj = id => {
    let item = {};
    item.id = id;
    item.todoTitle = todoTitle.value;
    item.todoStartedAt = todoStartedAt.valueAsNumber;
    item.todoEndAt = todoEndAt.valueAsNumber;
    item.todoContent = todoContent.value;
    return item;
}

btnInpTodo.addEventListener('click', ev => {
    popInpTodo.style.display='flex';
})

btnPopInpTodoClose.addEventListener('click', ev => {
    popInpTodo.style.display='none';
})

btnAddTodo.addEventListener('click', ev => {

    let item = generateTodoObj(self.crypto.randomUUID());
    let validObj = validate(item);

    if(!validObj.isValid){
        alert(validObj.msg);
        return;
    } 
    
    addLocalStorage('todoItems', item);

})