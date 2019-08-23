// Write an interactive CLI todo list application using Node's readline and fs modules. 
// It would be best to implement each action as its own function.


const readline = require('readline');

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let todoList = [];

// When first executed
console.log("Welcome to Todo CLI! \n--------------------");
menu();

// Menu
function menu() {
    interface.question("(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n", answer => {

        if (answer === 'v') {
            view();
    
        } else if (answer === 'n') {
            add();
    
        } else if (answer[0] === 'c' && typeof parseInt(answer.substring(1)) == 'number') { 
            complete(parseInt(answer.substring(1)));

        } else if (answer[0] === 'd' && typeof parseInt(answer.substring(1)) == 'number') {
            remove(parseInt(answer.substring(1)));

        } else if (answer === 'q') {
            quit();

        } else {
            console.log('** Please input the valid option **\n');
            menu();
        }
    })
}

// View
function view() { 
    if (todoList.length === 0) {
        console.log('List is empty...\n');
    } else {
        for (let i = 0; i < todoList.length; i++) {
            console.log(`${i} [${todoList[i][1]}] ${todoList[i][0]}`);
        }
    }
    menu();
}


// Add
function add() {
    interface.question("What?\n", todoItem => {
        todoList.push([todoItem, ' ']);
        menu();
    })
}

// Complete
function complete(todoItemIndex) {
    todoList[todoItemIndex][1] = '✓';
    console.log(`Completed "${todoList[todoItemIndex][0]}"\n`);
    menu();
}

// Remove
function remove(todoItemIndex) {
    let removed = todoList[todoItemIndex][0];
    todoList.splice(todoItemIndex, 1);
    console.log(`Deleted "${removed}"\n`);
    menu();
}

// Quit
function quit() {
    console.log(`See you soon! 😄`);
    interface.close();
}
