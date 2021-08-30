import {format, parseISO} from "date-fns"
import {} from './today'

const containerDiv = document.querySelector('.containerDiv')
containerDiv.setAttribute('id', 'baseDiv')
document.querySelector('#toDoDate').valueAsDate = new Date();

const addToDoBtn = document.querySelector('#addToDoBtn')    
const addButton = document.querySelector('#submitToDo')     // submit to do form btn              

let containerTitle = document.createElement('h1')
containerTitle.classList.add('pageTitle')
containerTitle.textContent = "Home"
containerDiv.insertBefore(containerTitle, formDiv)

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

function addSmthToDoFunctionality(smthToDoBtn, submitToDoBtn, toDoParent, parentArr, toDoClass, objArr) {    
    addBtnFunctionality(smthToDoBtn)                                          
    addFormBtn(submitToDoBtn, smthToDoBtn, toDoParent, parentArr, toDoClass, objArr)
    cancelFormBtn(smthToDoBtn)
}

function addFormFunc(parentBtn, parentDiv, parentArr, toDoClass, objArr) {              // submit to do form btn functionality
    parentBtn.disabled = false
    let newToDo = toDo(document.querySelector('#toDoTitle').value, document.querySelector('#toDoDate').valueAsDate, "Not done")
    newToDo.createToDoCard(parentDiv, parentArr, toDoClass)
    objArr.push(newToDo)
    closeForm('form')
}


function addFormBtn(btn, parentBtn, parentDiv, parentArr, toDoClass, objArr) {
    btn.addEventListener('click', addBtnFunction =function() {addFormFunc(parentBtn, parentDiv, parentArr, toDoClass, objArr)}, true)  
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

function createResetButton(buttonParent, status) {                 // button to change to do status
    let resetStatusBtn = document.createElement('button')
    resetStatusBtn.textContent = status
    resetStatusBtn.classList.add('resetStatusBtn')
    buttonParent.appendChild(resetStatusBtn)
    resetStatusBtn.addEventListener('click' , () => {
        if (status == 'Not done') {                                 
            buttonParent.classList.toggle('doneToDo')
            status = 'Done'
        } else if (status == 'Done') {
            buttonParent.classList.toggle('doneToDo')
            status = 'Not done'
        }
    })
}

function createDeleteButton(buttonParent, elToDelete) {            // to do delete button
    let deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', () => {
        deleteElement(elToDelete)
    })
    buttonParent.appendChild(deleteButton)
}


function createTheDoDiv(objTitle, objDueDate, toDoParent, parentArr, toDoClass) {                 // creating the to do object div
    toDoDiv = document.createElement('div')
    toDoDiv.classList.add("toDoDiv")
    toDoDiv.classList.add(toDoClass)
    toDoParent.appendChild(toDoDiv)
    parentArr.push(toDoDiv)
    
    let toDoH1 = document.createElement('h1')                   // to do title
    toDoH1.textContent = objTitle
    toDoDiv.appendChild(toDoH1)

    let dateP = document.createElement('p')
    let newDate = parseISO(document.querySelector('#toDoDate').value)
    let date = format(newDate, "dd/MM/yyyy")
    objDueDate = date                                               // to do due date
    dateP.textContent = date
    dateP.classList.add('date')
    toDoDiv.appendChild(dateP)

}

function toDo(title, dueDate, status) {            // to do objects
    return {
        title: title,
        dueDate: dueDate,
        status: status,
        createToDoCard(toDoParent, parentArr, toDoClass) {
            createTheDoDiv(title, dueDate, toDoParent, parentArr, toDoClass)        // creating to do div for each object

            createResetButton(toDoDiv, status)      // to do div btns

            createDeleteButton(toDoDiv, toDoDiv)
        
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

let projectArea = containerDiv.cloneNode(true)          // projects page

const homePage = (() => {
    closeForm('form')
    closeForm('projectForm')
    const starterToDo = toDo('Wash the dishes', document.querySelector('#toDoDate').valueAsDate, 'Not done')
    starterToDo.createToDoCard(containerDiv, divArr, 'baseToDo')                    
    baseObjArr.push(starterToDo)
    addSmthToDoFunctionality(addToDoBtn, addButton, containerDiv, divArr, 'baseToDo', baseObjArr)
})()

export {
    addFormFunc,
    addBtnFunction,
    addFormBtn,
    containerTitle,
    containerDiv,
    baseObjArr,
    divArr,
    openForm,
    closeForm,
    homePage,
    addSmthToDoFunctionality,
    projectArea
}