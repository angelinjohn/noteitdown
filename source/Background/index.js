import 'emoji-log';
import browser from 'webextension-polyfill';

browser.runtime.onInstalled.addListener(() => {
  console.emoji('🦄', 'extension installed');
});

var contextMenuItem = {
  "id": "noteItDownContext",
  "title": "Add to Note It Down",
  "contexts": ["selection"]
}


browser.contextMenus.create(contextMenuItem);
browser.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId === "noteItDownContext" && clickData.selectionText) {
    clickData.selectionText = clickData.selectionText + clickData.pageUrl.toString();
    browser.storage.sync.set({"noteItDownContext": clickData.selectionText}).then(function () {
            console.log('Value is set to ' + clickData.selectionText);
        })
    browser.browserAction.setBadgeText({"text":"1"});
    // browser.browserAction.getBadgeBackgroundColor({}).then(function(data){
    //     console.log("badgeText");
    //     console.log(data);
    // })
  }
})
/* The function that finds and returns the selected text */
var funcToInject = function() {
  var selection = window.getSelection();
  var url =  window.location.href;
  return (selection.rangeCount > 0) ? selection.toString() : '';
};

/* This line converts the above function to string
* (and makes sure it will be called instantly) */
var jsCodeStr = ';(' + funcToInject + ')();';

chrome.commands.onCommand.addListener(function(cmd) {
  if (cmd === 'selectedText') {
     
  }
});
browser.commands.onCommand.addListener(function(command) {
  /* Inject the code into all frames of the active tab */
  chrome.tabs.executeScript({
    code: jsCodeStr,
    allFrames: true   //  <-- inject into all frames, as the selection 
                      //      might be in an iframe, not the main page
}, function(selectedTextPerFrame) {
      chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
        function (tabs) {
          browser.storage.sync.set({"referenceContext": tabs[0].url});
        }
      );
    if (chrome.runtime.lastError) {
        /* Report any error */
        console.log('ERROR:\n' + chrome.runtime.lastError.message);
    } else if ((selectedTextPerFrame.length > 0)
            && (typeof(selectedTextPerFrame[0]) === 'string')) {
        /* The results are as expected */
        browser.storage.sync.set({"noteItDownContext": selectedTextPerFrame[0]}).then(function () {
          console.log('Value is set to ' + selectedTextPerFrame[0]);
        })
        browser.browserAction.setBadgeText({"text":"1"});
    }
});
 
});