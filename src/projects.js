import {addBtnsFunc, closeForm, projectArea, addBtnFunction, addFormFunc, validateForm, saveToLocalStorage, toDo} from "./home"
import { v4 as uuid_v4 } from 'uuid'


let addProjectFuncOnce = {
    once: true
}


const projects = (() => {
    
    const projectsArr = []
    let projectBtnArr = []
    const projectStoredToDo = JSON.parse(localStorage.getItem('projectsToDo'))
        
    function deleteProject(deleteBtn, projectButton, obj, parentDiv) {
        deleteBtn.addEventListener('click', () => {
            // deleting the projectbtn from array
            for (let projectBtn of projectBtnArr) {
                if (projectBtn.textContent === projectButton.textContent) {
                    let index = projectBtnArr.indexOf(projectBtn)
                    projectBtnArr.splice(index, 1)
                    parentDiv.remove()
				}
			}
            // deleting projects from localstorage
            let projects = JSON.parse(localStorage.getItem('projects'))
            for (let project of projects) {
                if (project.id === obj.id) {
					let projectIndex = projects.indexOf(project)
					projects.splice(projectIndex, 1)
				}
            }
            localStorage.setItem('projects', JSON.stringify(projects))
    
            // deleting project's to do's from localstorage
            let projectToDoArr = JSON.parse(
                localStorage.getItem('projectsToDo')
            )
            
            if (projectToDoArr) {
                function remove() {
                    let i = 0
                    while (i < projectToDoArr.length) {
                        if (
                            projectToDoArr[i].cls ===
                            btnToDelete.textContent
                        ) {
                            projectToDoArr.splice(i, 1)
                        } else {
                            ++i
                        }
                    }
                    return projectToDoArr
                }
                remove()
            }
        }) 
	}

    function project (title, id) {
        return {
			title: title,
			id: id || uuid_v4(),

			createProjectBtn(class1, class2) {
				// creating the project btn
				let div = document.createElement('div')
				div.classList.add('projectBtnDiv')
				let newProjectBtn = document.createElement('button')
				newProjectBtn.classList.add(class1)
				newProjectBtn.classList.add(class2)
				newProjectBtn.textContent = title

				projectBtnArr.push(newProjectBtn)
				div.appendChild(newProjectBtn)

				navBar.insertBefore(div, addProjectBtn)

				// delete project btn
				const deleteProjectBtn = document.createElement('button')
				deleteProjectBtn.classList.add('deleteProjectBtn')
				div.appendChild(deleteProjectBtn)

				deleteProject(deleteProjectBtn, newProjectBtn, this, div)
			},
		}
    }

    
    function createProjectBtns() {                          // project's button
        projectAddBtn.addEventListener('click', () => {
            if (validateForm('projectForm') === true) {
                const newProject = new project(projectTitle.value)

				newProject.createProjectBtn(
					'newProjectBtn',
					'navButton'
				)

                projectsArr.push(newProject)
                
                saveToLocalStorage('projects', newProject)
                
				closeForm('projectForm')
				document.forms['projectForm']['projectTitle'].value = ''
			}
        })

        projectCancelBtn.addEventListener('click', () => {
            closeForm('projectForm')
            document.forms["projectForm"]["projectTitle"].value = '';
        })
    }

    createProjectBtns()

    if (localStorage.getItem('projects')) {
        const storedProjects = JSON.parse(localStorage.getItem('projects'))
        for (let storedProject of storedProjects) {
            const newProject = new project(storedProject.title, storedProject.id)
            newProject.createProjectBtn('newProjectBtn', 'navButton')
            projectsArr.push(storedProject)
		}
    }

    
    let projectForm = projectArea.querySelector('#form')
    projectForm.style.display = 'none'

    let projectDivArr = []
    let projectObjArr = []

    let addProjectBtnFunction
    
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('newProjectBtn')) {

            function showProjects() {           // displaying stored project todo's

                if (localStorage.getItem('projectsToDo')) {
                    let storedProjects = JSON.parse(localStorage.getItem('projectsToDo'))
                    for (let project of storedProjects) {
                        if (project.cls === e.target.textContent) {
                            let restoredToDo = toDo(project.title, project.dueDate, project.status, project.cls, project.id)
                            if (!(projectObjArr.some(projectObj => projectObj.id === restoredToDo.id))) {
                                restoredToDo.createToDoCard(
									projectArea,
									projectDivArr,
									e.target.textContent,
									projectObjArr,
									'projectsToDo',
                                    e.target.textContent,
                                    storedProjects
                                )
                                projectObjArr.push(restoredToDo)
                            }
                        }
                    }
                }
            }
            
            
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
                submitToDoBtn.addEventListener('click', addProjectBtnFunction = function() {
                    if (validateForm('form') !== false) {
                        addFormFunc(addToDoBtn, projectArea, projectDivArr, e.target.textContent, projectObjArr, 'projectsToDo', e.target.textContent, )
                    }
                }, true)  
                
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

                if (addProjectFuncOnce === true) {
                    addBtnsFunc(
						addToDoBtn,
						submitToDoBtn,
						projectArea,
						projectDivArr,
						e.target.textContent,
						projectObjArr,
						'projectsToDo',
						e.target.textContent,
						projectStoredToDo
					)
                }
            }
            
            // project buttons active status
            let navButtons = [...document.querySelectorAll('.navButton')]

            for(let btn of navButtons) {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                    btn.disabled = false
                }
            }
            showProjects()
            e.target.classList.add('active')
            e.target.disabled = true
        }   
    })
})()

export {
    projects,
    projectArea,
    addProjectFuncOnce,
}