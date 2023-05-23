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

let renderTodo = () => {
    let items = getLocalStorage('todoItems');
    //종료시간 순으로 데이터를 화면에 렌더링 
    items.sort((a,b) => a.todoEndAt - b.todoEndAt);
    todoItems.innerHTML = ''; //기존에 렌더링 되어있는 todo 클리어

    items.forEach(e => {
        let todoLi = document.createElement('li');
        todoLi.className = 'btn-lightcoral item row-between';
        let textNode = document.createTextNode(e.todoTitle);
        let trashIcon = document.createElement('i');
        trashIcon.className = 'fa-solid fa-trash-can icon-trash';

        //자바스크립트에서 함수는 1급객체
        // 1급객체 : 값으로 다룰 수 있는 것
        //        변수에 담을 수 있다.
        //        반환값으로 사용될 수 있다.
        //        매개변수로 전달할 수 있다.
        trashIcon.addEventListener('click', ev => {
            removeLocalStorage('todoItems', a => a.id != e.id);
            renderTodo();
            ev.stopPropagation();
        })

        todoLi.addEventListener('click', ev => {
            popInpTodo.style.display='flex';
        })

        todoLi.appendChild(textNode);
        todoLi.appendChild(trashIcon);
        todoItems.appendChild(todoLi);
    });
}

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
    renderTodo();

    popInpTodo.style.display='none';
})


renderTodo();
