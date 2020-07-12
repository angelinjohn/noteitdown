document.body.style.filter = '';
'use strict';
import browser from 'webextension-polyfill';

    
// browser.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {    
//       if( request.message === "get_selected_text" ) {
//         var selectedTxt = getSelectionText();
//         console.log("sender");
//         console.log(sender);
//         browser.runtime.sendMessage({"message": "add_texts", "url": selectedTxt});
//       }
//       return true;
//     }
//   );

//   function getSelectionText() {
//     var text = "";
//     if (window.getSelection) {
//         text = window.getSelection().toString();
//     } else if (document.selection && document.selection.type != "Control") {
//         text = document.selection.createRange().text;
//     }
//     return text;
// }
// export {};
