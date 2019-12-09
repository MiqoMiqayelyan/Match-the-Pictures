import ls from 'local-storage';
import types from '../constants/constants';

const initialState = {
    studentList: []
};

export default function StudentsList(state = initialState, action){
    switch(action.type){
        case types.ADD_NEW_STUDENT:
            state = {
                ...state,
                studentList: state.studentList.concat(action.payload)
            }

            break;
        case types.UPDATE_STUDENT:
            const student = action.payload
            const updateStudent = state.studentList.find((elem) => {
                return elem.id === student.id
            });
            updateStudent.name = student.name;
            updateStudent.age = student.age;
            updateStudent.prog = student.prog;
            break;
        case types.DELETE_STUDENT:
            state = {
                ...state,
                studentList: state.studentList.filter((x,i) => action.payload !==  x.id)
            }
            let myStudents = JSON.parse(ls.get('student'));
            let newStudentArray = myStudents.filter((x, i) => action.payload !== x.id);
            ls.set('student', JSON.stringify(newStudentArray));
            break;
        default: 
        state = {...state}
    }

    return state;
}