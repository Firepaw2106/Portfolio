function addTask(){
    const input = document.getElementById("taskInput").value;

    view.innerHTML += /*HTML*/`
    <div id= "listContainer">
    <li><input type="checkbox">${input}</li>
    </div>
    `;
}