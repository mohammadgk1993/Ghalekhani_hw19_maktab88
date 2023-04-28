class Task {
    title: string;
    description: string;
    createdAt: Date;

    constructor(title: string, description: string) {
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
    }
}

class TodoList {
    private tasks: Task[];
    private localStorage: LocalStorageManager;

    constructor(localStorageKey: string) {
        this.tasks = [];
        this.localStorage = new LocalStorageManager(localStorageKey);

        const storedTasks = this.localStorage.data;
        if (storedTasks && Array.isArray(storedTasks)) {
            this.tasks = storedTasks.map(task => new Task(task.title, task.description));
        }
    }


    get alltasks(): Task[] {
        return this.tasks;
    }

    public deleteAllTask(): void {
        this.tasks = []
        this.localStorage.data = this.tasks
    }

    public getSingleTask(taskIndex:number) {
        return this.tasks[taskIndex]
    }

    public addTask(title: string, description: string): void {
        if (this.tasks.some(item => item.title == title)) {
            console.log("Choose another title, it's already exist!")
            return
        }

        const task = new Task(title, description);
        this.tasks.push(task);
        this.localStorage.data = this.tasks;
    }


    public removeTask(taskIndex: number): void {
        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1);
            this.localStorage.data = this.tasks;
        }
    }

    public updateTask(taskIndex: number, title: string, description: string): void {
        this.tasks[taskIndex].title = title
        this.tasks[taskIndex].description = description;
        this.localStorage.data = this.tasks;
    }
}

class LocalStorageManager {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get data(): any {
        const data = localStorage.getItem(this.key);
        return data ? JSON.parse(data) : null;
    }

    set data(value: any) {
        localStorage.setItem(this.key, JSON.stringify(value));
    }

    clear(): void {
        localStorage.removeItem(this.key);
    }
}

const todoList = new TodoList("todoList")


$(() => {
    tableRenderer()

    $("#add-task").on("submit", addTask)

    $('tr').on("click", taskInfo); 

    $("#update-task").on("submit", updateTask)

    $("#delete-task").on("submit", deleteTask)

    $("#search-button").on("click", search)

    $("#delete-all").on("click", deleteAllTasks)
})


function tableRenderer() {
    $("table thead").empty()
    $("table tbody").empty()

    $("table thead").append("<tr></tr>")
    for (let key of Object.keys(todoList.alltasks[0])) {
        $("table thead tr").append(`<th>${key}</th>`)
    }

    for (let item of todoList.alltasks) {
        $("table tbody").append("<tr></tr>")
        for (let val of Object.values(item)) {
            $("table tbody tr:last").append(`<td>${val}</td>`)
        }
        $("table tbody tr:last").attr("id",todoList.alltasks.indexOf(item))
        console.log(todoList.alltasks.indexOf(item))
    }
}

function addTask() {
    if ($("#task-title").val().toString().trim() != "" && $("#task-description").val().toString().trim() != "") {
        todoList.addTask($("#task-title").val().toString().trim(),
        $("#task-description").val().toString().trim())
        tableRenderer()
    }
}

function updateTask() {
    if ($("#update-task-title").val().toString().trim() != "" && $("#update-task-description").val().toString().trim() != "") {
        todoList.updateTask(
            Number($("#update-task-id").val()),
            $("#update-task-title").val().toString().trim(),
            $("#update-task-description").val().toString().trim())
        tableRenderer()
    }
}

function taskInfo() {
    const id = $(this).attr('id');
    const task = todoList.getSingleTask(Number(id))
    $("#update-task-id").val(id)
    $("#update-task-title").val(task.title)
    $("#update-task-description").val(task.description)
}

function deleteTask() {
    todoList.removeTask(Number($("#delete-task-id").val()))
    tableRenderer()
}

function search() {
    let searchedItems = []
    for (let task of todoList.alltasks) {
        if (task.title.includes($("#search-text").val().toString()) ||
        task.description.includes($("#search-text").val().toString())) {
            searchedItems.push(task)
        }
    }

    $("table thead").empty()
    $("table tbody").empty()

    $("table thead").append("<tr></tr>")
    for (let key of Object.keys(searchedItems[0])) {
        $("table thead tr").append(`<th>${key}</th>`)
    }

    for (let item of searchedItems) {
        $("table tbody").append("<tr></tr>")
        for (let val of Object.values(item)) {
            $("table tbody tr:last").append(`<td>${val}</td>`)
        }
    }
}

function deleteAllTasks() {
    todoList.deleteAllTask()
    tableRenderer()
}