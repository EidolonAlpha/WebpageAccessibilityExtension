function popup() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
 });
}

function SendCSS() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "SendCSS"});
 });
}

function SaveCSS() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "SaveCSS"});
 });
}

function DeleteCSS() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "DeleteCSS"});
 });
}

function ToggleNightMode() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "ToggleNightMode"});
 });
}

function ToggleReducedLightMode() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "ToggleReducedLightMode"});
 });
}

function decreaseFont() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "changeFontSize", "fontIncrease": -2});
 });
}

function increaseFont() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "changeFontSize", "fontIncrease": 2});
 });
}

function changeFont() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "changeFont", "newFont": document.getElementById("font_txt").value});
 });
}


function sendHTML() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "SendHTML"});
 });
}

function sendMessage(message) {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": message});
 });
}

function changeUser() {
  chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "ChangeUser", "userID": document.getElementById("userIDText").value});
 });
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("ToggleReducedLightMode").addEventListener("click", ToggleReducedLightMode);
  document.getElementById("changeUserBtn").addEventListener("click", changeUser);
  document.getElementById("ToggleNightMode").addEventListener("click", ToggleNightMode);
  document.getElementById("increaseFont").addEventListener("click", increaseFont);
  document.getElementById("decreaseFont").addEventListener("click", decreaseFont);
  document.getElementById("changeFont_btn").addEventListener("click", changeFont);
  document.getElementById("revert").addEventListener("click", DeleteCSS);
  document.getElementById("save").addEventListener("click", SaveCSS);
});
