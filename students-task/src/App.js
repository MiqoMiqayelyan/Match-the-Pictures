import React, { useState, useEffect } from 'react';
import './App.css';
import StudentsList from './components/studentsList/studentsList';
import ls from 'local-storage';
import { useSelector, useDispatch } from 'react-redux';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 || 0, v = c === 'x' ? r : (r & 0x3 || 0x8);
    return v.toString(16);
  });
}

function App() {
  const [studentName, addStudentName] = useState({
    name: '',
    valid: true
  });
  const [studentAge, addStudentAge] = useState('');
  const [studentProg, addStudentProg] = useState('Wery Good');
  const [hideStudent, changeStudentHiding] = useState({
    hiding:true
  });
  const studentList = useSelector((state) => state.studentList);
  const dispatch = useDispatch();
  let myStudents = JSON.parse(ls.get('student'));

   

  useEffect(() => {
    dispatch({
      type: 'ADD_NEW_STUDENT',
      payload: myStudents
    })
  }, []);

  useEffect(() => {
    ls.set('student', JSON.stringify(studentList));
  }, [myStudents, studentList]);
  
  const submitStudent = (e) => {
      e.preventDefault();
     
      if(studentName.name.length > 2){
        dispatch({
          type: 'ADD_NEW_STUDENT',
          payload: {
            id: uuidv4(),
            name: studentName.name,
            age: studentAge,
            prog: studentProg
          }
        });
      }else{
        addStudentName({valid: false})
      }
        
  }
  
  
  
  return (
    <div className="App">
        <form className="add-student-container">
          <input minLength='2' onChange={event => addStudentName({
            name: event.target.value, 
            valid: true
            })}  id="studant-name" className={(studentName.valid ? '' : 'invalid')} placeholder="Add your name, more than 2 character" type="text"/>
          <input onChange={event => addStudentAge(event.target.value)}  id="student-age" placeholder="Add your Age 18+" max="2001-01-01"  type="date"/>
          <select  onChange={event => addStudentProg(event.target.value)} id="student-progress">
            <option>Wery good</option>
            <option>Good</option>
            <option>Normal</option>
            <option>Bad</option>
          </select>
          <button onClick={submitStudent} id="add-new-student" type="submit">Submit</button>
        </form>
        {studentList.map((student, index) => (
         <StudentsList 
         key={student.id}
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
