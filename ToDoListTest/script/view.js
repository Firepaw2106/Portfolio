function updateView(){
    view.innerHTML = /*HTML*/`
    
    <div id= "headline"> 
       <h1> TO DO LIST</h1>
       <input id="taskInput" type="text" placeholder= "" onchange="this.value">
       <button id="addButton" onclick="addTask()">ADD</button>
       <input id="timeInput" type="datetime-local" onchange="this.value">
       <input id="descriptInput" type="text" onchange="this.value">

    </div>

    <div>
       
      <ul id="listContainer">${taskArray}</ul>
      
    </div>

    `;
}