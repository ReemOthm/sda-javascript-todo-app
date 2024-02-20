let todos = [];
let id = 1;

const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const todoTitle = document.getElementById("add-input");
const todoDescription = document.getElementById('add-description');

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
        // window.localStorage.setItem('tasks',JSON.stringify(arrayTasks));
        todoTitle.value = '';
        todoDescription.value = '';
    }
});







