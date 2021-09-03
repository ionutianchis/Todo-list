import {format} from "date-fns"

const containerDiv = document.querySelector('.containerDiv')
containerDiv.setAttribute('id', 'baseDiv')

const addToDoBtn = document.querySelector('#addToDoBtn')    
const addButton = document.querySelector('#submitToDo')            

let containerTitle = document.createElement('h1')
containerTitle.classList.add('pageTitle')
containerTitle.textContent = "Home"
containerDiv.insertBefore(containerTitle, formDiv)

let storedToDo = JSON.parse(localStorage.getItem("baseToDo's"))
let addBtnFunction 
let toDoDiv
let baseObjArr = []                     
let divArr = []


function addBtnFunctionality(btn) {             // add something to do btn event listener
    btn.addEventListener('click', () => {
        clearForm()                                     
        btn.disabled = true
        openForm('form')
    })
}

function addBtnsFunc(smthToDoBtn, submitToDoBtn, toDoParent, parentArr, toDoClass, objArr, key, cls) {    
    addBtnFunctionality(smthToDoBtn)                                          
    addFormBtn(submitToDoBtn, smthToDoBtn, toDoParent, parentArr, toDoClass, objArr, key, cls)
    cancelFormBtn(smthToDoBtn)
}

function addFormFunc(parentBtn, parentDiv, parentArr, toDoClass, objArr, key, cls) {              // submit to do form btn functionality
    parentBtn.disabled = false
    let newToDo = toDo(document.querySelector('#toDoTitle').value, format(document.querySelector('#toDoDate').valueAsDate,'dd/MM/yyyy'), "Not done", cls)
    newToDo.createToDoCard(parentDiv, parentArr, toDoClass, objArr, key)
    objArr.push(newToDo)
    closeForm('form')

    let obj
    for(obj of objArr){}            // saving todo's to localstorage
    saveToLocalStorage(key, obj)    
}

function saveToLocalStorage(key, value) {
    let todos = JSON.parse(localStorage.getItem(key))
    if (todos === null) {
        todos = []
    }
    todos.push(value)
    localStorage.setItem(key, JSON.stringify(todos));
} 


function showStoredTodos(parentDiv, parentArr, toDoClass, objArr) {
    if (!(storedToDo === null)) {
        for (let storedObj of storedToDo) {
            let restoredToDo = toDo(storedObj.title, storedObj.dueDate, storedObj.status)   
            restoredToDo.createToDoCard(parentDiv, parentArr, toDoClass, objArr)           // displaying stored todo's
            objArr.push(restoredToDo)
        }
    }
}

function addFormBtn(btn, parentBtn, parentDiv, parentArr, toDoClass, objArr, key, cls) {
    btn.addEventListener('click', addBtnFunction = function() {
        if(validateForm('form') !== false) {
            addFormFunc(parentBtn, parentDiv, parentArr, toDoClass, objArr, key, cls)
        }
    }, true)
}

function cancelFormBtn(parentBtn) {
    const cancelButton = document.querySelector('#cancelToDo')
    cancelButton.addEventListener('click', () => {                    // form cancel button
        parentBtn.disabled = false
        closeForm('form')
    })
}


function deleteElement(element) {         // helper function to remove (remove() itself does not work as intended)
    element.remove()
}

function createResetButton(buttonParent, status, obj, key) {                 // button to change to do status
    let resetStatusBtn = document.createElement('button')
    resetStatusBtn.classList.add('resetStatusBtn')
    buttonParent.appendChild(resetStatusBtn)
    obj.status
    resetStatusBtn.addEventListener('click' , () => {
        if (status == 'Not done') {                                 
            buttonParent.classList.toggle('doneToDo')
            status = 'Done'
            obj.status = 'Done'
        } else if (status == 'Done') {
            buttonParent.classList.toggle('doneToDo')
            status = 'Not done'
            obj.status = 'Not done'
        }

        /*let todos = JSON.parse(localStorage.getItem("baseToDo's"))
        console.log(todos)
        if (!(todos === null)) {
            for (let todo of todos) {
                if(todo.title == obj.title) {                       // changing the obj status inside localstorage COMING IN THE FUTURE
                    todo.status = obj.status
                }
            }
            localStorage.setItem("baseToDo's", JSON.stringify(todos)) 
        } */
    })
}


