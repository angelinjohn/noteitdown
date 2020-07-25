import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import {SlateInputField} from './SlateInput';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './Header';
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
            noteInitialValue:JSON.stringify([
                {
                    children: [{ text: '' }],
                }
              ])
        }
    }
    componentDidMount(){
        let popupComponent = this;
        browser.storage.sync.get(["noteItDownContext"]).then(function(data){
            browser.browserAction.setBadgeText({"text":""});
            if(data && data.noteItDownContext){
              popupComponent.setState({noteInitialValue: JSON.stringify([
                {type:"paragraph",
                    children: [{ text: data.noteItDownContext}],
                }
              ])});
            }
          });
    }
render(){
    return( <div className="popup-wrapper">
    <MuiThemeProvider theme={theme}>
      <Header/>
      <div className="nidContent">
   <SlateInputField className="slate" initValue={this.state.noteInitialValue}
    />
    </div>
   </MuiThemeProvider>
   </div>)
}

}

export default Popup;
