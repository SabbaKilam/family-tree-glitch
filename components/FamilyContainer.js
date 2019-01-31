class FamilyContainer extends React.Component {
	
	constructor( props ) {
		
		super( props );
		
		this.state = {
			familyInfo: [
				{
					description: "",
					email: "",
					name: "Frank Smith",
					portraitURL: "./images/frank.jpg",
					phone: "",
				},
				{
					description: "",
					email: "",
					name: "Jackie Chan",
					portraitURL: "./images/JackieChan.jpg",
					phone: "",
				},
				{
					description: "",
					email: "",
					name: "Charlize Theron",
					portraitURL:  "./images/CharlizeTheron.jpg",
					phone: "",
				},
				{
					description: "",
					email: "",
					name: "Halley Berry",
					portraitURL: "./images/HalleyBerry.jpg",
					phone: "",
				},				
				{
					description: "",
					email: "",
					name: "Liam Neeson",
					portraitURL: "images/LiamNeesonjpg.jpg",
					phone: "",
				},
        
			],
		}
	}
	
	renderCameos() {
		
		const cameos = [];
		let contact = null;
		
		for( let i=0; i<5; i++ ) {
			
			contact = this.state.familyInfo[i];
			cameos.push(<Cameo contact={contact} key={i} />);
		}
		
		return cameos;
	}
	
	render() {
		return (
			<div>
				{ this.renderCameos() }
			</div>
		)
	}
}