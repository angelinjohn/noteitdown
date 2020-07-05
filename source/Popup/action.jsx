
import {ADD_TITLE,EDIT_TITLE,UPDATE_TITLE,COPY_CONTENT,EDIT_CONTENT,DELETE_NOTE,ADD_NOTE} from './constants';




export const addTitle = data => ({type:ADD_TITLE,payload:data})
export const editTitle = data => ({type:EDIT_TITLE,payload:data})
export const updateTitle = data => ({type:UPDATE_TITLE,payload:data})
export const copyContent = data => ({type:COPY_CONTENT,payload:data})
export const editContent = data => ({type:EDIT_CONTENT,payload:data})
export const deleteNote = data => ({type:DELETE_NOTE,payload:data})
export const addNewNote = data => ({type:ADD_NOTE,payload:data})
