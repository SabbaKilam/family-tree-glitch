/*global React*/
class Cameo extends React.Component{
	constructor( props ) {		
		super( props );
		this.state = {
		  normalSize: "7rem",
		  isSelected: false,
		  percentViewport: 18,
		  nameHolder: document.querySelector('#nickName'),
		  infoHolder: document.querySelector('#infoHolder'),
		  infoHolderCameo: document.querySelector("#infoHolderCameo"),
		  infoHolderInfo: document.querySelector("#infoHolderInfo")
		  
		  //id="infoHolderCameo"
		};
		
		this.enlargeCameo = this.enlargeCameo.bind(this);
		this.restoreCameoSize = this.restoreCameoSize.bind(this);
	}
	////////////////////////////////////////////////////////////////////
  enlargeCameo(eventObject){
	//let image = "../" + this.props.info.portraitURL.slice(2);
	let image = this.props.info.portraitURL.slice(2);
	let cameo = this.state.infoHolderCameo;
	let infoHolderInfo = this.state.infoHolderInfo;

	this.state.nameHolder.innerText = this.props.name;
	//infoHolder.innerText = this.props.info.name;
	cameo.style.background = `url(${image}) no-repeat center`;
	cameo.style.backgroundSize = "cover";	
	infoHolderInfo.innerText = `${this.props.info.name}\n${this.props.info.nickName ? this.props.info.nickName : ""}\n${this.props.info.email}`;	
	
	// no-repeat center
	//alert(this.props.info.name);
	
    clearInterval(this.state.timerId);
    const source = eventObject.target;
      const viewportUnit = window.innerWidth >= window.innerHeight ?
                            "vh"
                          : "vw" 
      ;
    //alert(eventObject.target.id)
    source.style.height = `${this.state.percentViewport}${viewportUnit}`;
    source.style.width = `${this.state.percentViewport}${viewportUnit}`;
    this.setState({
      isSelected: true,
     });
    this.setState({
      timerId: (
      		setInterval(()=>{
            if ( this.state.isSelected ){
                const viewportUnit = window.innerWidth >= window.innerHeight ?
                            "vw"
                          : "vh"
            	;
                source.style.height = `${this.state.percentViewport}${viewportUnit}`;
                source.style.width = `${this.state.percentViewport}${viewportUnit}`;            
            }
            else if ( !this.state.isSelected ){
              source.style.height = this.state.normalSize;
              source.style.width = this.state.normalSize ;             
              this.setState({
                isSelected: false
              });
            }
          }, 10) 
      )
    });
  
  }
  ///////////////////////////////////////////////////////////////////////
  restoreCameoSize(eventObject){
    
	this.state.nameHolder.innerText = "Family Tree";
    const source = eventObject.target;
    
    //alert(eventObject.target.id)
    source.style.height = this.state.normalSize;
    source.style.width = this.state.normalSize;
    this.setState({
      isSelected: false
    });    
  }
  
//==========================| RENDER |=========================//
	render() {
		
		let name = this.props.info.nickName ? this.props.info.nickName : this.props.info.name ;
		let portraitURL = this.props.info.portraitURL;
		let style = {
			background: `url('${portraitURL}') no-repeat center`,
			backgroundSize: `contain`,
			backgroundColor: `lightblue`,
			borderRadius:'50%',
		};
		
		let nameStyle = {
			background: "rgba(0, 0, 0, 0.5)",
			color: "white",
			bottom: "-11rem",
			position: "relative",
			width:'100%',			
		};
		
		/**
		 * If the bubble is selected then make the size larger and center it.
		 *				onMouseEnter={this.enlargeCameo}  
		 */

		return(
			<div 
				className="cameo" 	
				style={style}
				name={name}
				id={this.props.id}				
				onClick={this.enlargeCameo}
				onMouseLeave={this.restoreCameoSize} 
			/>   
			
		)
	}
}