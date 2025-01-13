function addTask(){
    const input = document.getElementById("taskInput").value;

   if(input==="") {
    alert("Task emety");

   }
   else{
    view.innerHTML += /*HTML*/`
    <div id= "listContainer">
    <div id= "deliteIcon"onclick="deliteTask()">\u00d7</div>
    <li id= "task" onclick= "checkToggle()">${input}</li>
    
    </div>
    `;
   }
}

function deliteTask(){

    document.getElementById("listContainer").remove(this);
}

function checkToggle(){
    let task = document.getElementById("task")

    if(task.class =="checked"){
        task.classList.remove("checked")
    }else if(task.class == ""){
        task.classList.add("checked")
    }

}