let todos = [];

const tasks = document.querySelector('.tasks');
const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const todoTitle = document.getElementById("add-input");
const todoDescription = document.getElementById('add-description');

// ----------Checking the local storage-----------
const loadStorageTodos = () => {
    try {
        const storageTodos = JSON.parse(window.localStorage.getItem('todos'));
        if (storageTodos){
            todos = storageTodos;
            console.log(todos);
            createTodos(todos);
            clearHandler();
        }
        else{
            const noTodos = document.createElement('p');
            noTodos.textContent = "No Todos added";
            noTodos.classList.add('no');
            tasks.appendChild(noTodos);
        }
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', loadStorageTodos);

// -------Handler Add Button-------------
addButton.addEventListener('click', ()=> {

    if ( todoTitle.value !== '' && todoDescription.value !== ''){

        todos.push(
            {
                id: todos.length, 
                title: todoTitle.value.trim(),
                description: todoDescription.value.trim(),
                completed: false,
            }
        );
        
        console.log(todos);
        window.localStorage.setItem('todos',JSON.stringify(todos));

        todoTitle.value = '';
        todoDescription.value = '';
    }
});

// Functions
// -----------Render Todos-----------                                        
function createTodos(todos){
    todos.forEach((todo)=>{
        //tha main div
        const task = document.createElement('div');
        task.classList.add('task');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";

        checkbox.addEventListener('change', ()=> {
            if(checkbox.checked){
                title.style.textDecoration = 'line-through';
                description.style.textDecoration = 'line-through';
            }else{
                title.style.textDecoration = 'none';
                description.style.textDecoration = 'none';
            } 
        });

        const title = document.createElement('h3');
        title.classList.add('task__title');
        title.textContent = todo.title;

        const icons = document.createElement('div');
        icons.classList.add('task-icons');
        
        const edit =document.createElement('span');
        edit.classList.add('edit');
        
        const del =document.createElement('span');
        del.classList.add('del');

        del.addEventListener('click', ()=>{
            deleteTodo(todo.id);
        });
        
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

        const date = new Date();
        const spanDate = document.createElement('span');
        spanDate.textContent = `${date.getDate()}/${date.getMonth()+1} - ${date.getHours()}:${date.getMinutes()}`;
        spanDate.classList.add('date');

        task.appendChild(spanDate);

        list.appendChild(task);
    }
    );
}

// ----------Clear Todos----------
function clearHandler(){
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.classList.add('button', 'clear');

    clearBtn.addEventListener('click', ()=> {
        localStorage.clear();
        location.reload();
    });

    tasks.appendChild(clearBtn);
}

// ---------Delete Todo------------
const deleteTodo = (id)=> {
    todos = todos.filter(todo => todo.id !== id);
    list.innerHTML = '';
    createTodos(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    if(todos.length == 0){
        localStorage.clear();
        location.reload();
    }
}


