import React, {Component} from 'react';


class StagesWA extends Component{

	constructor(props){
		super(props)
			this.state = {
				stagesWA: "",
				error: ""
			}
	}

	onChangeInput(e){
		const name  = e.target.name 
		const value =  e.target.value
		if(isNaN(value)){
			this.setState({
				error: "ce n'est pas un nombre"
			})
		}else{
			this.setState({
				error: ""
			})
		}

		this.setState({
			stagesWA: e.target.value
		})
		if( value !== ""){
			this.props.event(value, name)
		}
	}

	render(){
		let obligatoire ="";
		if( this.state.stagesWA === ""){
			obligatoire = this.props.error
		}

		return(
			<div className="place">
				<label>Etages sans ascenseur</label>
				<input name="stagesWA" value={this.state.stagesWA}  type="text" onChange={(e)=>{this.onChangeInput(e)}} placeholder="Faites votre choix"/>
				<div className="Display_error">
					<p className="error">{this.state.error}</p>
					<span>{obligatoire}</span>
				</div>
			</div>
		)
	}
}

export default StagesWA;