var Task = /** @class */ (function () {
    function Task(title, description) {
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
    }
    return Task;
}());
var TodoList = /** @class */ (function () {
    function TodoList(localStorageKey) {
        this.tasks = [];
        this.localStorage = new LocalStorageManager(localStorageKey);
        var storedTasks = this.localStorage.data;
        if (storedTasks && Array.isArray(storedTasks)) {
            this.tasks = storedTasks.map(function (task) { return new Task(task.title, task.description); });
        }
    }
    Object.defineProperty(TodoList.prototype, "alltasks", {
        get: function () {
            return this.tasks;
        },
        enumerable: false,
        configurable: true
    });
    TodoList.prototype.deleteAllTask = function () {
        this.localStorage.clear();
    };
    TodoList.prototype.getSingleTask = function (taskIndex) {
        return this.tasks[taskIndex];
    };
    TodoList.prototype.addTask = function (title, description) {
        if (this.tasks.some(function (item) { return item.title == title; })) {
            console.log("Choose another title, it's already exist!");
            return;
        }
        var task = new Task(title, description);
        this.tasks.push(task);
        this.localStorage.data = this.tasks;
    };
    TodoList.prototype.removeTask = function (taskIndex) {
        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1);
            this.localStorage.data = this.tasks;
        }
    };
    TodoList.prototype.updateTask = function (taskIndex, title, description) {
        this.tasks[taskIndex].title = title;
        this.tasks[taskIndex].description = description;
        this.localStorage.data = this.tasks;
    };
    return TodoList;
}());
var LocalStorageManager = /** @class */ (function () {
    function LocalStorageManager(key) {
        this.key = key;
    }
    Object.defineProperty(LocalStorageManager.prototype, "data", {
        get: function () {
            var data = localStorage.getItem(this.key);
            return data ? JSON.parse(data) : null;
        },
        set: function (value) {
            localStorage.setItem(this.key, JSON.stringify(value));
        },
        enumerable: false,
        configurable: true
    });
    LocalStorageManager.prototype.clear = function () {
        localStorage.removeItem(this.key);
    };
    return LocalStorageManager;
}());
var todoList = new TodoList("todoList");
$(function () {
    tableRenderer();
    $("#add-task").on("submit", addTask);
    $('tr').on("click", taskInfo);
    $("#update-task").on("submit", updateTask);
});
function tableRenderer() {
    $("table thead").empty();
    $("table tbody").empty();
    $("table thead").append("<tr></tr>");
    for (var _i = 0, _a = Object.keys(todoList.alltasks[0]); _i < _a.length; _i++) {
        var key = _a[_i];
        $("table thead tr").append("<th>".concat(key, "</th>"));
    }
    for (var _b = 0, _c = todoList.alltasks; _b < _c.length; _b++) {
        var item = _c[_b];
        $("table tbody").append("<tr></tr>");
        for (var _d = 0, _e = Object.values(item); _d < _e.length; _d++) {
            var val = _e[_d];
            $("table tbody tr:last").append("<td>".concat(val, "</td>"));
        }
        $("table tbody tr:last").attr("id", todoList.alltasks.indexOf(item));
        console.log(todoList.alltasks.indexOf(item));
    }
}
function addTask() {
    if ($("#task-title").val().toString().trim() != "" && $("#task-description").val().toString().trim() != "") {
        todoList.addTask($("#task-title").val().toString().trim(), $("#task-description").val().toString().trim());
        tableRenderer();
    }
}
function updateTask() {
    if ($("#update-task-title").val().toString().trim() != "" && $("#update-task-description").val().toString().trim() != "") {
        todoList.updateTask(Number($("#update-task-id").val()), $("#update-task-title").val().toString().trim(), $("#update-task-description").val().toString().trim());
        tableRenderer();
    }
}
function taskInfo() {
    var id = $(this).attr('id');
    var task = todoList.getSingleTask(Number(id));
    $("#update-task-id").val(id);
    $("#update-task-title").val(task.title);
    $("#update-task-description").val(task.description);
}
