import React from 'react';
import { Editor, EditorState, ContentState } from 'draft-js';
import moment from 'moment';
import './styles.scss';
import {TiTick,TiDeleteOutline,TiClipboard,TiPlus} from 'react-icons/Ti';
import {connect} from 'react-redux';
import {updateTitle,editContent,requestContent,copyContent} from './action';
import {selectorFn} from './selector';
import { debounce } from 'lodash';
import browser from 'webextension-polyfill';

browser.storage.sync.get(["noteItDownContext"]).then(function(data){
  //browser.browserAction.getBadgeBackgroundColor({"color":"#FFFFFF"});
  browser.browserAction.setBadgeText({"text":""});
  console.log(data.noteItDownContext);
});

class StickyNotes extends React.Component{
  

 titleUpdate = debounce((editorState,note)=>{
   this.props.updateTitle(editorState,note)
  },200);
  
  render(){
    return(<div><aside
      className={`note-wrap note`}>
        <div onClick={this.createBlankNote}>
         <TiPlus size='2em'/>
        </div>
      <div className="note-header">
        
        <div className="title" 
       // style={noteTitleStyle}
        >
       <Editor
          editorState={this.props.note.title}
          onChange={editorState => this.titleUpdate(editorState,this.props.note)}
          placeholder="Enter title or Copy from Page.."
        />
        </div>
        {/* <TiTick size='2em' className='popup-icon-tick' /> */}
        <div
         // className={`${closeIcon ? '' : 'close'}`}
         // style={closeStyle}
          onClick={() => this.deleteNote(note)}
        >
          {/* {closeIcon} */}
        </div>
      </div>
      <div className="note-body" 
      //style={noteBodyStyle}
      >
        <Editor
          editorState={this.props.note.editorState}
          onChange={editorState => this.props.editContent(editorState,this.props.note)}
          placeholder="Add your notes..."
        />
        
      </div>
     

      {/* <div
        className="note-footer"
        style={noteFooterStyle}
      >
        {note.timeStamp}
      </div> */}
    </aside> <div className='popup-icon-container'>
          {/* <TiClipboard size='2em' className='popup-icons' onClick={this.requestContentScript} /> */}
          <TiDeleteOutline size='2em' className='popup-icons' />
        </div></div>)
  }
}


const mapStateToProps = state => {
  console.log(state.notes.notes[0]);
  let note = selectorFn(state.notes);

  return {
    note: {
      title: note.title.editorState,
      id: note.id,
      editorState: note.editorState
    }
  }
}
  
const mapDispatchToProps = dispatch =>({
    updateTitle: (editorState,note) => dispatch(updateTitle({editorState,note})),
    copyContent: () => dispatch(copyContent()),
    editContent: (editorState, note) => dispatch(editContent({editorState, note})),
    deleteNote: note =>() => dispatch(deleteNote(note)),
    addNewNote: note => () => dispatch(addNewNote(note)),
})

const StickyNotesComponent = connect(mapStateToProps,mapDispatchToProps)(StickyNotes);
export default StickyNotesComponent;