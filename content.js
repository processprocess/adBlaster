console.clear()

let isActive = false;

let blastedElements = []
let blastedFrames = []

let uiElement;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    // enable click events
    if( request.message === "actionOn" ) {

      console.log('on');
      isActive = true;

      // set up css
      var uiStyle = document.createElement('style');
      uiStyle.type = 'text/css';
      uiStyle.innerHTML = `
        .uiStyle {
          position: absolute;
          top: 0;
          right: 0;
          background: black;
          color: white;
          width: 100px;
          Height: 100px;
          z-index: 2147483647;
        }

        .highlightClass {
          outline: 1px solid pink
        }

        .blastClass {
          display: none;
          opacity: .2;
        }

        .notVisible {
          display: none;
          pointer-events: none;
          opacity: 0;
        }

      `;

      document.getElementsByTagName('head')[0].appendChild(uiStyle);

      uiElement = document.createElement('div');
      uiElement.classList.add('uiStyle');
      document.body.append(uiElement);

      let iframes = document.querySelectorAll('iframe')

      iframes.forEach((frame)=> {
        // frame.remove()
        // frame.classList.add('blastClass')
        // console.log(frame);
        // let frameNodes = frame.querySelectorAll('a[href^="http"]')
        // frameNodes.forEach((node)=> {
        //   node.setAttribute('href', 'javascript:void(0)');
        // })
      })

      let linkNodes = document.querySelectorAll('a[href^="http"]')
      linkNodes.forEach((node)=> {
        // node.setAttribute('href', 'javascript:void(0)');
        // node.setAttribute('href') = "javascript:void(0)"
      })
      // console.log(linkNodes);


      window.addEventListener('mousemove', (e) => {
        if (!isActive) return;
        moveFunction(e);
      });

      function moveFunction(e) {
        let mouseTarget = e.target

        mouseTarget.onclick = function() {
          if (!isActive) return;
          return(false);
        };

        mouseTarget.addEventListener('mouseover', function(e) {
          if (!isActive) return;
          // e.target.classList.remove("highlightClass");
          e.target.classList.add("highlightClass");
        })

        mouseTarget.addEventListener('mouseout', function(e) {
          if (!isActive) return;
          e.target.classList.remove("highlightClass");
        })

      }

      window.addEventListener('click', (e) => {
        if (!isActive) return;
        clickFunction(e);
      });

      function clickFunction(e) {
        e.preventDefault();
        e.target.remove();
        e.target.classList.add('blastClass')
        blastedElements.push(e.target);
        console.log(e.target);
      }

    }

    // restore page, dissable click events
    else if( request.message === "actionOff" ) {
      console.log('off');
      document.body.remove(uiElement);
      isActive = false;
      blastedElements.forEach((element) => {
        element.classList.remove('blastClass');
        // blastedElements.pop();
        // console.log(blastedElements);
      })
    }

  }
);