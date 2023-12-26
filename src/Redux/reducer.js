import {ADD_BOOKS,ADD_USER} from './actionType'

const initialState={
    data:[],
    user:""
}

export const reducerFunction=(state=initialState,action)=>{
    switch(action.type){
        case ADD_BOOKS:
            return {...state,data:action.payload}
        case ADD_USER:
            return {...state,user:action.payload}
        default:
            return state
    }
}