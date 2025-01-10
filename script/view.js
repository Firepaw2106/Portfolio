function updateView(){
    view.innerHTML = /*HTML*/`
    
    <div id= "headline"> 
    <h1> TO DO LIST</h1>
    <input id="taskInput" type="text" placeholder= "" onchange="this.value">
    <button id="addButton" onclick="addTask()">ADD</button>
    </div>

    `;
}