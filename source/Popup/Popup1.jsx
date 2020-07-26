import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import {SlateInputField} from './SlateInput';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './Header';
import { Node } from 'slate';
import jsPDF from 'jspdf'

function openWebPage(url) {
  return browser.tabs.create({ url });
}
// browser.tabs.executeScript({
//   file: "js/contentScript.bundle.js"
// });

// browser.storage.sync.get(["noteItDownContext"]).then(function(data){
//   //browser.browserAction.getBadgeBackgroundColor({"color":"#FFFFFF"});
//   browser.browserAction.setBadgeText({"text":""});
//   console.log(data.noteItDownContext);
  
// });

const theme = createMuiTheme();

class Popup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            notes:[],
            showReferences:false
        }
    }
    componentDidMount(){
        let popupComponent = this;
        browser.storage.sync.get(["notes"]).then(function(data){
           // browser.browserAction.setBadgeText({"text":""});
            if(data && data.notes){
              popupComponent.setState({notes: data.notes});
            }
          });
        window.addEventListener('beforeunload', this.onUnmount, false);
    }

updateNotes = (dataToPersist)=>{
  this.setState({notes:dataToPersist});
  console.log(this.state.notes);
  let context = this;
  browser.storage.sync.set({"notes": this.state.notes}).then(function () {
    console.log('Value is set to ' + context.state.notes);
  })
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
    return( <div className="popup-wrapper">
    <MuiThemeProvider theme={theme}>
      <Header export={this.exportNote} showRef={this.state.showReferences} toggleRef={this.toggleRef}/>
      <div className="nidContent">
   <SlateInputField className="slate" initValue={this.state.notes}
    updateNotesMethod ={this.updateNotes}
    />
    </div>
   </MuiThemeProvider>
   </div>)
}

}

export default Popup;
