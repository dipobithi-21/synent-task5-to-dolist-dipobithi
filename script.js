const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                No tasks available. Add your first task!
            </div>
        `;
        return;
    }

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="task-text ${task.status === "Completed" ? "completed" : ""}">
                ${task.text}
            </span>

            <div class="actions">
                <select class="status-select">
                    <option value="Pending"
                        ${task.status === "Pending" ? "selected" : ""}>
                        Pending
                    </option>

                    <option value="Completed"
                        ${task.status === "Completed" ? "selected" : ""}>
                        Completed
                    </option>
                </select>

                <button class="delete-btn">
                    Delete
                </button>
            </div>
        `;

        const statusSelect = li.querySelector(".status-select");

        statusSelect.addEventListener("change", (e) => {
            tasks[index].status = e.target.value;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.push({
        text: taskText,
        status: "Pending"
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

renderTasks();
