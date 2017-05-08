console.clear()
// let firstHref = document.querySelectorAll('a[href^="http"]')[0].getAttribute('href');
// console.log(firstHref);

let isActive = false;

let blastedElements = []
let blastedFrames = []

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if( request.message === "actionOn" ) {

      console.log('on');
      isActive = true;

      var uiStyle = document.createElement('style');
      uiStyle.type = 'text/css';
      uiStyle.innerHTML = `.uiStyle { position:absolute; background:black; width:100px; Height:100px; }`;
      document.getElementsByTagName('head')[0].appendChild(uiStyle);

      var uiElement = document.createElement('div');
      uiElement.classList.add('uiStyle');
      document.body.append(uiElement);


      var highlightClass = document.createElement('style');
      highlightClass.type = 'text/css';
      highlightClass.innerHTML = `.highlightClass { outline: 1px solid pink }`;
      document.getElementsByTagName('head')[0].appendChild(highlightClass);

      var blastClass = document.createElement('style');
      blastClass.type = 'text/css';
      blastClass.innerHTML = `.blastClass { display: none; opacity: .2;}`;
      // blastClass.innerHTML = `.blastClass { transition: opacity .5s; opacity: .2; }`;
      // blastClass.innerHTML = `.blastClass { transition: opacity .5s; opacity: .2; pointer-events: none; }`;
      document.getElementsByTagName('head')[0].appendChild(blastClass);


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


    else if( request.message === "actionOff" ) {
      console.log('off');
      isActive = false;
      blastedElements.forEach((element) => {
        element.classList.remove('blastClass');
        // blastedElements.pop();
        // console.log(blastedElements);
      })
    }

  }
);