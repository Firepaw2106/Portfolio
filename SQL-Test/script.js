document.addEventListener('DOMContentLoader', () => {
    console.log('Page loaded,attemting ti load tasks...');
    loadTasks();

    document.getElementById('todo-form').addEventListener('submit', async (e) =>{
        e.preventDefault();
        console.log('Form Submitted');
        
        const task = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            deadline: document.getElementById('deadline').value || null
        };
        console.log('Task to be added', task);

        try {
            const response =await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task)
            });
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result =await response.json();
            console.log('Server response:',result);
            
            document.getElementById('todo-form').reset();
            loadTasks();
        } catch(error) {
            console.error('Error adding task:', error);
            alert('Fail to add task, Please try again!');
        }
    });
});

async function loadTasks(){
    try {
        console.log('Festching task from server...');
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
            throw new Error(`HTTP error ! status: ${response.status}`);

        }
        const tasks = await response.json();
        console.log('Recieved tasks:', tasks);

        const todoList = document.getElementById('todo-list');
        todoList.innerHTML ='';

        if (tasks.lenght ===0) {
            todoList.innerHTML ='<div class0"todo-item"> No tasks yet.Add one above!</div>';
            return;
        }

        tasks.forEach(task => {
            const  taskElement = createTaskElement(task);
            todoList.appendChild(taskElement);
            
        });
    } catch (error) {
        console.error('Erorr loading tasks: ', error);
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML ='<div class = "error-massage"> Unable to load tasks. Please make sure the server is running.</div>';
    }
    
}

function createTaskElement(task) {
    const div =document.createElement('div');
    div.className = `todo-item ${task.completed ? 'completed' : ''}`;

    div.innerHTML= /*HTML*/`
        <div class="todo-content">
           <div class = "todo-title">${task.title}</div>
           <div class="todo-description">${task.description}</div>
           ${task.deadline ?`<div class= "todo-dealine"> Deadline: ${new Date(task.deadline).toLocaleString()}</div>`:''}
        </div>
        <div class="todo-actions">
           <button onclick="toggleComplete(${task.id}, ${task.completed})">
               <i class="fas fa-check"></i>
            </button>
            <button onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return div;
 }