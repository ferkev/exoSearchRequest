const express = require('express');
const router = express.Router();
const request = require('request');
const xml = require("xml-parse");


/* GET home page. */

let secure = false

router.get('/city', function(req, res, next) {
	const input = req.query.data

  request(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:fr&key=AIzaSyA1A2lfTmUHq2k6T5KhdLJoypcXWOrkbTQ`,
  	function(err, response, body){
		 const data = JSON.parse(body);
		 res.json(data)
	})
});

router.post('/alert' , function(req, res, next){
	var place = req.body.place;
	var surface = req.body.surface;
	var budget = req.body.budget;
	var stagesWA = req.body.stagesWA;
	var comment = req.body.comment;

	console.log(place, surface, budget, stagesWA, comment)
	secure = true


})




router.get('/alert', function(req, res, next){
	console.log(secure)
	if( secure == true){
		request('http://thecatapi.com/api/images/get?format=xml&results_per_page=1', function(err,response, body){
	  		const xmlDoc = new xml.DOM(xml.parse(body))
	  		const image = xmlDoc.document.getElementsByTagName("url");
	
			secure = false
	  		res.json(image[0].childNodes[0].text)
	  	})
	}
})

module.exports = router;
