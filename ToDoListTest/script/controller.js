
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

let taskArray = []

function createTask(){

    let task =document.createElement("li")

    task.innerHTML = /*HTML*/`
    <div id="taskContainer">
      <div id="test" class="task" onclick="checkToggle(this)">
           <div class="text">${taskInput.value}</div>
           <div class="time">${timeInput.value}</div>
           <div id="deliteIcon" >&#9747;</div>
           <div class ="descript"> ${descriptInput.value}</div>
      </div>
    </div>
    `;
    taskArray.push(task)
    console.log(taskArray)

    document.getElementById("listContainer").appendChild(task);
}

// function checkToggle(container){ 
    
    
//      container.classList.toggle("checked");

// }


// let deleteIcon = document.getElementById("deleteIcon");

// if(deleteIcon){
// deleteIcon.addEventListener("click", deleteTask());
// }

// function deleteTask(){

//     let ulList = document.getElementById("listContainer")
//   var li = deleteIcon.closest('li');
  
//   var nodes = array.from( ulList );
  
//   var index = nodes.indexOf( li );
  
//   taskArray.splice(index,1);
    
// }

let taskContainer = document.getElementById("taskContainer")
if(taskContainer){
listContainer.addEventListener("click",function(e){
    if(e.target.tagName ==="BUTTON")
        e.target.parentElement.remove();
},false);
}
function editTask(){

}

