/*global React*/
class Cameo extends React.Component{
  constructor( props ) {		
		super( props );
    this.state = {
      normalSize: "7rem",
      isSelected: false,
      percentViewport: 30
    }
    
    this.enlargeCameo = this.enlargeCameo.bind(this);
    this.restoreCameoSize = this.restoreCameoSize.bind(this);    
    
	}
	////////////////////////////////////////////////////////////////////
  enlargeCameo(eventObject){


    clearInterval(this.state.timerId)
    const source = eventObject.target;
      const viewportUnit = window.innerWidth >= window.innerHeight ?
                            "vw"
                          : "vh"        
    //alert(eventObject.target.id)
    source.style.height = `${this.state.percentViewport}${viewportUnit}`
    source.style.width = `${this.state.percentViewport}${viewportUnit}`
    this.setState({
      isSelected: true,
     })
    this.setState({
      timerId: (
      		setInterval(()=>{
            if ( this.state.isSelected ){
                const viewportUnit = window.innerWidth >= window.innerHeight ?
                            "vw"
                          : "vh"  
                source.style.height = `${this.state.percentViewport}${viewportUnit}`
                source.style.width = `${this.state.percentViewport}${viewportUnit}`            
            }
            else if ( !this.state.isSelected ){
              source.style.height = this.state.normalSize
              source.style.width = this.state.normalSize              
              this.setState({
                isSelected: false
              })
            }
          }, 10) 
      )
    })
  
  }
  ///////////////////////////////////////////////////////////////////////
  restoreCameoSize(eventObject){
    
    if (this.state.wasClicked){return}
    const source = eventObject.target;
    
    //alert(eventObject.target.id)
    source.style.height = this.state.normalSize
    source.style.width = this.state.normalSize
    this.setState({
      isSelected: false
    })    
  }
  
//==========================| RENDER |=========================//
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