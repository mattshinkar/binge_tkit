import { ListenerMessage, IFrameUrlResponse } from '../types';

// Function called when a new message is received
const messagesFromReactAppListener = (
    msg: ListenerMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: IFrameUrlResponse) => void) => {

    const urls = Array.from(document.getElementsByTagName<"iframe">("iframe")).map((f) => f.src);
    console.log("testing", urls);
    // Prepare the response object with information about the site
    const response: IFrameUrlResponse = {
        urls: urls
    };

    sendResponse(response);
}

// https://stackoverflow.com/questions/54181734/chrome-extension-message-passing-unchecked-runtime-lasterror-could-not-establi

/**
* Fired when a message is sent from either an extension process or a content script.
*/
// chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

// chrome.runtime.onConnect.addListener(port => {
//     port.onMessage.addListener(msg => {
//       // Handle message however you want
//     });
//   });