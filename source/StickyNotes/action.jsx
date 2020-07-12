
import {UPDATE_TITLE,COPY_CONTENT,EDIT_CONTENT,DELETE_NOTE,ADD_NOTE,REQUEST_CONTENT} from './constants';




export const updateTitle = data => ({type:UPDATE_TITLE,payload:data})
export const requestContent = data => ({type:REQUEST_CONTENT,payload:data})
export const copyContent = data => ({type:COPY_CONTENT,payload:data})
export const editContent = data => ({type:EDIT_CONTENT,payload:data})
export const deleteNote = data => ({type:DELETE_NOTE,payload:data})
export const addNewNote = data => ({type:ADD_NOTE,payload:data})
