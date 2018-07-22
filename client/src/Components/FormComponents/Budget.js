import React, {Component} from 'react';


class Budget extends Component{
	constructor(props){
		super(props)
			this.state = {
				budget: "",
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
			budget : e.target.value
		})
		
		if( value !== ""){
			this.props.event(value, name)
		}
	}


	render(){

		let obligatoire ="";
		if( this.state.budget === ""){
			obligatoire = this.props.error
		}

		return(
			<div className="place">
				<label>Loyer max</label>
				<input name="budget" value={this.state.budget} type="text" onChange={(e)=>{this.onChangeInput(e)}} placeholder="Veuillez entrer un budget"/>
				<div className="Display_error">
					<p className="error">{this.state.error}</p>
					<span>{obligatoire}</span>
				</div>
			</div>
		)
	}
}

export default Budget;