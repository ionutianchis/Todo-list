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
    let btnArr = [...document.querySelectorAll('.navButton')]
    for(let btn of btnArr) {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
            btn.disabled = false
        }
    }
    homeBtn.classList.add('active')     
    containerTitle.textContent = "Home"
    if (main.contains(projectArea)) {           // page switching logic
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce.once = false
    }
    for (let i=0; i<divArr.length; i++) {       // display all to do's
        divArr[i].style.display = ''
    }

})

todayBtn.addEventListener('click', () => {
    if (main.contains(projectArea)) {
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce.once = false
    }
    todayPage()
    let btnArr = [...document.querySelectorAll('.navButton')]
    for(let btn of btnArr) {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
            btn.disabled = false
        }
    }
    todayBtn.classList.add('active')     
})


weekBtn.addEventListener('click', () => {
    if (main.contains(projectArea)) {
        main.appendChild(baseDiv)
        main.removeChild(projectArea)
        addProjectFuncOnce.once = false
    }
    weekBtn.disabled = true
    todayBtn.disabled = false
    homeBtn.disabled = false
    weekPage()
    let btnArr = [...document.querySelectorAll('.navButton')]
    for(let btn of btnArr) {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
            btn.disabled = false
        }
    }
    weekBtn.classList.add('active')     
})


projectsBtn.addEventListener('click', () => {       // open add project form
    openForm('projectForm')
})