const urlApi = "http://localhost:3000/users";

class user {
    constructor(username, password, name, email) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}

const button_confirm = document.querySelector(".confirm");
const text_users = [...document.querySelectorAll("[name]")];

button_confirm.addEventListener("click", (e) => {
    e.preventDefault();
    const data = text_users.map((text_user) => {
        if (text_user.value === "") {
            text_user.classList.add("text_input_error");
        }
        text_user.addEventListener("click", () => {
            text_user.classList.remove("text_input_error");
        });
        return text_user.value;
    });
    const check = document.querySelector(".text_input_error");
    if (check) {
        return;
    } else {
        data.shift();
        var newdata = new user(data[0], data[1], data[2], data[3]);
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newdata),
        };
        fetch(urlApi, options).then((response) => response.json());
    }
});

const table_user = document.querySelector(".table_users tbody");

function render(data) {
    const render_data = data.map((user) => {
        return `     
        <tr class="user_id_${user.id} ">
            <td>
                <input type="text" disabled value="${user.username}" />
            </td>
            <td>
                <input type="text" disabled value="${user.password}" />
            </td>
            <td>
                <input type="text" disabled value="${user.name}" />
            </td>
            <td>
                <input type="text" disabled value="${user.email}" />
            </td>
            <td>
                <button onclick="change_user(${user.id})" class="buttonUpdate">Update</button>
                <button onclick="delete_user(${user.id})" class="buttonDelete">Delete</button>
            </td>
         </tr>`;
    });
    table_user.innerHTML += render_data.join("");
}

function change_user(id) {
    const item_user = document.querySelector(`.user_id_${id}`);
    const item_user_inputs = document.querySelectorAll(`.user_id_${id} input`);
    if (item_user) {
        item_user.classList.add("update_active");
    }
    item_user_inputs.forEach((item_user_input) => {
        item_user_input.removeAttribute("disabled");
    });
    const button_update = document.querySelector(".buttonUpdate");

    button_update.removeAttribute("onclick");
    button_update.setAttribute("onclick", `update_user(${id})`);
}

function update_user(id) {
    const item_user = document.querySelector(`.user_id_${id}`);
    const item_user_inputs = [
        ...document.querySelectorAll(`.user_id_${id} input`),
    ];
    if (item_user) {
        item_user.classList.remove("update_active");
    }

    const button_update = document.querySelector(".buttonUpdate");

    button_update.removeAttribute("onclick");
    button_update.setAttribute("onclick", `change_user(${id})`);

    const data = item_user_inputs.map((item_user_input) => {
        item_user_input.setAttribute("disabled", null);
        return item_user_input.value;
    });
    const newdata = new user(...data);
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newdata),
    };
    fetch(urlApi + `/` + id, options).then((response) => response.json());
}

function delete_user(id) {
    const options = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    };
    fetch(urlApi + `/` + id, options)
        .then((response) => response.json())
        .then(() => {
            const item_user = document.querySelector(".user_id_" + id);
            if (item_user) {
                item_user.remove();
            }
        });
}

function start() {
    get_user();
}

function get_user() {
    fetch(urlApi).then((response) =>
        response.json().then((data) => render(data))
    );
}
start();