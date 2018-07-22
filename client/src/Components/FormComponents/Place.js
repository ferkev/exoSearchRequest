import React, {Component} from 'react';


class Place extends Component{
	constructor(props){
		super(props)
			this.state = {
				place : "",
				data: [],
				error: "",
			}
	}

	onChangeInput(e){

		const value = e.target.value
		const name  = e.target.name 

		this.setState({
			place : e.target.value
		})

		if( value !== ""){

			this.props.event(value, name)
			
		}else{
			this.setState({
				error : "le champs est vide"
			})
		}

		if(value !== ""){
				var ctx = this;
			fetch(`/city?data=${value}`).then(
				function(response) {
					return response.json();
			}).then(function(data){	
				ctx.setState({
					data
				})
			}).catch(function(error) {

				console.log('Request failed', error)
			})
		}else{
			this.setState({
				data: []
			})
		}


	}


	onHandleClick(e, element){
		console.log(element.description)
		this.props.event(element.description, "place")
		this.setState({
			place : element.description,
			data : []
		})

	}


	render(){

		let obligatoire ="";
		if( this.state.place === ""){
			obligatoire = this.props.error
		}

		console.log(this.state.data)

		let city="";
		if( this.state.data.predictions){
			city = this.state.data.predictions.map((element, index)=>{

				return <li onClick= {(e)=>this.onHandleClick(e, element)} key={index}>{element.description}</li>
			})
		}

		return(
			<div className="place">
				<label>Où ?</label>
				<input  name="place" value={this.state.place} type="text"  onChange={(e)=>{this.onChangeInput(e)}} placeholder="Veuillez entrer une ville"/>
				<ul>{city}</ul>
				<div className="Display_error">
					<p className="error">{this.state.error}</p>
					<span>{obligatoire}</span>
				</div>
			</div>
		)
	}
}

export default Place;