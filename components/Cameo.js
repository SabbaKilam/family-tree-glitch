/*global React*/
class Cameo extends React.Component{
  constructor( props ) {		
		super( props );
    this.state = {
      normalSize: "7rem",
      isSelected: false
    }
    
    this.enlargeCameo = this.enlargeCameo.bind(this);
    this.restoreCameoSize = this.restoreCameoSize.bind(this);
    
	}
	
  enlargeCameo(eventObject){
    const source = eventObject.target;
      const viewportUnit = window.innerWidth >= window.innerHeight ?
                            "vw"
                          : "vh"
        
    //alert(eventObject.target.id)
    source.style.height = `20${viewportUnit}`
    source.style.width = `20${viewportUnit}` 
    
    setSelected(source)
    //================| helper function(s) |==================//
    function setSelected(){
      //de-select all cameos
      document.querySelectorAll(`.cameo`).forEach(cameo => {
        
      })
    }
    
  }
  restoreCameoSize(eventObject){
    const source = eventObject.target;
    //alert(eventObject.target.id)
    source.style.height = this.state.normalSize
    source.style.width = this.state.normalSize
  }  
	render() {
		
		let name = this.props.contact.name;
		let portraitURL = this.props.contact.portraitURL;
		let style = {
			background: `url('${portraitURL}') no-repeat center`,
			backgroundSize: `contain`,
			backgroundColor: `lightblue`,
			borderRadius:'50%',
		}
		
		let nameStyle = {
			background: "rgba(0, 0, 0, 0.5)",
			color: "white",
			bottom: "-11rem",
			position: "relative",
			width:'100%',
			
		}
		
		/**
		 * If the bubble is selected then make the size larger and center it.
		 */
		
		if( true ) {
			
			//Size it boiiiiii.
		}
		
		return(
			  
			<div className="cameo" 
        style={style} 
        onMouseEnter={this.enlargeCameo}
        onMouseLeave={this.restoreCameoSize}
        
        id={this.props.id}>
				<p style={nameStyle}></p>
			</div>
		)
	}
}