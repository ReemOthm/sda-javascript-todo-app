let todos = [];
let id = 1;

const addButton = document.getElementById('add-btn');

// -------Handler Add Button
addButton.addEventListener('click', (e)=> {
    e.preventDefault();
    const todoTitle = document.getElementById("add-input").value.trim();
    const todoDescription = document.getElementById('add-description').value.trim();
    
    let todo = {
        id: id++,
        title: todoTitle,
        description: todoDescription,
        completed: false,
    }
    
    todos.unshift(todo);
    console.log(todos);
});




