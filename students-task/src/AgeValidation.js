export default function ageValidation(age){
    if(age === '') return false;
     let studAge = age;
     let thisYear = 2019,
         thisMont = 12,
         thisDay = 6;
     let studAgeArr = studAge.split('-')
     
     if(thisYear - studAgeArr[0] < 18){
       return false;
     }

     if(thisYear - studAgeArr[0] === 18){
        if(thisMont === studAgeArr[1]){

           if(thisDay === studAgeArr[2]){

             return true

           }else if(thisDay > studAgeArr[2]){
             
             return true;

           }else if( thisDay < studAgeArr[2]){

             return false;

           }
        }else if(thisMont < studAgeArr[1]){

          return false;

        }else if(thisMont > studAgeArr[1]){

          return true;

        }
     }

     if( thisYear - studAgeArr[0] > 18){

       return true;
       
     }
 }
 