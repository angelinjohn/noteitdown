import React from 'react';
import browser from 'webextension-polyfill';
import './styles.scss';
import svd48 from './svd48.png';
import icon from './icon.png';

function openWebPage(url) {
  return browser.tabs.create({url});
}




const Popup = () => {
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

export default Popup;
