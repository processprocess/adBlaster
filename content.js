console.clear();

let pageBlaster;
let uiElement;
let activeWindows = [];
let blastedElements = [];

var uiStyle = document.createElement('style');
uiStyle.type = 'text/css';
uiStyle.innerHTML = `
  .uiStyle {
    position: fixed;
    top: 0;
    right: 0;
    background: black;
    color: white;
    width: 100px;
    Height: 100px;
    z-index: 2147483647;
  }
  .blastClass {
    opacity: .0;
    pointer-events: none;
  }
`;

document.querySelector('head').appendChild(uiStyle);

class NewBlaster {
  constructor(){
    this.active = true;
  }
  toggleActive() {
    this.active ? this.active = false : this.active = true;
    this.checkActive();
  }
  checkActive() {
    console.log(`adBlaster is ${this.active}`);
  }
  init() {
    window.addEventListener('click', (e) => {
      if (!this.active) return;
      this.clickFunction(e);
    });
  }
  clickFunction(e) {
    if (e.target.nodeName === 'BODY' || e.target.classList.contains('noBlast')) return;
    e.target.classList.add('blastClass');
    blastedElements.push(e.target);
    uiElement.querySelector('.count').textContent = blastedElements.length;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (activeWindows.includes(request.url)) {
    pageBlaster.toggleActive();
    uiElement.classList.toggle('blastClass');
  } else {
    generateUI()
    activeWindows.push(request.url)
    // generate blaster
    pageBlaster = new NewBlaster();
    pageBlaster.checkActive();
    pageBlaster.init();
  }

});

function generateUI() {
  uiElement = document.createElement('div');
  uiElement.setAttribute('class', 'uiStyle noBlast')
  uiElement.innerHTML = `
    adBlaster
    <span class="count noBlast">0</span>
    <span class="noBlast undo">undo</span>
    <span class="noBlast undoAll">undo all</span>
  `;
  document.body.append(uiElement);
  uiElement.addEventListener('click', (e) => handleUiEvents(e))
}

function handleUiEvents(e) {
  if (e.target.classList.contains('undo')) {
    blastedElements.pop().classList.remove('blastClass')
    uiElement.querySelector('.count').textContent = blastedElements.length;
  } else if (e.target.classList.contains('undoAll')) {
    while(blastedElements.length) blastedElements.pop().classList.remove('blastClass');
    uiElement.querySelector('.count').textContent = blastedElements.length;
  }
}

// when blasted
// div is created
// position is set to center of element
// animation plays
// animation is removed from dom when complete

// selector works same way, but with transforming box.













// console.clear()
//
// let isActive = false;
//
// let blastedElements = []
// let blastedFrames = []
//
// let uiElement;
//
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//
//     // ---------- recieve message and start adBlaster ---------- //
//
//     if( request.message === "actionOn" ) {
//
//       console.log('on');
//       isActive = true;
//
//       // ---------- define css ---------- //
//
//       var uiStyle = document.createElement('style');
//       uiStyle.type = 'text/css';
//       uiStyle.innerHTML = `
//         .uiStyle {
//           position: absolute;
//           top: 0;
//           right: 0;
//           background: black;
//           color: white;
//           width: 100px;
//           Height: 100px;
//           z-index: 2147483647;
//         }
//
//         .highlightClass {
//           outline: 3px solid pink
//         }
//
//         .blastClass {
//           display: none;
//           opacity: .2;
//         }
//
//         .notVisible {
//           display: none;
//           pointer-events: none;
//           opacity: 0;
//         }
//
//       `;
//
//       document.getElementsByTagName('head')[0].appendChild(uiStyle);
//
//       // ---------- gen ui and append to page ---------- //
//
//       uiElement = document.createElement('div');
//       uiElement.classList.add('uiStyle');
//       document.body.append(uiElement);
//
//       // ---------- select all iframes ---------- //
//
//       let iframes = document.querySelectorAll('iframe')
//
//       iframes.forEach((frame)=> {
//         // frame.remove()
//         // frame.classList.add('blastClass')
//         // console.log(frame);
//         // let frameNodes = frame.querySelectorAll('a[href^="http"]')
//         // frameNodes.forEach((node)=> {
//         //   node.setAttribute('href', 'javascript:void(0)');
//         // })
//       })
//
//       // ---------- select all nodes with hrefs ---------- //
//
//       let linkNodes = document.querySelectorAll('a[href^="http"]')
//       linkNodes.forEach((node)=> {
//         // node.setAttribute('href', 'javascript:void(0)');
//         // node.setAttribute('href') = "javascript:void(0)"
//       })
//
//       // ---------- track movement when active ---------- /
//
//       window.addEventListener('mousemove', (e) => {
//         if (!isActive) return;
//         moveFunction(e);
//       });
//
//       function moveFunction(e) {
//         let mouseTarget = e.target
//
//         mouseTarget.onclick = function() {
//           if (!isActive) return;
//           return(false);
//         };
//
//         // hover classes
//
//         mouseTarget.addEventListener('mouseover', function(e) {
//           if (!isActive) return;
//           // e.target.classList.remove("highlightClass");
//           e.target.classList.add("highlightClass");
//         })
//
//         mouseTarget.addEventListener('mouseout', function(e) {
//           if (!isActive) return;
//           e.target.classList.remove("highlightClass");
//         })
//
//       }
//
//       // ---------- click and blow up ---------- //
//
//       window.addEventListener('click', (e) => {
//         if (!isActive) return;
//         clickFunction(e);
//       });
//
//       function clickFunction(e) {
//         e.preventDefault();
//         // e.target.remove();
//         e.target.classList.add('blastClass')
//         blastedElements.push(e.target);
//         console.log(e.target);
//       }
//
//     }
//
//     // restore page, dissable click events
//     else if( request.message === "actionOff" ) {
//       console.log('off');
//       uiElement.remove();
//       isActive = false;
//       blastedElements.forEach((element) => {
//         // element.classList.remove('blastClass');
//         // blastedElements.pop();
//         // console.log(blastedElements);
//       })
//     }
//
//   }
// );