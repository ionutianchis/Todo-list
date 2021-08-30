import {format} from 'date-fns'
import {baseObjArr, divArr, containerTitle} from './home'

function weekPage() {
    
    containerTitle.textContent = 'Week'

    function hideNotFromWeek() {
        let curr = new Date()
        let week = []
    
        for (let i = 1; i <= 7; i++) {              // loop that returns an array containing each day of the current week
          let first = curr.getDate() - curr.getDay() + i                        
          let day = new Date(curr.setDate(first))
          let formattedDay = format(day, "dd/MM/yyyy")
          week.push(formattedDay)
        } 

        for (let i=0; i<baseObjArr.length; i++) {       // loops through the objects and hides them if they are not from current week
            if (!(week.includes(format(baseObjArr[i].dueDate, 'dd/MM/yyyy')))) {
                divArr[i].style.display = 'none'
            }
        }
    }

    hideNotFromWeek()
}

export {weekPage}