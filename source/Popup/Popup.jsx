import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import svd48 from './svd48.png';
import icon from './icon.png';
import ReactStickies from '../Stickies/index'; 
import {TiTick,TiDeleteOutline,TiClipboard} from 'react-icons/Ti';
import {MdClear} from 'react-icons/md';
import {connect} from 'react-redux';
import {addTitle} from './action';
import {selectorFn} from './selector';

function openWebPage(url) {
  return browser.tabs.create({url});
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }  
  onSave () {
    // Make sure to delete the editorState before saving to backend
    const notes = this.state.notes;
    notes.map(note => {
      delete note.editorState;
    })
    // Make service call to save notes
    // Code goes here...
  }
  onChange (notes) {
    this.setState({ // Update the notes state
      notes
    })
  }
 
  render() {
    
    return (<div className='popup-wrapper'>
      <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange}
        grid={{isDraggable :false,
          isResizable : false }}
        footer = {false}
        colors='[#ffcccc]'
      />
      <div className='popup-icon-container'>
      <TiTick size='2em' className='popup-icons'/>
      <TiClipboard size='2em' className='popup-icons'/>
      <TiDeleteOutline size='2em' className='popup-icons'/>
      </div>
      </div>
    )
  }
};

const mapStateToProps = state =>{
  return {
    title:selectorFn(state)
  }
}

const mapDispatchToProps = dispatch =>({
  addTitle: titleName =>() =>dispatch(addTitle(titleName)),
  editTitle: titleName =>() => dispatch(editTitle(titleName)),
  updateTitle: titleName =>() => dispatch(updateTitle(titleName)),
  copyContent: content =>() => dispatch(copyContent(content)),
  editContent: content => () => dispatch(editContent(content)),
  deleteNote: note =>() => dispatch(deleteNote(note)),
  addNewNote: note => () => dispatch(addNewNote(note)),
})

const Popup1 = () => {
  return (<div>
    <img src={svd48} style={{height:20,width:20,float:'left',padding:5}} alt={"logo"}/>
    <div id="title-svaadh" style={{backgroundColor:'#003153',color: 'moccasin',textAlign: 'center',fontSize:'x-large',fontFamily: 'Cambria, Cochin, Georgia, Times, Times New Roman, serif',padding:2}}><div>Note It Down !</div>
    <img src={icon} style={{height:20,width:20,float:'right',padding:5,cursor: 'pointer'}} alt={'logo'} id="exportDocument" title="Click to Export"/></div>
    <div id="exportContent">
    <textarea id="title-text"></textarea>
    <img src={icon} style={{height:20,width:20,float:'right',padding:5,cursor: 'pointer'}} alt={'logo'} id="exportDocument" title="Click to Export"/>
    </div>
    <div style={{float:'right',paddingBottom:5}}>
    <button id="changeColor">Add Content</button>
    <button id="clear">Clear All</button>
  </div>
  </div>
  );
};

const PopupComponent = connect(mapStateToProps,mapDispatchToProps)(Popup);
export default PopupComponent;
