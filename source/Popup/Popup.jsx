import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import svd48 from './svd48.png';
import icon from './icon.png';
import StickyNotes from '../StickyNotes/StickyNotes'; 
import {TiTick,TiDeleteOutline,TiClipboard} from 'react-icons/Ti';
import {MdClear} from 'react-icons/md';

function openWebPage(url) {
  return browser.tabs.create({url});
}
browser.tabs.executeScript({
  file: "js/contentScript.bundle.js"
});

// browser.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if( request.message === "add_title" ) { 
//       var content = request.url + "\n----------------------------------------\n";
//       document.getElementById('title-text').insertAdjacentHTML('beforeend',content);
//       }
//       else if (request.message === "add_texts") {
         

//         if (request.url.length > 0) {
//           var content = request.url;
//           alert(content);
//           // if (!(urlArray.indexOf(activeTab.url) > 0)) {
//           //   urlArray.push(activeTab.url);
//           // }
//           // index = urlArray.indexOf(activeTab.url);
//           content = content + " [Ref: " + (index + 1) + "]\n\n";
//           document.getElementById('title-text').insertAdjacentHTML('beforeend', content);
//         }else{
//           document.getElementById('title-text').innerHTML = document.getElementById('title-text').value;
//         }
//       }
//     //}
//     browser.storage.sync.set({"docContent": document.getElementById('title-text').innerHTML ,"urlArray": urlArray }, function () {
//       console.log('Value is set to ' + urlArray);
//   })
//   }
// );

class Popup extends React.Component {
  // displayContent =() =>{
  //   let tabsPromise = browser.tabs.query({ active: true, currentWindow: true, windowId: browser.windows.WINDOW_ID_CURRENT })
  //   tabsPromise.then(function (tabs) {
  //     var activeTab = tabs[0];
  //     // if (document.getElementById('title-text').innerHTML.length > 0) {


  //     browser.tabs.sendMessage(activeTab.id, { "message": "get_selected_text" });
  //     if (!(urlArray.indexOf(activeTab.url) > 0)) {
  //       urlArray.push(activeTab.url);
  //     }
  //     // } else {
  //     //  chrome.tabs.sendMessage(activeTab.id, { "message": "get_search_text" });
  //     // }
  //   //  index = urlArray.indexOf(activeTab.url);

  //   });
  // };

  render() {
    
    return (<div className='popup-wrapper react-stickies-wrapper'>
      {/* <ReactStickies
        notes={this.state.notes}
        onChange={this.onChange}
        grid={{isDraggable :false,
          isResizable : false }}
        footer = {false}
        colors='[#ffcccc]'
      /> */}
      {/* <button onClick={this.displayContent}>ADD CONTENT</button> */}
      <StickyNotes/>
      {/* <div className='popup-icon-container'>
      <TiTick size='2em' className='popup-icons'/>
      <TiClipboard size='2em' className='popup-icons'/>
      <TiDeleteOutline size='2em' className='popup-icons'/>
      </div> */}
      </div>
    )
  }
};

export default Popup;
