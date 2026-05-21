const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load saved todos
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

// Save todos
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Create Todo Node
function createTodoNode(todo, index) {

    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    // Text
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    // Checkbox Event
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        textSpan.style.textDecoration =
            todo.completed ? "line-through" : "";

        saveTodos();
    });

    // Edit Todo
    textSpan.addEventListener("dblclick", () => {

        const newText = prompt("Edit Todo", todo.text);

        if (newText !== null) {

            todo.text = newText.trim();

            textSpan.textContent = todo.text;

            saveTodos();
        }
    });

    // Delete Button
    const delBtn = document.createElement("button");

    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", () => {

        todos.splice(index, 1);

        render();

        saveTodos();
    });

    // Append
    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// Render Todos
function render() {

    list.innerHTML = "";

    todos.forEach((todo, index) => {

        const node = createTodoNode(todo, index);

        list.appendChild(node);
    });
}

// Add Todo
function addTodo() {

    const text = input.value.trim();

    if (!text) {
        return;
    }

    todos.push({
        text: text,
        completed: false
    });

    input.value = "";

    render();

    saveTodos();
}

// Add Button Event
addBtn.addEventListener("click", addTodo);

// Enter Key Event
input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        addTodo();
    }
});

// Initial Render
render();