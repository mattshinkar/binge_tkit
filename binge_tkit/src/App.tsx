import React from 'react';
import './App.css';
import { ListenerMessage, IFrameUrlResponse } from './types';

function App() {
  const [urls, setUrls] = React.useState<string[]>([]);

  /**
   * We can't use "chrome.runtime.sendMessage" for sending messages from React.
   * For sending messages from React we need to specify which tab to send it to.
   */
  const sendReq = () => {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, tabs => {
      /**
       * Sends a single message to the content script(s) in the specified tab,
       * with an optional callback to run when a response is sent back.
       *
       * The runtime.onMessage event is fired in each content script running
       * in the specified tab for the current extension.
       */
      chrome.tabs.sendMessage(
        tabs[0].id || 0,
        ListenerMessage.GetIframeUrl as ListenerMessage,
        (response: IFrameUrlResponse) => {
          setUrls(response.urls);
        });
    });
  };

  const goToUrl = () => {
    urls.length > 0 && window.open(urls[0], "_blank");
  }

  return (
    <div className="App">
      <button onClick={sendReq}>Get URLs</button>
      <br></br>
      <button onClick={goToUrl}>Go to first</button>
      <br></br>
      Available URLs:
      {urls.length > 0 && <ul>
        {urls.map((u) => {
          return (
            <li key={u}>
              {u}
            </li>
          );
        })}
      </ul>}
    </div>
  );
}

export default App;
