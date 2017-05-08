// Called when the user clicks on the browser action.

let isOn = false;

chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab

  if (!isOn) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "actionOn"});
    });
    isOn = true;
  } else if (isOn) {
    // chrome.tabs.query({active: false, currentWindow: false}, function(tabs) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "actionOff"});
    });
    isOn = false;
  }



});