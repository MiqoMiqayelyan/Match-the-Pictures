import types from '../constants/constants'
export default function DeleteStudentAction(id){
    return ({
        type: types.DELETE_STUDENT,
        payload: id
    })
}