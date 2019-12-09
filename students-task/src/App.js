import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ls from 'local-storage';
import StudentsList from './components/studentsList/studentsList';
import AddNewStudentAction from './actions/AddNewStudentAction';
import types from './constants/constants';
import ageValidation from './AgeValidation'
import './App.css';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

function App() {
  const [studentName, addStudentName] = useState({
    name: null,
    valid: true
  });
  const [studentAge, addStudentAge] = useState({
    age: '',
    valid: true
  });
  const [studentProg, addStudentProg] = useState({
    prog: 'None',
    valid: true
  });
  const [hideStudent, changeStudentHiding] = useState({
    hiding:true
  });
  const studentList = useSelector((state) => state.studentList);
  const dispatch = useDispatch();
  let myStudents = JSON.parse(ls.get('student'));

   

  useEffect(() => {
    dispatch({
      type: types.ADD_NEW_STUDENT,
      payload: myStudents
    })
  }, []);

  useEffect(() => {
    ls.set('student', JSON.stringify(studentList));
  }, [myStudents, studentList]);
  
  const submitStudent = (e) => {
      e.preventDefault();
     
      if((studentName.name && studentName.name.length > 2) && (studentProg.prog && studentProg !== 'None') && ageValidation(studentAge.age)){
        let unicId = uuidv4();
        dispatch(AddNewStudentAction(unicId, studentName.name, studentAge.age, studentProg.prog));
      }

      if(!studentName.name || studentName.name.length < 2){
        addStudentName({valid: false});
      }

      if(studentProg.prog === 'None'){
        addStudentProg({valid: false});
      }
      
      if(studentAge.age === '' && !ageValidation(studentAge.age)){
        addStudentAge({valid: false});
      }
        
  }
  
  
  
  return (
    <div className="App">
        <form className="add-student-container">
          <input onChange={event => addStudentName({
            name: event.target.value, 
            valid: true
            })}  id="studant-name" className={(studentName.valid ? '' : 'invalid')} placeholder="Add your name, more than 2 character" type="text"/>
          <input onChange={event => 
            addStudentAge({
            age: event.target.value,
            valid: ageValidation(event.target.value)
          })}
          className={(studentAge.valid ? '' : 'invalid')}
            id="student-age" placeholder="Add your Age 18+"  type="date"/>
          <select required 
          onChange={event => addStudentProg({
            prog: event.target.value,
            valid: true
          })}
          className={(studentProg.valid ? '' : 'invalid')}
          id="student-progress">
            <option>None</option>
            <option>Wery good</option>
            <option>Good</option>
            <option>Normal</option>
            <option>Bad</option>
          </select>
          <button onClick={submitStudent} id="add-new-student" type="submit">Submit</button>
        </form>
        {studentList.map((student, index) => (
         <StudentsList 
         id={student.id}
         name={student.name}
         age={student.age}
         prog={student.prog}
         hideStudent={hideStudent}
         changeStudentHiding={changeStudentHiding}
         />
        ))}
    </div>
  );
}





export default App;
