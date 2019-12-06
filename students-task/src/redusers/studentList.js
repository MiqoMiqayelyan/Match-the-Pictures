import ls from 'local-storage';

const initialState = {
    studentList: []
};

export default function StudentsList(state = initialState, action){
    switch(action.type){
        case 'ADD_NEW_STUDENT':
            state = {
                ...state,
                studentList: state.studentList.concat(action.payload)
            }

            break;
        case 'UPDATE_STUDENT' :
            const student = action.payload
            const updateStudent = state.studentList.find((elem) => {
                return elem.id === student.id
            });
            updateStudent.name = student.name;
            updateStudent.age = student.age;
            updateStudent.prog = student.prog;
            break;
        case 'DELETE_STUDENT' :
            state = {
                ...state,
                studentList: state.studentList.filter((x,i) => action.payload.id !==  x.id)
            }
            let myStudents = JSON.parse(ls.get('student'));
            let newStudentArray = myStudents.filter((x, i) => action.payload.id !== x.id);
            ls.set('student', JSON.stringify(newStudentArray));
            break;
        default: 
        state = {...state}
    }

    return state;
}