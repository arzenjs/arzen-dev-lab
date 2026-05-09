const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todoList = JSON.parse(localStorage.getItem("todo")) || [];

function saveTodo() {
    localStorage.setItem("todo", JSON.stringify(todoList))
}

function renderSavedTodos() {
    for (let i = 0; i < todoList.length; i++) {
        const todo = todoList[i];
        createTodos(todo)
    }
}

renderSavedTodos()

addBtn.addEventListener("click", () => {
    if (taskInput.value !== "") {
        if (taskInput.value.length <= 100) {
            const trimmed = taskInput.value.trim();
            const isDuplicate = todoList.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase());
            
            if (isDuplicate) {
                alert("This task already exists.");
                return;
            }
            
            todoList.push({ id: Date.now(), text: trimmed, completed: false })
            saveTodo();
            createTodos(todoList[todoList.length - 1])
            taskInput.value = "";
            taskInput.focus();
        } else {
            alert("Task length should be less than 100 characters.");
        }
    } else {
        alert("Please enter a task.");
    }
})

function createTodos(todo) {
    const li = document.createElement("li");
    li.innerHTML = `
    <div><input type="checkbox" class="checkbox">
    <p class="todoTask" data-id=${todo.id}>${todo.text}</p></div>
    <div><button class="todoBtn editBtn">✏️</button>
    <button class="todoBtn deleteBtn">❌</button></div>`;
    taskList.appendChild(li)

    const todoTask = li.querySelector(".todoTask")
    const id = Number(todoTask.getAttribute("data-id"));
    const checkbox = li.querySelector(".checkbox")
    const editBtn = li.querySelector(".editBtn")
    const deleteBtn = li.querySelector(".deleteBtn")

    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit task:", todoTask.textContent);

        if (newText.length > 100) {
            alert("Task length should be less than 100 characters.");
            return;
        }
        if (!newText || !newText.trim()) return;

        const trimmed = newText.trim();
        todoList.forEach(item => {
            if (item.id === id) {
                item.text = trimmed;
            }
        });

        todoTask.textContent = trimmed;

        saveTodo();
    });


    deleteBtn.addEventListener("click", () => {
        todoList = todoList.filter(todo => todo.id !== id);
        li.remove()
        saveTodo();
    })

    checkbox.checked = todo.completed || false;
    if (todo.completed) {
        todoTask.classList.add("completed");
    }

    checkbox.addEventListener('change', () => {
        todoTask.classList.toggle('completed', checkbox.checked)
        todoList.forEach(item => {
            if (item.id === id) {
                item.completed = checkbox.checked
                console.log(item.completed);
            }
            saveTodo();
        })
    })
}