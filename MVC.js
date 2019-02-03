/*global L*/
let m = {}
const v = {}
const c = {}

/*=============================================================================*/
/*========================| non-react vanilla JS code: |=======================*/
/*=============================================================================*/

L.noPinchZoom();
L.attachAllElementsById(v);
window.id = `window`
window.document.id = `document`

c.initialize = (eventObject)=>{

  c.initializeModel(eventObject)
  const eventTypes = [
      "mousedown",
      "touchstart",
      "mouseup",
      "touchend",  
      "resize",
      "load",
      "DOMContentLoaded",
      "orientationchange",
      "change",
      "input",
      "mouseover",
      "mouseout",
      "mousemove",
      "touchmove",
      "online",
      "offline",
      "keyup",
      "keydown",
      "keypress",//maybe the preferred key event    
    ]  
    for(let eventType of eventTypes){
      window.addEventListener(eventType, c.update, true)
    }
}



//////////////////////////////////////////////

/* the following code was moved to UPDATE.js

c.update = (eventObject) => {

  c.updateModelAndView({
    
    setShowVeil: [m.source === v.infoGlass, m.pressed],
    setHideVeil: [m.source === v.exitVeil, m.pressed],
    
  }, eventObject)
}
///////////////////////////////////////////////////////
c.setHideVeil = (m)=>{
  m.showVeil = false;
}
c.showHideVeil = (v)=>{
  if(m.showVeil){return;}
  v.veil.css("visibility: hidden; opacity: 0");
}
//-----------------------------------------------//
c.setShowVeil = (m)=>{
  m.showVeil = true;
}
c.showShowVeil = (v)=>{
  if(!m.showVeil){return;}
  v.veil.css("visibility: visible; opacity: 1");
}
////////////////////////////////////////////
*/


c.updateModelAndView = (handlerQualifiers, eventObject) => {
  c.updateMetaEvents(eventObject)
  L.runQualifiedHandlers(handlerQualifiers, m, v, c)
}
///////////////////////////////////////////////////////
c.initializeModel = async function (eventObject){
//////////////////////////////////////////////////
///////////| define all meta events  |////////////
//////////////////////////////////////////////////
  /*
    should first get MODEL.json from website.
      If it is not empty, retain it as the current state repo,
      and exit this method:
  */	
  ////////////////////////
  /*
  const modelResponse = await window.fetch(`model.json`);
  const modelJson = await modelResponse.text(); // could do this in one step with .json() method
  const MODEL = JSON.parse(modelJson);
  if(Object.keys(MODEL).length > 5){//5 properties is rather arbitrary: m.id, m.type, m .source, etc.
    m = MODEL
    m.firstTime = true;
    m.stillPressed = false;
    m.eventTime = Date.now();
    m.timeBetweenEvents = 0;   
    m.historyTimeBetweenEvents = [0,0,0,0,0];
    m.inDblPress = false;
    return; //because we will use this most recent state data (rather than start fresh)
  } 
  */
  ////////////////////////
  m.firstTime = true;
  m.historyTimeBetweenEvents = [0,0,0,0,0];  
  m.stillPressed = false; 
  m.eventTime = Date.now();
  m.timeBetweenEvents = 0;

  m.eventObject = eventObject;    //the event object itself
  m.e = eventObject;				//a conveninet shorthand for eventObject
  m.source = eventObject.target;  //where the event took place
  m.type = eventObject.type;      //what the event was
  m.id = eventObject.target.id;   //the id of the element where the event occurred
  
  m.historyReleased = [false, false, false, false, false];

  
  //Shortcuts to combine similar mobile and computer events
  m.pressed = m.type === `mousedown` || m.type === `touchstart`;
  if(m.pressed){
    m.stillPressed = true;
  }
  
  m.released = m.type === `mouseup` || m.type === `touchend`;
  if(m.released){
    m.stillPressed = false;   
    //save current and prior three metaEvents of m.released, four deep (or as deep as you like):
    m.historyReleased.unshift(m.released);
    m.historyReleased.pop();    
  }
  
  m.moved = m.type === `mousemove` || m.type === `touchmove`;
  
  m.resized = m.type === `resize` ||
        m.type === `orientationchange` ||
        m.type === `load` ||
        m.type === `DOMContentLoaded`;

  //save current and prior three event types, four deep (or as deep as you like)
  m.historyType = [`noType`,`noType`,`noType`,`noType`];
  m.historyType.unshift(m.type);
  m.historyType.pop();

  //save current and prior three ids of events, four deep (or as deep as you like)
  m.historyId = [`noId`,`noId`,`noId`,`noId`];
  m.historyId.unshift(m.id);
  m.historyId.pop();

  //save current and prior three sources of events, four deep (or as deep as you like)
  m.historySource = [{}, {}, {}, {}];
  m.historySource.unshift(m.source);
  m.historySource.pop();
  
  m.dblPressed = ((released, htbe)=> {
      const goodDelay = (htbe[0] + htbe[1]) >= m.MIN_TIME && (htbe[0] + htbe[1]) <= m.MAX_TIME
      return ( goodDelay && released[0] && released[2] ) 
  })(m.historyReleased, m.historyTimeBetweenEvents)
  
  m.clientX = ((e)=>{
      let x = 0;
      e.changedTouches && e.changedTouches[0]
        ? x = e.changedTouches[0].clientX
        : x = e.clientX
    ;
      return x;
  })( m.eventObject);

  m.clientY = ((e)=>{
      let y = 0;
      e.changedTouches && e.changedTouches[0]
        ? y = e.changedTouches[0].clientY
        : y = e.clientY
      ;
      return y;
  })( m.eventObject);
  /** How about ...
    m.clientY =  m.e.changedTouches && m.e.changedTouches[0]
   ? m.e.changedTouches[0].clientY 
   : m.e.clientY;
  */

  m.MIN_TIME = 25;	//milliseconds
  //m.MAX_TIME = 1100;	//milliseconds
  m.MAX_TIME = 500;	//milliseconds
  

  m.clicked = m.timeBetweenEvents <= m.MAX_TIME &&
              m.timeBetweenEvents >= m.MIN_TIME &&
              m.released;

  //m.startCoordinates = m.startCoordinates || [0,0];
  m.startCoordinates = m.pressed
            ? ( () => [m.clientX, m.clientY] )()
            : m.startCoordinates
  ;
  //et cetera ....
////////////////////////////////////////////////////////////////////////
///////| define data (state variables) particular to this app: |////////
//////////////////////////////////////////////////////////////
  m.showVeil = false;
  
  m.moveCount = 0;
  m.inDblPress = false;
  m.dblPressDelay = 50;
  
  m.timeOfModelSave = 0;
  m.timeBetweenModelSaves = 0;
  m.modelSaveDelay = 10000; //10 seconds between saving model

}

