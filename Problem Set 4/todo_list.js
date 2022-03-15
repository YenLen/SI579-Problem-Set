const taskDescription = document.getElementById("task_description_input");
const dateInputElement = document.getElementById("duedate_input");
const timeInputElement = document.getElementById("duetime_input");

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
  const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
  const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

  if (dueDate && dueTime) {
    // The user specified both a due date & due time
    //Add the timezone offset to account for the fact that timestamps are specified by UTC
    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    return dueDate + dueTime + timezoneOffset;
  } else {
    // if the user did not specify both a due date and due time, return false
    return false;
  }
}
function ClearFields() {
  document.getElementById("task_description_input").value = "";
  document.getElementById("duedate_input").value = "";
  document.getElementById("duetime_input").value = "";
}

idCount = 0;
function addTask(taskDescription) {
  const time = dateAndTimeToTimestamp(dateInputElement, timeInputElement);
  const timetext = new Date(time);
  const tasktext = document.getElementById("task_description_input").value;
  const previousLi = document.getElementById("task_list");
  const id = idCount++;
  previousLi.innerHTML += `<li id=\"list${id}\"> ${tasktext} <span class = \" due\"> ${timetext} </span><button class=\"btn btn-sm btn-outline-danger done\" type=\"button\" onclick=\"remove('list${id}')\">Done</button>`;
}

function remove(id) {
  // console.log("ID: " + id);
  document.getElementById(id).remove();
}

const addtaskbtn = document.getElementById("add_task");
addtaskbtn.addEventListener("click", function () {
  // console.log(document.getElementById("task_description_input").value);
  addTask(taskDescription);
  ClearFields();
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode === 13) {
    addTask(taskDescription);
    ClearFields();
  }
});



// taskList.addEventListener('click', (event) => {
//   // This will fire when clicking ANYWHERE in the list, but if the
//   // click happens to be on a 'done' button, we remove the list item
//   // it belongs to.
//   if (event.target.classList.contains('done')) {
//       event.target.parentElement.remove();
//   }
// });
