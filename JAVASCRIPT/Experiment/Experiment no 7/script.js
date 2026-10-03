// ==========================================
// DOM TRAVERSAL & TO-DO LIST APPLICATION
// Name: Divyanka Chakole
// PRN: 24070521149
// ==========================================

// DOM Traversal - Selecting elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");


// ==========================================
// ADD TASK
// ==========================================

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        taskInput.focus();
        return;
    }

    // Creating new DOM element
    const li = document.createElement("li");

    li.className = "task";

    li.innerHTML = `
        <input type="checkbox" class="checkbox">

        <span class="task-text">${taskText}</span>

        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Append new task to DOM
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    taskInput.focus();

    updateStats();
}


// ==========================================
// EDIT TASK
// ==========================================

function editTask(taskElement) {

    // DOM Traversal
    // Find the task text inside the selected <li>
    const taskTextElement = taskElement.querySelector(".task-text");

    const oldText = taskTextElement.textContent;

    const newText = prompt("Edit your task:", oldText);

    if (newText !== null && newText.trim() !== "") {

        taskTextElement.textContent = newText.trim();
    }
}


// ==========================================
// DELETE TASK
// ==========================================

function deleteTask(taskElement) {

    if (confirm("Are you sure you want to delete this task?")) {

        // Removing element from DOM
        taskElement.remove();

        updateStats();
    }
}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStats() {

    // DOM Traversal
    // Get all task elements inside the list
    const tasks = taskList.querySelectorAll(".task");

    const total = tasks.length;

    // Count completed tasks
    const completed = taskList.querySelectorAll(
        ".task.completed"
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    pendingTasks.textContent = pending;

    // Show / hide empty message
    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// ==========================================
// EVENT LISTENER - ADD
// ==========================================

addBtn.addEventListener("click", addTask);


// ==========================================
// ENTER KEY TO ADD TASK
// ==========================================

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// ==========================================
// EVENT DELEGATION
// ==========================================

taskList.addEventListener("click", function(event) {

    // DOM Traversal using closest()
    const taskElement = event.target.closest(".task");

    if (!taskElement) {
        return;
    }

    // Edit button clicked
    if (event.target.classList.contains("edit-btn")) {

        editTask(taskElement);
    }

    // Delete button clicked
    if (event.target.classList.contains("delete-btn")) {

        deleteTask(taskElement);
    }

});


// ==========================================
// MARK TASK AS COMPLETED
// ==========================================

taskList.addEventListener("change", function(event) {

    if (event.target.classList.contains("checkbox")) {

        // DOM Traversal
        // Move from checkbox to its parent <li>
        const taskElement = event.target.closest(".task");

        // Toggle completed class
        taskElement.classList.toggle(
            "completed",
            event.target.checked
        );

        updateStats();
    }

});


// ==========================================
// CLEAR ALL TASKS
// ==========================================

clearBtn.addEventListener("click", function() {

    const tasks = taskList.querySelectorAll(".task");

    if (tasks.length === 0) {
        return;
    }

    if (confirm("Delete all tasks?")) {

        // Remove all child nodes
        taskList.innerHTML = "";

        updateStats();
    }

});


// ==========================================
// INITIAL STATE
// ==========================================

updateStats();