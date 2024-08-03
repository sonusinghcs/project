
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const storedtasks = JSON.parse(localStorage.getItem("tasks"))
    
    if (storedtasks) {
        storedtasks.forEach((task) => tasks.push(task));
    }
    updateTaskList();
    updatestats();
    
})
 const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({text: text, completed: false});
        updateTaskList();
        
    }
    
    updatestats();
    saveTasks();

};

const toggleTaskComplete = (index) => {
    tasks[index].completed =!tasks[index].completed;
    
    updateTaskList();
    updatestats();
    saveTasks();
    
}
const deleteTask = (index) => {
tasks.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTasks();
}

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    updateTaskList();
    updatestats();
    saveTasks();
};

const updatestats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const taskCount = tasks.length;
    let progress = (completedTasks / taskCount) * 100;
    if (isNaN(progress)) {
        progress = 0;
    }
    
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;
    document.getElementById("numbers").innerText = `${completedTasks}/${taskCount}`;
}

const updateTaskList = () => {
    const taskList = document.getElementById("task-list")

    taskList.innerHTML = " ";
    
    tasks.forEach((task,index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML=`
        <div class="taskItem">
            <div class="task ${task.completed ? 'completed':''}">
                <input type="checkbox" id="check" class = "checkbox"${task.completed?"checked":""}/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})"/>
                <img src="./img/bin.png" onClick="deleteTask(${index})"/>
            </div>
        </div>`;
        listItem.addEventListener("change",()=>toggleTaskComplete(index));
        taskList.append(listItem);
        
    });
        
};


document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
    addTask();
    
    document.getElementById("taskInput").value = "";
})