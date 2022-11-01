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
    <td class="d-block m-auto">
    <button onclick="deleteHandler(${item.id})" class="btn btn-danger">Delete</button>
    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#adduser-${item.id}">Edit</button>
    <div class="modal fade" id="adduser-${item.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="shadow-lg form-group p-4 rounded-4 mx-auto">
          <label class="form-label d-block float-start" for="username">Enter Your Email</label>
          <input value=${item.username} class="form-control" id="username-change-${item.id}" type="email" placeholder="example@gmail.com">
          <div id="error-msg-change" class="text-danger text-capitalize float-start"></div>
            <button onclick="editHandler(${item.id})" class="btn btn-success d-block ms-auto mt-4">Change</button>
          </div>
        </div>
      
      </div>
    </div>
  </div>
    </td>
    </tr>
  `
  })
  $("#table-data").html(table);
})


// POST

$("#form").submit(e => {
  e.preventDefault();

  const options = {
    username: $("#username").val(),
    password: $("#password").val()
  }

  $.post(BASE_URL, options, (response) => location.reload()).fail((err) => ErrMsg.text(err?.responseJSON?.message))
})

// PUT

const editHandler = (id) => {
  console.log("id:", id)
  $.ajax({
    url: BASE_URL + "/" + id,
    type: 'PUT',
    data: { username: $("#username-change" + "-" + id).val() }
  })
    .done((res) => {
      location.reload()
    })
    .fail((err) => {
      $("#error-msg-change").text(err?.responseJSON?.message)
    })
}



// DELETE

const deleteHandler = (id) => {
  $.ajax({
    url: BASE_URL + "/" + id,
    type: 'DELETE',
    success: (result) => {
      location.reload();
    }
  });
}