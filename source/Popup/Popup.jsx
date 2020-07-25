import React, { useEffect, useMemo, useState, useCallback } from 'react';
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

const Popup = () => {

  const [noteInitValue,setNoteInitialValue] = useState(JSON.stringify([
    {
        children: [{ text: '' }],
    }
  ]));

  
 
  browser.storage.sync.get(["noteItDownContext"]).then(function(data){
      //browser.browserAction.getBadgeBackgroundColor({"color":"#FFFFFF"});
      browser.browserAction.setBadgeText({"text":""});
      if(data && data.noteItDownContext){
        console.log("here===========")
        console.log(data.noteItDownContext)
        setNoteInitialValue(JSON.stringify([
          {
              children: [{ text: data.noteItDownContext}],
          }
        ]));
      }
    });


 return(
   <div className="popup-wrapper">
  <MuiThemeProvider theme={theme}>
    <Header/>
    <div className="nidContent">
 <SlateInputField className="slate" initValue={noteInitValue}
  />
  </div>
 </MuiThemeProvider>
 </div>)

}


export default Popup;
