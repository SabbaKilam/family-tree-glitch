/*global React*/
/*global L*/
L.noPinchZoom();
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
					email: "Alexandra@aoc.me",
					name: "Alexandra Ocasio-Cortez",
					nickName: '" Trumps\'s Nightmare "',					
					portraitURL: "./images/aoc.png",
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
						
				
        
			],
		}

	}
  
  assignRandomLocation(){
    
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