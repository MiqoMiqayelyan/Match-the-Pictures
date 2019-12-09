import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import  DeleteStudentAction  from '../../actions/DeleteStudentAction';
import UpdateStudentAction from '../../actions/UpdateStudentAction';
import ageValidation from '../../AgeValidation';

function StudentsList({name, age, prog, id, hideStudent, changeStudentHiding}){
    const [updateName, updateStudentName] = useState({
      name: name,
      valid: true
    });
    const [updateAge, updateStudentAge] = useState({
      age: age,
      valid: true
    });
    const [updateProg, updateStudentProg] = useState({
      prog: prog,
      valid: false
    });
    const dispatch = useDispatch();
    
    const editStudentInfo = (e) => {
        e.preventDefault();
        changeStudentHiding({
          hiding: true,
          id: id
        });
      }
    
      const deleteStudent = (e) => {
        e.preventDefault()
        dispatch(DeleteStudentAction(id));
      }

      const updateStudentInfo = (e) => {
        e.preventDefault();
        if((updateName.name && updateName.name.length > 2) && (updateProg.prog !== 'None') && ageValidation(updateAge.age)){
          changeStudentHiding({
            hiding: false,
            id: id
          });
          dispatch(UpdateStudentAction(id, updateName.name, updateAge.age, updateProg.prog));
        }

        if(!updateName.name || updateName.name.length < 2){
          updateStudentName({valid: false});
        }

        if(updateProg.prog === 'None'){
          updateStudentProg({valid: false});
        }

        if(updateAge.age === '' && !ageValidation(updateAge.age)){
          updateAge({valid: false});
        }
            
      }
    return (
     <form id={id} key={id} className={(hideStudent.id === id &&  hideStudent.hiding? '' : 'student-list') }>
         <input className={(updateName.valid ? '' : 'invalid')} onChange={event => updateStudentName({
           name: event.target.value,
           valid: true
         })} type="text" value={updateName.name}/>
         <input onChange={event => updateStudentAge({
           age: event.target.value,
           valid: ageValidation(event.target.value)
         })} 
         className={(updateAge.valid ? '' : 'invalid')}
         type="date" 
         value={updateAge.age}/>
         <select required 
         onChange={event => updateStudentProg({
           prog: event.target.value,
           valid: true
         })} 
         className={(updateName.valid ? '' : 'invalid')} value={updateProg.prog}>
            <option>None</option>
            <option>Wery good</option>
            <option>Good</option>
            <option>Normal</option>
            <option>Bad</option>
         </select>
         <div className="buttons-container">
            <button onClick={editStudentInfo} className="edit-student-info">Edit</button>
            <button onClick={deleteStudent} className="delete-student">Delete</button>
         </div>
         <input onClick={updateStudentInfo} className="add-edits" type="submit" value="Submit"/>
     </form>
    )
}


export default StudentsList;