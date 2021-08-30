import {addSmthToDoFunctionality, closeForm, projectArea, addBtnFunction, openForm, addFormFunc} from "./home"


let addProjectFuncOnce = true


const projects = (() => {                    
    function createProjectBtns() {                          // project's button
        projectAddBtn.addEventListener('click', () => {
            let newProjectBtn = document.createElement('button')
            newProjectBtn.classList.add('newProjectBtn')
            newProjectBtn.textContent = projectTitle.value

            navBar.insertBefore(newProjectBtn, addProjectBtn)
            closeForm('projectForm')
            document.forms["projectForm"]["projectTitle"].value = '';
        })

        projectCancelBtn.addEventListener('click', () => {
            closeForm('projectForm')
            document.forms["projectForm"]["projectTitle"].value = '';
        })
    }
    
    createProjectBtns()

    projectArea.querySelector('#form').style.display = 'none'


    let projectDivArr = []
    let projectObjArr = []

    let addProjectBtnFunction

    
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('newProjectBtn')) {
            const submitToDoBtn = projectArea.querySelector('#submitToDo')
            const addToDoBtn = projectArea.querySelector('#addToDoBtn')

            addToDoBtn.addEventListener('click', () => {projectArea.querySelector('#form').style.display = ''})
            
            let projectTitle = projectArea.querySelector('.pageTitle')  

            projectTitle.textContent = e.target.textContent             // changing page title based on the project selected

            let baseDiv = document.querySelector('#baseDiv')

            homeBtn.disabled = false
            todayBtn.disabled = false
            weekBtn.disabled = false
            
            if (!(e.target.classList.contains('active')) && !(main.contains(baseDiv))) {     // switching between projects
                submitToDoBtn.removeEventListener('click', addProjectBtnFunction, true)  // removing event listener added below so it doesn't add event listener's forever

                submitToDoBtn.removeEventListener('click', addBtnFunction, true)  // removing submit to do's base add event listener

                // changing submit to do's event listener so it adds the correct class based on the current page
                submitToDoBtn.addEventListener('click', addProjectBtnFunction = function() {addFormFunc(addToDoBtn, projectArea, projectDivArr, e.target.textContent, projectObjArr)}, true)  
                
               for (let projectDiv of projectDivArr) {
                    if (!(projectDiv.classList.contains(projectTitle.textContent))) {
                        projectDiv.style.display = 'none'                                           // hiding to do divs not from current project
                    } else if (projectDiv.classList.contains(projectTitle.textContent)) {
                        projectDiv.style.display = ''
                    }
                } 

            }

            if (main.contains(baseDiv)) {
                main.removeChild(baseDiv)                   // switching from home/today/week
                main.appendChild(projectArea)

                projectArea.setAttribute('id', 'projectArea')

                if (addProjectFuncOnce == true) {
                    addSmthToDoFunctionality(addToDoBtn, submitToDoBtn, projectArea, projectDivArr, e.target.textContent, projectObjArr)
                }
            }
            
            // project buttons active status
            e.target.classList.add('active')

            let nextBtn = e.target.nextElementSibling
            let previousBtn = e.target.previousElementSibling

            while(nextBtn) {
                if(nextBtn.classList.contains('active')) {
                    nextBtn.classList.remove('active')
                }
                nextBtn = nextBtn.nextElementSibling
            }

            while(previousBtn) {
                if(!(previousBtn.classList == undefined) && previousBtn.classList.contains('active')) {
                    previousBtn.classList.remove('active')
                }
                previousBtn = previousBtn.previousElementSibling
            } 
        }
    })
})()

export {
    projects,
    projectArea,
    addProjectFuncOnce,
}