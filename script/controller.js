
const view= document.getElementById("app")

function addTask(){

    let taskInput = document.getElementById('taskInput').value;
    let timeInput = document.getElementById('timeInput').value;
    let descriptInput = document.getElementById('descriptInput').value;

    if(taskInput === "" && timeInput ==="" && descriptInput === ""){
        alert("Please fill out missing areas");
    }else{
      createTask()
    }
}

function createTask(){

    const task =document.createElement("li")

    task.innerHTML = /*HTML*/`
    <div class="task" onclick="checkToggle(this)">
       <div class="text">${taskInput.value}</div>
       <div class="time">${timeInput.value}</div>
       <div class="deliteIcon">&#9747;</div>
       <div class ="descript"> ${descriptInput.value}</div>
    </div>
    `;

    document.getElementById("listContainer").appendChild(task);
}

function deleteTask(){

}

function editTask(){

}

function checkToggle(this){
    let task= document.getElementsByClassName("task");
    if(task.classlist !== "checked")
        task.classlist.toggle("checked")
    else if(task.classlist == "checked")
        task.classlist.remove("checked")
}
