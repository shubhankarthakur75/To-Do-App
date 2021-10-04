
// add-new-list-

let addListButton = document.querySelector(".add-list-button");
let addListBackButton = document.querySelector("#add-list-back-button");
let addListAddButton = document.querySelector("#add-list-add-button");
let mainContainer = document.querySelector(".main-container");

let taskArray = [];
let addListTextBox = document.querySelector("#add-list-textbox")
addListAddButton.addEventListener("click", addList);



// add list function

function addList(e) {
    let taskTitle = addListTextBox.value;
    let taskObject = new Object();
    taskObject.id = Date.now();
    taskObject.title = taskTitle;
    taskObject.subtask = [];
    taskObject.completedTask = [];
    taskArray.push(taskObject);


    // conditon check for displaying empty text message
    function displayEmptyTextFunction() {
        if (taskArray.length > 0) {
            let emptyListTextContainer = document.getElementById("empty-list-text-container");
            emptyListTextContainer.style.display = "none";
        }
    }

    displayEmptyTextFunction();
    createListFunction(taskObject.id, taskObject.title)

}



// displayEmptyTextFunction

function displayEmptyTextFunction() {
    if (taskArray.length > 0) {
        let emptyListTextContainer = document.getElementById("empty-list-text-container");
        emptyListTextContainer.style.display = "none";
    }
}



//createListFunction() dynamically creating HTML Elements

function createListFunction(taskObjectId, taskObjectTitle) {
    // creating div
    let div = document.createElement("div");
    div.classList.add("tab");
    // creating ul
    let ul = document.createElement("ul");
    // Tab heading
    let tabHeading = document.createElement("li");
    tabHeading.classList.add("tab-heading");
    tabHeading.id = taskObjectId;
    let tabHeadingText = document.createTextNode(taskObjectTitle);
    tabHeading.appendChild(tabHeadingText);
    // hr
    let hr = document.createElement("hr");
    hr.className = "tab-hr";

    let deleteList = document.createElement("li");
    deleteList.className = "delete-list-button";
    deleteList.id = taskObjectId;
    let deleteListImage = document.createElement("img");
    deleteListImage.src = "./images/icons8-delete-45.png";
    deleteList.appendChild(deleteListImage);

    let tabDesc = document.createElement("ul");
    tabDesc.className = "tab-desc";
    tabDesc.id = taskObjectId;


    ul.appendChild(tabHeading);
    ul.appendChild(hr);
    ul.appendChild(tabDesc);
    ul.appendChild(deleteList);
    div.appendChild(ul);
    let mainContainer = document.querySelector(".main-container");
    mainContainer.appendChild(div);
}



// delete List
mainContainer.addEventListener("click", deleteListFunction);

function deleteListFunction(e) {
    if (e.target.parentElement.classList.contains("delete-list-button")) {
        // Deletes clicked list
        let deleteListId = e.target.parentElement.id;
        taskArray.forEach((item, index) => {
            if (item.id == deleteListId) {
                taskArray.splice(index, 1)
            }
        });


        // Removes all the lists and adds them again
        mainContainer.innerHTML = `<div id="empty-list-text-container">
                                    <h1 id="empty-list-text">No lists in the Task-List</h1>
                                 </div>`;
        displayEmptyTextFunction();
        taskArray.forEach((item) => {
            createListFunction(item.id, item.title);
        });


        // Displays sublist for every list
        taskArray.forEach(function (item) {
            let htmlCode = "";
            for (let i = 0; i < item.subtask.length; i++) {
                if (item.completedTask.indexOf(String(item.subtask[i].id)) == "-1") {
                    htmlCode += `<li class="isComplete" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
                }
                else {
                    htmlCode += `<li class="isComplete completed" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
                }
            }

            let tabDesc = document.querySelectorAll(".tab-desc");
            tabDesc.forEach((element) => {
                if (element.id == item.id) {
                    element.innerHTML = htmlCode;
                }
            });
        });


    }
}


// add new list pop-up starts

addListButton.addEventListener("click", newListToggle);
addListBackButton.addEventListener("click", newListToggle);
addListAddButton.addEventListener("click", newListToggle);

function newListToggle() {
    let blur = document.querySelector(".blur");
    blur.classList.toggle('active');
    let newListModalContainer = document.querySelector(".new-list-modal-container");
    newListModalContainer.classList.toggle('active');
}
// add new list pop-up ends



// task-show
mainContainer.addEventListener("click", taskShow);

