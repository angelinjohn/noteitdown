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
// browser.tabs.executeScript({
//   file: "js/contentScript.bundle.js"
// });


class Popup extends React.Component {

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
