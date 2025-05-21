let ToDoList = [];
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
    ToDoList.forEach((todoObject, index) => {
        const name = todoObject.name;
        const dueDate = todoObject.dueDate;
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-button">Delete</button>
            `;
        // we seperated each todo into three seperate elements for css
        //in the above code we are deleting the ith value when we click the delete button
        todoListHTML += html; //combined the paragraphs together
    });
    console.log(todoListHTML);
    document.querySelector('.js-todo-list').innerHTML = todoListHTML; //add the html on the page
    //after adding the html on the page only we can write the eventListener code for the deletebutton

    //now for the deletebutton we are going to use eventListener instead of using onclick atttribute
    document.querySelectorAll('.js-delete-button') //querySelectorAll gives the all the buttons on the page that have the class js-delete-button

    //now after using querySelectorAll all the delete buttons are stored as an array.
    //now using forEach Loop we loop through the array of deletebuttons
        .forEach((deleteButton, index) => {
            //the whole delete button element is stored inside the variable deleteButton
            //for each delete button we created an eventListener and deleted the todolist upon clicking it
            deleteButton.addEventListener('click', () => {
                ToDoList.splice(index, 1); 
                renderToDoList();
            })
        })
}

//we are using addEventListeners instead of onclick in html
document.querySelector('.js-add-button')
    .addEventListener('click', () => {
        addToDo();
    });

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