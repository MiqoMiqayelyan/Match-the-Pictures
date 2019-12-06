import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function StudentsList({name, age, prog, id, hideStudent, changeStudentHiding}){
    const [updateName, updateStudentName] = useState({
      name: name,
      valid: true
    });
    const [updateAge, updateStudentAge] = useState(age);
    const [updatepPog, updateStudentProg] = useState(prog);
    
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
        dispatch({
            type: 'DELETE_STUDENT',
            payload: {
              id: id,
            }
          });
      }

      const updateStudentInfo = (e) => {
        e.preventDefault();
        if(updateName.name.length > 2){
          changeStudentHiding({
            hiding: false,
            id: id
          });
          dispatch({
              type: 'UPDATE_STUDENT',
              payload: {
                id: id,
                name: updateName.name,
                age: updateAge,
                prog: updatepPog
              }
          });
        }else{
          updateStudentName({valid: false})
        }
            
      }
    return (
     <form id={id} key={id} className={(hideStudent.id === id &&  hideStudent.hiding? '' : 'student-list') }>
         <input className={(updateName.valid ? '' : 'invalid')} onChange={event => updateStudentName({
           name: event.target.value,
           valid: true
         })} type="text" value={updateName.name}/>
         <input onChange={event => updateStudentAge(event.target.value)} max="2001-01-01"  type="date" value={updateAge}/>
         <select onChange={event => updateStudentProg(event.target.value)} value={updatepPog}>
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