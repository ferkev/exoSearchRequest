import React, {Component} from 'react';


class Comment extends Component{
	constructor(props){
		super(props)
			this.state = {
				comment: "",
				error: ""
			}
	}

	onChangeInput(e){
		const name  = e.target.name 
		const value =  e.target.value

		if(value === ""){
			this.setState({
				error: "le champs est vide"
			})
		}else{
			this.setState({
				error: ""
			})
		}

		this.setState({
			comment: e.target.value
		})

		if( value !== ""){
			this.props.event(value, name)
		}
	}


	render(){

		let obligatoire ="";
		if( this.state.comment === ""){
			obligatoire = this.props.error
		}

		return(
			<div className="place">
				<label>Votre message</label>
				<textarea name="comment" value={this.state.comment} onChange={(e)=>{this.onChangeInput(e)}} placeholder="un petit message pour la team"></textarea>
				<div className="Display_error">
					<p className="error">{this.state.error}</p>
					<span>{obligatoire}</span>
				</div>
			</div>
		)
	}
}

export default Comment;