function taskShow(e) {
    if (e.target.classList.contains("tab-heading")) {
        let taskId = e.target.id;
        let mainDiv = document.querySelector(".main-div");
        let taskDiv = document.querySelector(".task-div");
        mainDiv.style.display = "none";
        taskDiv.style.display = "block";

        let showTaskHeading = document.getElementById("show-task-heading");
        let taskHeading = document.querySelector(".task-main-box1");
        let addSubTaskButton = document.querySelector(".add-subtask-button");
        let taskMainBox = document.querySelector(".task-main-box");
        let subtaskList = document.querySelector(".subtask-list")


        taskArray.forEach(function (item) {
            if (item.id == taskId) {
                showTaskHeading.innerText = item.title;
                taskHeading.innerText = item.title;
                taskHeading.id = taskId;
                addSubTaskButton.id = taskId;
                taskMainBox.id = taskId;
                subtaskList.id = taskId
                displayItems(item);

            }
        });

        let taskBackButton = document.querySelector(".back-button");
        taskBackButton.addEventListener("click", () => {
            mainDiv.style.display = "block";
            taskDiv.style.display = "none";


            taskArray.forEach(function (item) {
                if (item.id == taskId) {
                    let htmlCode = "";
                    for (let i = 0; i < item.subtask.length; i++) {
                        if (item.completedTask.indexOf(String(item.subtask[i].id)) == "-1") {
                            htmlCode += `<li class="isComplete" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
                        }
                        else {
                            htmlCode += `<li class="isComplete completed" id="${item.subtask[i].id}">${item.subtask[i].subTaskItem}</li>`;
                        }
                    }

                    let tabDesc = document.querySelectorAll(".tab-desc");
                    tabDesc.forEach((element) => {
                        if (element.id == taskId) {
                            element.innerHTML = htmlCode;
                        }
                    })
                }
            });
        });

    }
}


//  add-Item
let newItemModalContainer = document.querySelector(".new-item-modal-container");
newItemModalContainer.addEventListener("click", addItemFunction);


function addItemFunction(e) {
    if (e.target.id == "add-item-add-button") {
        taskArray.forEach((item) => {
            if (newItemModalContainer.id == item.id) {
                let addItemTextbox = document.getElementById("add-item-textbox").value;
                subTaskObj = {};
                subTaskObj.id = Date.now();
                subTaskObj.subTaskItem = addItemTextbox;
                item.subtask.push(subTaskObj);
                displayItems(item);
            }

        })
    }
}


function displayItems(temp) {

    let htmlCode = "";
    for (let i = 0; i < temp.subtask.length; i++) {
        if (temp.completedTask.indexOf(String(temp.subtask[i].id)) == "-1") {
            htmlCode += `<li class="isComplete" id=${temp.subtask[i].id}>${temp.subtask[i].subTaskItem}</li>`;
        }
        else {
            htmlCode += `<li class="isComplete completed" id=${temp.subtask[i].id}>${temp.subtask[i].subTaskItem}</li>`;
        }
    }
    let ul = document.querySelector(".subtask-list").innerHTML = htmlCode;
}


mainContainer.addEventListener('click', strikeThroughFunction);
function strikeThroughFunction(e) {
    if (e.target.classList.contains("isComplete")) {
        let selectedItemId = e.target.id;
        let tabDescId = e.target.parentElement.id;
        taskArray.forEach((item) => {
            if (item.id == tabDescId) {
                if (item.completedTask.indexOf(String(selectedItemId)) == "-1") {
                    item.completedTask.push(selectedItemId);
                }
            }
        });

        e.target.classList.toggle("completed");
        if (e.target.classList.contains("completed")) {
        }
        else {
            taskArray.forEach((item) => {
                if (item.id == tabDescId) {
                    let index = item.completedTask.indexOf(String(selectedItemId));
                    console.log(index);
                    item.completedTask.splice(index, 1);
                }
            });
        }
    }
}




// Strike-through
let taskMainContainer = document.querySelector(".task-main-container");
taskMainContainer.addEventListener('click', strikeThroughFunction);
function strikeThroughFunction(e) {
    if (e.target.classList.contains("isComplete")) {
        let selectedItemId = e.target.id;
        let subtaskList = e.target.parentElement.id;
        taskArray.forEach((item) => {
            if (item.id == subtaskList) {
                if (item.completedTask.indexOf(String(selectedItemId)) == "-1") {
                    item.completedTask.push(selectedItemId);
                }
            }
        });

        e.target.classList.toggle("completed");
        if (e.target.classList.contains("completed")) {
        }
        else {
            taskArray.forEach((item) => {
                if (item.id == subtaskList) {
                    let index = item.completedTask.indexOf(String(selectedItemId));
                    item.completedTask.splice(index, 1);
                }
            });
        }
    }
}


//  toggle function
function newItemToggle(temp) {
    let blur = document.querySelectorAll(".blur");
    blur.forEach((item) => {
        if (item.parentElement.className == "task-div") {
            item.classList.toggle('active');
            let newItemModalContainer = document.querySelector(".new-item-modal-container");

            if (temp.className == "add-subtask-button") {
                newItemModalContainer.id = temp.id;
            }

            newItemModalContainer.classList.toggle('active');
        }
    });

}











