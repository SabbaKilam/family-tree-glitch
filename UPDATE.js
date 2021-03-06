//////////////////////////////////////////////
/*global L*/
/*global m*/
/*global v*/
/*global c*/

c.update = (eventObject) => {

  c.updateModelAndView({
    
    setShowVeil: [m.source === v.infoGlass, m.pressed],
    setHideVeil: [m.source === v.exitVeil, m.pressed],
    setSpinCameo:[m.source.includedInClass(`cameo`), m.dblPressed],   
    
    
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
c.setSpinCameo = (m)=>{
  m.spinCameo = !m.spinCameo
}
c.showSpinCameo = (v)=>{
  if(m.spinCameo){
    m.source.style.transform = `rotateX(360deg)`
  }
  else {
    m.source.style.transform = `rotateX(0deg)`   

  }
}


////////////////////////////////////////////