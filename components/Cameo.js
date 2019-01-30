class Cameo extends React.Component{
	
	constructor( props ) {
		
		super( props );
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
			  
			<div className="cameo" style={style}>
				<p style={nameStyle}>{name}</p>
			</div>
		)
	}
}