const list_todo = [];
const todo_form = document.querySelector(".listTodo");
const todo_item = document.getElementById("todo");
const btn = document.querySelector(".btn");

todo_item.addEventListener("keydown", () => {
    btn.removeAttribute("disabled");
});

function add_todo() {
    const item_todo = {
        item_name: "",
        check_todo: "",
    };
    item_todo.item_name = todo_item.value;
    list_todo.unshift(item_todo);
    render();
    todo_item.value = "";
    btn.setAttribute("disabled", null);
}

function reset_todo() {
    const todo_form_items = document.querySelectorAll(".todo_form_item");
    todo_form_items.forEach((form_item) => {
        todo_form.removeChild(form_item);
    });
}

function check_todo() {
    render();
}

function delete_todo(index) {
    list_todo.splice(index, 1);
    render();
}

function render() {
    reset_todo();
    for (let i = 0; i < list_todo.length; i++) {
        todo_form.innerHTML += `<div id="form" class="todo_form_item ${list_todo[i].check_todo}">
    <div class="todo_items">${list_todo[i].item_name}</div>
                <div class="icon">
                    <div  class="todo_icon_check">
                        <i class="ti-check"></i>
                    </div>
                    <div  class="todo_icon_delete">
                        <i class="ti-close"></i>
                    </div>
                </div>
                </div>`;
    }
    const button_delete = [...document.querySelectorAll(".todo_icon_delete")];
    for (let i = 0; i < button_delete.length; i++) {
        button_delete[i].addEventListener("click", () => {
            delete_todo(i, 1);
        });
    }
    console.log(list_todo);
    const button_check = [...document.querySelectorAll(".todo_icon_check")];
    for (let i = 0; i < button_check.length; i++) {
        button_check[i].addEventListener("click", () => {
            if (list_todo[i].check_todo == "done") {
                list_todo[i].check_todo = "";
            } else {
                list_todo[i].check_todo = "done";
            }
            check_todo();
        });
    }
}