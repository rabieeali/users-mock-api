const BASE_URL = "http://localhost:3500/api/users";
const ErrMsg = $("#error-msg");
const ErrMsgChange = $("#error-msg-change");

// GET

$.get(BASE_URL, (users) => {
  let table = "";
  users.map((item) => {
    table += `
    <tr class="text-center">
      <td>${item.id}</td>
      <td>${item.username}</td>
    <td class="d-block m-auto p-3">
    <div class="d-flex flex-wrap justify-content-evenly gap-2">
    <i class="fa fa-trash text-danger cursor-pointer" onclick="deleteHandler(${item.id})"></i>
    <i class="fa fa-edit text-info cursor-pointer" data-bs-toggle="modal" data-bs-target="#adduser-${item.id}"></i>
    <i onclick="navigate(${item.id})" class="fa fa-info text-white cursor-pointer" id="#user-${item.id}"></i>
    </div>
    <div class="modal fade" id="adduser-${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="shadow-lg form-group p-4 rounded-4 mx-auto">
          <label class="form-label d-block float-start" for="username">Enter Your New Email</label>
          <input value=${item.username} class="form-control" id="username-change-${item.id}" type="email" placeholder="example@gmail.com">
          <div id="error-msg-change" class="text-danger text-capitalize float-start"></div>
            <button onclick="usernameEditHandler(${item.id})" class="btn btn-success d-block ms-auto mt-4">Change</button>
          </div>
        </div>
      
      </div>
    </div>
  </div>
    </td>
    </tr>
  `;
  });
  $("#table-data").html(table);
});

// POST

$("#form").submit((e) => {
  e.preventDefault();

  const options = {
    username: $("#username").val(),
    password: $("#password").val(),
  };

  $.post(BASE_URL, options, (response) => location.reload()).fail((err) =>
    ErrMsg.text(err?.responseJSON?.message)
  );
});

// PUT

const usernameEditHandler = (id) => {
  $.ajax({
    url: BASE_URL + "/" + id,
    type: "PUT",
    data: { username: $("#username-change" + "-" + id).val() },
  })
    .done((res) => {
      location.reload();
    })
    .fail((err) => {
      $("#error-msg-change").text(err?.responseJSON?.message);
    });
};
const passwordEditHandler = (id) => {
  $.ajax({
    url: BASE_URL + "/" + id,
    type: "PUT",
    data: { password: $("#password-change" + "-" + id).val() },
  })
    .done((res) => {
      location.reload();
    })
    .fail((err) => {
      $("#error-msg-change").text(err?.responseJSON?.message);
    });
};

// DELETE

const deleteHandler = (id) => {
  $.ajax({
    url: BASE_URL + "/" + id,
    type: "DELETE",
    success: (result) => {
      location.reload();
    },
  });
};

// navigation

const navigate = (id) => {
  localStorage.setItem("idOfNewPage", id);
  window.location.replace("./singleUser.html");
};

const goBack = () => {
  localStorage.removeItem("idOfNewPage");
  window.location.replace("./index.html");
};

if (location.href === "http://127.0.0.1:5500/frontend/singleUser.html") {
  const id = localStorage.getItem("idOfNewPage");

  const passwordSecurityHandler = (string) => {
    let array = [...string];
    let result = array.map(elem => (elem = "*"));
    return result.join("");
  };

  $.get(BASE_URL + "/" + id, (user) => {
    let card = "";
    card = `
<div class="card shadow-lg p-2 border-0 rounded-3">
<div class="card-body">
  <h5 id="card-id" class="card-title">User ID : ${user.id}</h5>
  <h5 id="card-username" class="card-title">Useranme : ${user.username}</h5>
  <h5 id="card-password" class="card-title">Password : ${passwordSecurityHandler(
    user.password
  )}</h5>
  <div class="d-flex justify-content-end gap-2">
  <button class="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#editPassword-${
    user.id
  }">Change Password</button>
  <a onclick="goBack()" class="btn btn-primary float-end">Go Back</a>
  </div>
  <div class="modal fade" id="editPassword-${
    user.id
  }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="shadow-lg form-group p-4 rounded-4 mx-auto">
        <label class="form-label d-block float-start" for="username">Enter Your New Password</label>
        <input value=${
          user.password
        } class="form-control" id="password-change-${
      user.id
    }" type="text">
        <div id="error-msg-change" class="text-danger text-capitalize float-start"></div>
          <button onclick="passwordEditHandler(${
            user.id
          })" class="btn btn-success d-block ms-auto mt-4">Change</button>
        </div>
      </div>
      </div>
    
    </div>
  </div>
</div>
</div>
</div>
`;
    $("#singleCard").html(card);
  });
}
