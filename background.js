// Called when browser action is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    // console.log(activeTab.url);
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked", url: activeTab.url});
  });
});






// let isOn = false;
//
// chrome.browserAction.onClicked.addListener(function(tab) {
//
//   if (!isOn) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       var activeTab = tabs[0];
//       chrome.tabs.sendMessage(activeTab.id, {"message": "actionOn"});
//     });
//     isOn = true;
//   } else if (isOn) {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       var activeTab = tabs[0];
//       chrome.tabs.sendMessage(activeTab.id, {"message": "actionOff"});
//     });
//     isOn = false;
//   }
//
// });