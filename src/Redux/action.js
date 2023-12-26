import {ADD_BOOKS,ADD_USER} from './actionType'

export const addBooks=(payload)=>{
    return {type:ADD_BOOKS,payload}
}


export const addUser=(payload)=>{
    return {type:ADD_USER,payload}
}

