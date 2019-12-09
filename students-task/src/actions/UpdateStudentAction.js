import types from '../constants/constants'
export default function AddNewStudentAction(id, name, age, prog){
    return ({
        type: types.UPDATE_STUDENT,
        payload: {
            id: id,
            name: name,
            age: age,
            prog: prog
          }
    })
}