function createDeleteButton(buttonParent, elToDelete, parentDivArr, objArr, obj, key) {            // to do delete button
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('deleteToDoBtn')
    deleteButton.addEventListener('click', () => {
        deleteElement(elToDelete)                       // deleting the div
        for(let i=0; i<baseObjArr.length; i++) {
            if(objArr[i].title == elToDelete.firstChild.textContent) {             
                let objIndex = objArr.indexOf(objArr[i])            // deleting the obj from the obj arr
                objArr.splice(objIndex, 1)
            }
        }
        let index = parentDivArr.indexOf(elToDelete)    
        parentDivArr.splice(index, 1)                       // deleting the div from div arr

        /*let todos = JSON.parse(localStorage.getItem("baseToDo's"))
        for (let todo of todos) {
            if (todo.title == obj.title) {                      // deleting the div from localstorage COMING IN THE FUTURE
                let todoIndex = todos.indexOf(todo)    
                todos.splice(todoIndex, 1)    
            }
        }
        localStorage.setItem("baseToDo's", JSON.stringify(todos)) */
        
    })
    buttonParent.appendChild(deleteButton)
}


function createTheDoDiv(objTitle, dueDate, toDoParent, parentArr, toDoClass) {                 // creating the to do object div
    toDoDiv = document.createElement('div')
    toDoDiv.classList.add("toDoDiv")
    toDoDiv.classList.add(toDoClass)
    toDoParent.appendChild(toDoDiv)
    parentArr.push(toDoDiv)
    
    let toDoH1 = document.createElement('h1')                   // to do title
    toDoH1.textContent = objTitle
    toDoDiv.appendChild(toDoH1)

    let dateP = document.createElement('p')
    dateP.textContent = dueDate                             // to do due date
    dateP.classList.add('date')
    toDoDiv.appendChild(dateP)

}

function toDo(title, dueDate, status, cls) {            // to do objects
    return {
        title: title,
        dueDate: dueDate,
        status: status,
        cls: cls,
        createToDoCard(toDoParent, parentArr, toDoClass, objArr, key) {
            createTheDoDiv(title, dueDate, toDoParent, parentArr, toDoClass)        // creating to do div for each object

            createResetButton(toDoDiv, status, this, key)      // to do div btns

            if(this.status == 'Done') {
                toDoDiv.classList.toggle('doneToDo')
            }
            createDeleteButton(toDoDiv, toDoDiv, parentArr, objArr, this)
        }
    }
}


function openForm(form) {
    document.getElementById(form).style.display = "";
  }

function closeForm(form) {
    document.getElementById(form).style.display = "none";
} 

function clearForm (){
    document.forms["form"]["title"].value = '';
    document.forms["form"]["date"].valueAsDate = new Date();
}

function validateForm(form) {
    let x = document.forms[form]["title"].value;
    if (x == "") {
      alert("Title must be filled out");
      return false;
    }
}

let projectArea = containerDiv.cloneNode(true)          // projects page

const homePage = (() => {
    addBtnsFunc(addToDoBtn, addButton, containerDiv, divArr, 'baseToDo', baseObjArr, "baseToDo's")
    closeForm('form')
    closeForm('projectForm')
    showStoredTodos(containerDiv, divArr, 'baseToDo', baseObjArr)
    homeBtn.classList.add('active')
})()


export {
    toDo,
    addFormFunc,
    addBtnFunction,
    addFormBtn,
    containerTitle,
    containerDiv,
    baseObjArr,
    divArr,
    openForm,
    closeForm,
    validateForm,
    homePage,
    saveToLocalStorage,
    addBtnsFunc,
    projectArea
}