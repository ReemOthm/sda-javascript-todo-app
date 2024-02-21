let todos = [];
let id = 1;

const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const todoTitle = document.getElementById("add-input");
const todoDescription = document.getElementById('add-description');

// ----------Checking the local storage-----------
if (window.localStorage.todos){
    JSON.parse(window.localStorage.getItem('todos')).forEach(element => { //assign the array again
        todos.push(element);
    });

    console.log(todos);
    createTodos();
}
else{
    const tasks = document.querySelector('.tasks');
    const noTodos = document.createElement('p');
    noTodos.textContent = "No Todos added";
    noTodos.classList.add('no');
    tasks.appendChild(noTodos);
}

// -------Handler Add Button-------------
addButton.addEventListener('click', (e)=> {
    e.preventDefault();
    if ( todoTitle.value !== '' && todoDescription.value !== ''){
        todos.push(
            {
                id: id++, 
                title: todoTitle.value.trim(),
                description: todoDescription.value.trim(),
                completed: false,
            }
        );

        console.log(todos);
        window.localStorage.setItem('todos',JSON.stringify(todos));
        createTodos();
        location.reload();
        todoTitle.value = '';
        todoDescription.value = '';
    }
});


// -----------Render Todos-----------                                        ////need to fix
function createTodos(){
    JSON.parse(localStorage.getItem('todos')).forEach((todo)=>{
        //tha main div
        const task = document.createElement('div');
        task.classList.add('task');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        const title = document.createElement('h3');
        title.classList.add('task__title');
        title.textContent = todo.title;

        const icons = document.createElement('div');
        icons.classList.add('task-icons');
        
        const edit =document.createElement('span');
        edit.classList.add('edit');
        
        const del =document.createElement('span');
        del.classList.add('del');
        
        icons.appendChild(edit);
        icons.appendChild(del);

        taskHeader.appendChild(checkbox);
        taskHeader.appendChild(title);
        taskHeader.appendChild(icons);

        const description = document.createElement('p')
        description.classList.add('task__description');
        description.textContent = todo.description;

        task.appendChild(taskHeader);
        task.appendChild(description);

        list.appendChild(task);
    }
    );
}