c.updateMetaEvents = (eventObject) => {
  let currentTime = Date.now();
  m.timeBetweenEvents = currentTime - m.eventTime ;//time between prior event and this one
  m.eventTime = currentTime ;

  if(m.firstTime){
    m.timeBetweenEvents = 0;
    m.firstTime = false;
  }

  //record history of time between events
  m.historyTimeBetweenEvents.unshift(m.timeBetweenEvents);
  m.historyTimeBetweenEvents.pop();
    
  m.eventObject = eventObject;    //the event object itself
  m.e = eventObject;				//a conveninet shorthand for eventObject	    
  m.source = eventObject.target;  //where the event occurred
  m.type = eventObject.type;      //what the event was
  m.id = eventObject.target.id;   //the id of the element where the event occurred

  //Shortcuts to combine similar mobile and computer events
  m.pressed = m.type === `mousedown` || m.type === `touchstart`;
  if(m.pressed){
    m.stillPressed = true;
  }
  m.released = m.type === `mouseup` || m.type === `touchend`;
  //save current m.released
  m.historyReleased.unshift(m.released);
  m.historyReleased.pop();

  if(m.released){
    m.stillPressed = false;     
  }
  m.moved = m.type === `mousemove` || m.type === `touchmove`;
  m.resized = m.type === `resize` ||
        m.type === `orientationchange` ||
        m.type === `load` ||
        m.type === `DOMContentLoaded`;

  //save current and prior three event types, four deep (or as deep as you like)
  //m.historyType = [`noType`,`noType`,`noType`,`noType`];
  m.historyType.unshift(m.type);
  m.historyType.pop();

  //save current and prior three sources of events, four deep (or as deep as you like)
  //m.historyId = [`noId`,`noId`,`noId`,`noId`];
  m.historyId.unshift(m.id);
  m.historyId.pop();

  //save current and prior three sources of events, four deep (or as deep as you like)
  //m.historySource = [{}, {}, {}, {}];
  m.historySource.unshift(m.source);
  m.historySource.pop();

  m.dblPressed = ((released, htbe)=> {
      const goodDelay = (htbe[0] + htbe[1]) >= m.MIN_TIME && (htbe[0] + htbe[1]) <= m.MAX_TIME
      return ( goodDelay && released[0] && released[2] )
  })(m.historyReleased, m.historyTimeBetweenEvents)


  m.clientX = ((e)=>{
      let x = 0;
      e.changedTouches && e.changedTouches[0]
        ? x = e.changedTouches[0].clientX
        : x = e.clientX;
      return x;
  })( m.eventObject);

  m.clientY = ((e)=>{
      let y = 0;
      e.changedTouches && e.changedTouches[0]
        ? y = e.changedTouches[0].clientY
        : y = e.clientY;
      return y;
  })( m.eventObject);

  m.MIN_TIME = 25;	//milliseconds
  m.MAX_TIME = 500;	//milliseconds

  m.clicked = m.timeBetweenEvents <= m.MAX_TIME &&
              m.timeBetweenEvents >= m.MIN_TIME &&
              m.released;

  //m.startCoordinates = m.startCoordinates || [0,0];
  m.startCoordinates = m.pressed
            ? ( () => [m.clientX, m.clientY] )()
            : m.startCoordinates
  ; 
};

/////////////////////////////////////////////////////////

window.addEventListener(`load`, c.initialize, true)
//window.addEventListener(`DOMContentLoaded`, c.initialize, true)



