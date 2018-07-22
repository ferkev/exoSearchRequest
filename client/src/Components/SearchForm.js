import React, {Component} from 'react';

import Place from './FormComponents/Place';
import Surface from './FormComponents/Surface';
import StagesWA from './FormComponents/StagesWA';
import Comment from './FormComponents/Comment';
import Budget from './FormComponents/Budget';

import './SearchForm.css'

// ville => liste
// superficie => number
// budget => number
// nb de pièces => number
// etages sans ascenseur => number
// ta recherche en quelques mots => zone de texte


class SearchForm extends  Component{

	constructor(props){
		super(props)
		this.state = {
			place : "", 
			budget : "", 
			surface: "", 
			stagesWA: "", 
			comment: "",
			image: "",
			error: "",
			send: false
		}
	}

	componentDidMount(){
			const ctx = this;
			fetch('/alert')
			.then(function(response) {

			return response.json();

			}).then(function(data) {
				ctx.setState({
					image: data
			})

			}).catch(function(error) {

			console.log('Request failed', error)
			});
	}

	onSubmit(e){


		if(this.state.place !== "" 
			&& this.state.budget !== "" 
			&& this.state.surface !== "" 
			&& this.state.stagesWA !== "" 
			&& this.state.comment !== ""){



			if( !isNaN(this.state.budget) && !isNaN(this.state.surface) && !isNaN(this.state.stagesWA)){
			
				fetch('/alert',{
					method: 'POST',
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
					body: `place=${this.state.place}&surface=${this.state.surface}&budget=${this.state.budget}&stagesWA=${this.state.stagesWA}&comment=${this.state.comment}`})
				.then(function(response) {

    			return response.json();

				}).then(function(data) {
				
				}).catch(function(error) {
    	
    				console.log('Request failed', error)
				});
				
			}


		}else{
			e.preventDefault()
			this.setState({
				error: 'le champs est obligatoire'
			})
		}

		


	}

	onChangeInput(value, name){
			
			this.setState({
				[name] : value
			})
	}

	render(){

		console.log(this.state.send)
		let image =""
		if(this.state.image){
			image= <img style={{ width: "300px"}} src={this.state.image} alt="cat" />
		}


		return(
			<div className="form">
				<h1>Votre recherche</h1>
				<form onSubmit={(e)=>{this.onSubmit(e)}}>
					<Place event={(value, name)=>{this.onChangeInput(value, name)}} error = {this.state.error}/>
					<Budget  event={(value, name)=>{this.onChangeInput(value, name)}} error = {this.state.error}/>
					<Surface event={(value, name)=>{this.onChangeInput(value, name)}} error = {this.state.error}/>
					<StagesWA event={(value, name)=>{this.onChangeInput(value, name)}} error = {this.state.error}/>
					<Comment event={(value, name)=>{this.onChangeInput(value, name)}} error = {this.state.error}/>
					<button>Créer une alerte</button>
				</form>
				<div style={{ textAlign: "center"}}>
					{image}
				</div>
			</div>
		)
	}



}export default SearchForm;