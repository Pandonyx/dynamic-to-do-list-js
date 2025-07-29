document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        if (typeof taskText === 'undefined' || taskText === 'object') {
            taskText = taskInput.value.trim();
            save = true;

            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(listItem);

            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Filter out the task that was just removed
            storedTasks = storedTasks.filter(task => task !== taskText);
            if (storedTasks.length > 0) {
                localStorage.setItem('tasks', JSON.stringify(storedTasks));
            }
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            taskInput.value = "";

            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    loadTasks();

    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});