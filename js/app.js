/**
 * Task class to hold all task data
 */
class Task
{
    id = 0;
    todo = "";
    done = false;
}

/**
 * Array of Task objects
 */
let list_of_tasks = [];

/**
 * Function to update a todo as done / not done
 * 
 * @param {int} id 
 */
const toggleTodoTask = (id) =>
{
    list_of_tasks.forEach(task => {
        if(task.id == id){ 
            task.done = !task.done;
        }
    });

    //update view
    updateViewList();
}

/**
 * Function to remove a task
 * 
 * @param {int} id 
 */
const removeTodoTask = (id) =>
{
    let new_list_of_tasks = [];
    list_of_tasks.forEach(task => {
        if(task.id != id){ 
            new_list_of_tasks = [...new_list_of_tasks, task];
        }
    });

    list_of_tasks = new_list_of_tasks;

    //update view
    updateViewList();
}

/**
 * Function to add todo
 */
const addTodoTask = () =>
{
    let new_task = new Task();
    new_task.id = getNextId();
    new_task.todo = id('new-todo').value;
    id('new-todo').value = "";
    
    //add new task to list
    list_of_tasks = [...list_of_tasks, new_task];

    //Update view
    updateViewList();
}

/**
 * Function to get id of next task to add
 * Just the highest number of tasks + 1 
 * 
 * @return {int} next_id
 */
const getNextId = () => {
    let next_id = 0;
    
    list_of_tasks.forEach(task => {
        if(task.id >= next_id){ 
            next_id = task.id + 1;
        }
    });

    return next_id;
}

/**
 * Function to update view
 * Lazy update, loop all task and just replace the current html
 */
const updateViewList = () => {
    let html = "";
    list_of_tasks.forEach(task => {
        let done = task.done ? 'done' : '';
        let done_title = task.done ? 'Mark task as uncomplete' : 'Mark task as complete';
        let done_hover = task.done ? 'notdone' : '';
        
        html += '<div id="'+ task.id +'" class="row-todo">';
        html += '<div class="row-todo-description '+ done_hover +'" onclick="toggleTodoTask('+ task.id +')" title="'+ done_title +'"><div class="row-todo-description-text '+ done +'">'+ task.todo+'</div></div>';
        html += '<div class="row-todo-delete" onclick="removeTodoTask('+ task.id +')" title="Delete task">x</div>';
        html += '</div>'
    });

    id('list-all-task').innerHTML = html;

    //save list to localstorage
    saveList();
}

/**
 * Function to get element by id
 * @param {string} id 
 */
const id = id => {
    return document.getElementById(id);
}

/**
 * Function to save current list to localstorage
 */
const saveList = () => {
    if( list_of_tasks.length>0 ){
        localStorage.setItem('todo-list-v1', JSON.stringify(list_of_tasks));
    }
}

/**
 * Function to load previusly saved list in localstorage
 */
const loadList = () => {
    if( localStorage.getItem('todo-list-v1').length>0 ){
        list_of_tasks = JSON.parse(localStorage.getItem("todo-list-v1"));
        //update view with tasks
        updateViewList();
    }
}

/**
 * Load saved list on document ready
 */
document.addEventListener("DOMContentLoaded", function(){
    loadList();
    id('new-todo-button').onclick = () => addTodoTask();
});