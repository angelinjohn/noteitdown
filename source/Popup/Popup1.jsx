import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import {SlateInputField} from './SlateInput';
import {ReferencesInput} from './ReferencesInput';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './Header';
import { Node } from 'slate';
import jsPDF from 'jspdf'

function openWebPage(url) {
  return browser.tabs.create({ url });
}

const theme = createMuiTheme();

class Popup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notes:{note:[],references:[]},
            note:[],
            references:[],
            showReferences:false
        }
    }

    
    componentDidMount(){
        let popupComponent = this;
        browser.storage.sync.get(["notes"]).then(function(data){
           // browser.browserAction.setBadgeText({"text":""});
            if(data && data.notes){
              popupComponent.setState({
                notes: data.notes,
                note: data.notes.note,
                references: data.notes.references
              });
            }
          });
        window.addEventListener('beforeunload', this.onUnmount, false);
    }

updateNotes = ()=>{
  let noteData={note:this.state.note,references:this.state.references};
  this.setState({notes:noteData});
  console.log(this.state.notes);
  let context = this;
  browser.storage.sync.set({"notes": this.state.notes}).then(function () {
    console.log('Value is set to ' + context.state.notes);
  })
}

updateNote = (data) =>{
this.setState({note:data});
this.updateNotes();
}

updateReferences = (data) => {
  this.setState({references:data});
  this.updateNotes();
}

exportNote = () => {
 let nodesToExport = this.state.notes
  const serialize = nodes => {
    return nodes.map(n => Node.string(n)).join('\n')
  }
  let contentToExport = serialize(nodesToExport);
  var doc = new jsPDF('p', 'pt');
      
  console.log(contentToExport);
  doc.text(contentToExport,10,120,{maxWidth:500})
  console.log(doc);    
  doc.save('demo.pdf')
}

  toggleRef = (currentState) => {
    console.log(currentState.showReferences+"=====in toggle");
   this.setState({ showReferences: !currentState })
  }

onUnmount = () => {
  console.log("unmounting------------>");
  let context = this;
  browser.storage.sync.set({"notes": this.state.notes}).then(function () {
    console.log('Value is set to ' + context.state.notes);
  })
}

componentWillUnmount() {
  window.removeEventListener('beforeunload', this.onUnmount, false);
  this.onUnmount();
}


render(){
  let content;
  // browser.storage.sync.get(["noteItDownContext"]).then(function (data) {
  //   browser.browserAction.setBadgeText({ "text": "" });
  // });
  // browser.storage.sync.get(["referenceContext"]).then(function (data) {
  //   console.log(data.referenceContext);
  // });
  if(this.state.showReferences){
   content = <References initValue={this.state.references} updateReferences ={this.updateReferences}/>
  }else{
    content = <SlateInputField className="slate" initValue={this.state.note}
    updateNotesMethod ={this.updateNote}
    />
  }
    return( <div className="popup-wrapper">
    <MuiThemeProvider theme={theme}>
      <Header export={this.exportNote} showRef={this.state.showReferences} toggleRef={this.toggleRef}/>
      <div className="nidContent">
      {content}
    </div>
   </MuiThemeProvider>
   </div>)
}
}

function References(props){
  return (<div><div>Referencess</div>
  <ReferencesInput className="slate" initValue={props.initValue}
  updateReferencesMethod ={props.updateReferences}
  />
  </div>)

}
export default Popup;