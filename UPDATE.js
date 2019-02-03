//////////////////////////////////////////////

/*global L*/
/*global m*/
/*global v*/
/*global c*/

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
//-----------------------------------------------//

////////////////////////////////////////////