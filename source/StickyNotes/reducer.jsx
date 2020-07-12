
import {UPDATE_TITLE,COPY_CONTENT,EDIT_CONTENT,DELETE_NOTE,ADD_NOTE} from './constants';
import { EditorState } from 'draft-js';
import debounce from 'lodash/debounce';

let noteId = 0;
const noteInitialState = {
    id: noteId ++,
    title:{ 
           editorState:EditorState.createEmpty()
          },
    editorState:EditorState.createEmpty(),
    references:[]
}
const notesInitialState = {notes:[noteInitialState]};

const deleteNote = (state, payload) => {
    const index = state.indexOf(payload)
    if (index > -1) {
        state.splice(index, 1);
    }
    return state;
}

const updateTitle = (state,payload) =>{
    return state.map((item)=>{if(item.id === payload.note.id){
        console.log(payload.editorState.getCurrentContent().getPlainText());
        let newTitle = payload.editorState
        item.title.editorState = newTitle;
    }})
}

const editContent = (state,payload) => {
     return state.map((item)=>{
         if(item.id === payload.note.id){
        let newContent = payload.editorState
        item.editorState = newContent;
    }})

}
const noteReducer = (state=notesInitialState,action)=>{
    switch(action.type){
        case UPDATE_TITLE:{
            return  Object.assign([],state,updateTitle(state.notes,action.payload));
            //console.log(retValue.notes[0].title.editorState.getCurrentContent().getPlainText());
            }
        case COPY_CONTENT:
             console.log(action.payload);
        case EDIT_CONTENT:{
            let retValue =  Object.assign([],state,editContent(state.notes,action.payload));
            console.log("retVal");
            console.log(retValue.notes[0].editorState.getCurrentContent().getPlainText());
            return retValue;
        }

        case DELETE_NOTE:
             return Object.assign([],state,deleteNote(state,action.payload))

        case ADD_NOTE:
             return Object.assign([],state,[
                ...state,
                noteInitialState
              ])

        default: return state;
    }
}


export default noteReducer;

//updatedTitle = (title,titleCurrentEditorState) => {}