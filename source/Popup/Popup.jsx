import React, { useEffect, useMemo, useState, useCallback } from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import {SlateInputField} from './SlateInput';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
 return(
  <MuiThemeProvider theme={theme}>
 <SlateInputField initValue={JSON.stringify([
        {
            children: [{ text: '' }],
        }
      ])}
  />
 </MuiThemeProvider>)

}


export default Popup;
