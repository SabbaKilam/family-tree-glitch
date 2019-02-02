/*global React*/
/*global L*/
/*global m*/
/*global v*/
/*global c*/

L.noPinchZoom();
/////////////////////////////////////////////////////////
class FamilyContainer extends React.Component {
	
	constructor( props ) {
		
		super( props );
		
		this.state = {
			familyInfo: [
				{
					description: "",
					email: "Frank@FS.me",
					name: "Frank Sinatra",
					nickName: ' " Chairman of the Board " ',
					portraitURL: "./images/frank.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "Jackie@JC.me",
					name: "Jackie Chan",
					nickName: '" Bruce Lee Jr. "',					
					portraitURL: "./images/JackieChan.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "Charlize@CT.me",
					name: "Charlize Theron",
					nickName: null,					
					portraitURL:  "./images/CharlizeTheron.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "Halley@HB.me",
					name: "Halley Berry",
					nickName: null,					
					portraitURL: "./images/HalleyBerry.jpg",
        			screenLocation: 5,          
					phone: "",
				},				
				{
					description: "",
					email: "Liam@LN.me",
					name: "Liam Neeson",
					nickName: ' " The Kraken Master " ',					
					portraitURL: "./images/LiamNeesonjpg.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				//////////////////////////////////////////////////////////
				{
					description: "",
					email: "Denzel@DW.me",
					name: "Denzel Washington",
					nickName: ' " Man on Fire " ',
					portraitURL: "./images/Denzel.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "Alexandria@aoc.me",
					name: "Alexandria Ocasio-Cortez",
					nickName: '" Fresh New Democrat "',					
					portraitURL: "./images/aoc.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "Lucy@LL.me",
					name: "Lucy Liu",
					nickName: null,					
					portraitURL:  "./images/lucyliu.jpg",
        	screenLocation: 5,          
					phone: "",
				},
				{
					description: "",
					email: "inuit@IM.me",
					name: "Inuit Man",
					nickName: null,					
					portraitURL: "./images/inuitman.jpg",
        	screenLocation: 5,          
					phone: "",
				},				
				{
					description: "",
					email: "OOO@OOO.me",
					name: "Oyinade Onyikansola Omotosho",
					nickName: ' " Nigerian Super Model " ',					
					portraitURL: "./images/ooo.jpg",
        	screenLocation: 5,          
					phone: "",
				},				
				//////////////////////////////////////////////////////////
			],
		}
	}
  
  renderCameos() {
		//		let name = this.props.info.nickName ? this.props.info.nickName : this.props.info.name ;
		const cameos = [];
		let info = null;
		let name = null;
		let maxCount = this.state.familyInfo.length
		for( let i = 0; i < maxCount; i++ ) {
			info = this.state.familyInfo[i];
			name = info.nickName ? info.nickName : info.name;
			cameos.push( <Cameo info={info} key={i} id={"i" + i} name={name}/> );
		}
		
		return cameos;
	}
	render() {
		return (
			<div id="familyContainer">
				{ this.renderCameos() }
			</div>
		)
	}
}

/*=============================================================================*/
/*========================| non-react vanilla JS code: |=======================*/
/*=============================================================================*/

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
c.update = (eventObject) => {
  //update meat events
  c.updateMetaEvents(eventObject)
  
  //update model and view
  c.updateModelAndView({
    setShowVeil: [m.source === v.veil, m.pressed],
    
  
  })
}
///////////////////////////////////////////////////////
c.setHideVeil = (m)=>{}
c.showHideVeil = (v)=>{
  v.veil.css("visibility: hidden; opacity: 0")
}
//-----------------------------------------------//
c.setShowVeil = (m)=>{}
c.showShowVeil = (v)=>{
  v.veil.css("visibility: visible; opacity: 1")
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
  m.moveCount = 0;
  m.inDblPress = false;
  m.dblPressDelay = 50;
  
  m.timeOfModelSave = 0;
  m.timeBetweenModelSaves = 0;
  m.modelSaveDelay = 10000; //10 seconds between saving model
  
  m.dayTheme = false;
  m.busyChangingThemes = false;

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

c.updateModelAndView = (handlerQualifiers) => {
  L.runQualifiedHandlers(handlerQualifiers, m, v, c)
}
/////////////////////////////////////////////////////////
/*
//hide the veil
v.exitVeil.onclick = function(eventObject){
  v.veil.css("visibility: hidden; opacity: 0")
}

//make veil visible
v.infoGlass.onclick = function(eventObject){
  v.veil.css("visibility: visible; opacity: 1")
}
*/
window.addEventListener(`load`, c.initialize, true)


