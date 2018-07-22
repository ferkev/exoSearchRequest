import React, {Component} from 'react';


class Surface extends Component{

	constructor(props){
		super(props)
			this.state = {
				PiecesNumber: "",
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
			PiecesNumber : e.target.value
		})
		if( value !== ""){
			this.props.event(value, name)
		}
	}


	render(){
		console.log(this.state.surface)
		let obligatoire = "";
		if( this.state.PiecesNumber === ""){
			obligatoire = this.props.error
		}

		return(
			<div className="place">
				<label>Surface minimun</label>
				<input name="surface" value={this.state.surfaceMin} type="text" onChange={(e)=>{this.onChangeInput(e)}} placeholder="Veuillez entrer la surface souhaitée"/>
				<div className="Display_error">
					<p className="error">{this.state.error}</p>
					<span>{obligatoire}</span>
				</div>
			</div>
		)
	}
}

export default Surface;