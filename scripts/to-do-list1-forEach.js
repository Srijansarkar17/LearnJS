const ToDoList = [];
ToDoList = [
    {
        name: 'make dinner',
        date: '2025-05-06',
    },
    {
        name: 'wash dishes',
        date: '2025-05-07'
    }
]


renderToDoList();

function renderToDoList() {
    let todoListHTML = '';
    ToDoList.forEach(function (todoObject, index) {
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button onclick="
            ToDoList.splice(${index}, 1); 
            renderToDoList();
        " class="delete-todo-button">Delete</button>
            `;
        // we seperated each todo into three seperate elements for css
        //in the above code we are deleting the ith value when we click the delete button
        todoListHTML += html; //combined the paragraphs together
    });
    console.log(todoListHTML);
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}


    function addToDo() {
        const addElement = document.querySelector('.js-input');
        const name = addElement.value;

        const dateInputElement = document.querySelector('.js-due-date-input');
        const dueDate = dateInputElement.value;

        ToDoList.push({
            name: name,
            dueDate: dueDate
        });
        console.log(ToDoList);

        addElement.value = ''; //reset the textbox after pressing add
        dateInputElement.value = '';
        renderToDoList();
    }