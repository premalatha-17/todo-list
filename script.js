const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const progressar = document.getElementById('progress-bar');

window.onload = function(){
    loadTasks();
}

addTaskBtn.addEventListener('click', ()=>{
    const taskText = taskInput.value.trim();
    if(taskText !== ''){
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(text, done = false, createdAt=new Date().toLocaleString()){
    const li = document.createElement('li');

    const metaDiv = document.createElement('div');
    metaDiv.className = 'task-meta';
    metaDiv.innerHTML = `<span>${text}</span><small>${createdAt}</small>`;
    li.appendChild(metaDiv);

    const checkbox= document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = done;

    if(done){
        li.classList.add('task-done');
    }

    checkbox.addEventListener('change', ()=>{
        if(checkbox.checked){
            li.classList.add('task-done');
        }
        else{
            li.classList.remove('task-done');
        }
        saveTasks();
        updateProgressBar();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';

    deleteBtn.addEventListener('click',() =>{
        taskList.removeChild(li);
        saveTasks();
        updateProgressBar();
    });

    li.prepend(checkbox);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTasks();
    updateProgressBar();
}

function saveTasks(){
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li=>{
        const text = li.querySelector('.task-meta span').textContent;
        const time = li.querySelector('.task-meta small').textContent;
        const done = li.classList.contains('task-done');
        tasks.push({text, done, createdAt: time });
            
        });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(tasks=>{
        addTask(task.text, task.done, task.createdAt);
    });
    updateProgressBar();
}
        function updateProgressBar() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll('.task-done').length;
    const percent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = `${percent}%`;

}