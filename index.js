let todos = [];

const tasks = document.querySelector('.tasks');
const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const todoTitle = document.getElementById("add-input");
const todoDescription = document.getElementById('add-description');
const noAdded = document.querySelector('p.no-added');

const searchInput = document.querySelector('#search-todos .inputs');
const searchButton = document.querySelector('#search-todos .button');

// ----------Checking the local storage-----------
const loadStorageTodos = () => {
    try {
        const storageTodos = JSON.parse(window.localStorage.getItem('todos'));
        if (storageTodos){
            todos = storageTodos;
            createTodos(todos);
            counterTodos();
            completedTodos();
            clearHandler();
            noAdded.style.display = 'none';
        }
    } catch (error) {
        console.log(error);
    }
}

// -------Add Button Handler-------------
addButton.addEventListener('click', (e)=> {
    e.preventDefault();
    list.innerHTML = '';
    if ( todoTitle.value !== '' ){
        const date = new Date();

        todos.push(
            {
                id: todos.length, 
                title: todoTitle.value.trim(),
                description: todoDescription.value.trim(),
                completed: false,
                date: `${date.getDate()}/${date.getMonth()+1} - ${date.getHours()}:${date.getMinutes()}`
            }
        );
        
        window.localStorage.setItem('todos',JSON.stringify(todos));

        todoTitle.value = '';
        todoDescription.value = '';
    } else{
        document.querySelector('p.inputError').textContent = 'enter a todo title';
    }

    loadStorageTodos();
});

// -------Search Button Handler-------------
searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    if(searchInput.value !== ''){
        const searchTodo = todos.filter((todo) => {
            return todo.title.includes(searchInput.value.toLowerCase().trim());
        });

        list.innerHTML = '';
        document.querySelector('.details').style.display = 'none';

        if(searchTodo.length > 0 ){
            createTodos(searchTodo, displayNone = true);
        }else{
            const notFound = document.createElement('p');
            notFound.textContent = 'No Todos Match';
            notFound.classList.add('no-todos');
            list.appendChild(notFound);
        }
        
        const closeSearch = document.createElement('button');
        closeSearch.textContent = 'Close Search';
        closeSearch.classList.add('button');
        
        tasks.appendChild(closeSearch);
        
        closeSearch.addEventListener('click', ()=>{
            searchInput.value = '';
            list.innerHTML = '';
            document.querySelector('.details').style.display = 'block';
            createTodos(todos);
            tasks.removeChild(closeSearch);
        });
    }
});

// Functions
// -----------Render Todos-----------                                        
function createTodos(todos, displayNone = false){
    todos.forEach((todo,index)=>{
        //tha main div
        const task = document.createElement('div');
        task.classList.add('task');

        const taskHeader = document.createElement('div');
        taskHeader.classList.add('task-header');

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        checkbox.addEventListener('change', ()=>{
            checkedTodo(checkbox, index, title, description);
            completedTodos();
        })

        const title = document.createElement('h3');
        title.classList.add('task__title');
        title.textContent = todo.title;

        const icons = document.createElement('div');
        icons.classList.add('task-icons');
        
        const edit =document.createElement('span');
        edit.classList.add('edit');

        edit.addEventListener('click', ()=>{
            editHandler(todo,index);
        })
        
        const del =document.createElement('span');
        del.classList.add('del');

        del.addEventListener('click', ()=>{
            deleteTodo(todo.id);
        });

        if(displayNone == true){
            edit.style.display = 'none';
            del.style.display = 'none';
        }
        
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

        const spanDate = document.createElement('span');
        spanDate.textContent = todo.date;
        spanDate.classList.add('date');

        checkedTodo(checkbox, index, title, description);

        task.appendChild(spanDate);

        list.appendChild(task);
    }
    );
}

// ----------Clear Todos----------
function clearHandler(){
    const clearBtn = document.querySelector('button.clear');
    clearBtn.style.display = 'block'
    clearBtn.addEventListener('click', ()=> {
        localStorage.clear();
        location.reload();
    });
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

// --------Edit Todo----------------
const editHandler = (todo, index)=>{
    const editTodos = document.getElementById('edit-todos');
    editTodos.style.display = "grid";
    
    const editTitle = document.getElementById('edit-title');
    editTitle.value = todo.title;
    
    const editDescription = document.getElementById('edit-description');
    editDescription.value = todo.description;

    const editedDate = new Date();
    
    const editBtn = document.getElementById('edit-btn');
    editBtn.onclick = (e)=>{
        e.preventDefault();
        todos.splice(index,1, {
            id: todo.id,
            title: editTitle.value, 
            description: editDescription.value, 
            completed: false,
            date: `${editedDate.getDate()}/${editedDate.getMonth()+1} - ${editedDate.getHours()}:${editedDate.getMinutes()}`
        });
        console.log(todos);
        list.innerHTML = '';
        createTodos(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
        editTodos.style.display = "none";        
    };
    
    const closeBtn = document.getElementById('close-btn');
    closeBtn.onclick = (e)=>{
        e.preventDefault();
        editTodos.style.display = "none";        
    };
}

//-----------Checked Todos------------
function checkedTodo(checkbox, index, title, description){
    if(checkbox.checked){
        title.style.textDecoration = 'line-through';
        description.style.textDecoration = 'line-through';
        todos[index].completed = true;
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos);
    } else{
        title.style.textDecoration = 'none';
        description.style.textDecoration = 'none';
        todos[index].completed = false;
        localStorage.setItem('todos', JSON.stringify(todos));
        console.log(todos);
    }
}

// -----------Counter Todos-----------
function counterTodos(){
    const todosCounter = document.getElementById('todos-counter');
    todosCounter.textContent = `number of Todos (${todos.length})`;
    todosCounter.classList.add('counter');
}

//----------Completed Todos------------
function completedTodos(){
    let completedTodosNumber = 0;
    todos.forEach((todo)=>{
        if(todo.completed === true ){
            completedTodosNumber += 1;
        }
    }); 
    localStorage.setItem('completedTodo', completedTodosNumber); 

    const completed = document.getElementById('completed');
    completed.classList.add('counter');
    completed.textContent = `Completed (${localStorage.getItem('completedTodo')})`;
}

window.addEventListener('DOMContentLoaded', loadStorageTodos);