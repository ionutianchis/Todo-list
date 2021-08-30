import {homePage, divArr, containerTitle, openForm} from "./home";
import {todayPage} from "./today";
import {weekPage} from "./week"
import {projects, projectArea, addProjectFuncOnce} from "./projects"

const baseDiv = document.querySelector('#baseDiv')
const homeBtn = document.querySelector('#homeBtn')
const todayBtn = document.querySelector('#todayBtn')
const weekBtn = document.querySelector('#weekBtn')
const projectsBtn = document.querySelector('#addProjectBtn')

homeBtn.disabled = true

homeBtn.addEventListener('click', () => {      
    containerTitle.textContent = "Home"
    if (main.contains(projectArea)) {           // page switching logic
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce = false
    }
    todayBtn.disabled = false
    homeBtn.disabled = true
    weekBtn.disabled = false
    for (let i=0; i<divArr.length; i++) {       // display all to do's
        divArr[i].style.display = ''
    }
})

todayBtn.addEventListener('click', () => {
    if (main.contains(projectArea)) {
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce = false
    }
    homeBtn.disabled = false
    todayBtn.disabled = true
    weekBtn.disabled = false
    todayPage()
})


weekBtn.addEventListener('click', () => {
    if (main.contains(projectArea)) {
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce = false
    }
    weekBtn.disabled = true
    todayBtn.disabled = false
    homeBtn.disabled = false
    weekPage()
})


projectsBtn.addEventListener('click', () => {       // open add project form
    openForm('projectForm')
})