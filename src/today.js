import {format} from "date-fns"
import {baseObjArr, divArr, containerTitle} from "./home"

function todayPage() {
   containerTitle.textContent = 'Today'

    function hideNotToday() {       // function that checks for the object's due date and hides the object if it isn't for today
        let today = format(new Date(), "dd/MM/yyyy")
        for (let i=0; i<baseObjArr.length; i++) {
            if (baseObjArr[i].dueDate !== today) {          
                divArr[i].style.display = 'none'
            }
        } 
    
    }

    hideNotToday() 
} 


export{todayPage}