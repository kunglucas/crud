/*
Core file to handle all actions on the crud application.
*/
var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

	response.render("sample_data", {title:'Enter login credentials', action:'list'});

});

router.get("/LoggedIn", function(request, response, next){

	var query = "SELECT * FROM sample_data ORDER BY id ASC";

	database.query(query, function(error, data){

		if(error)
		{
			throw error; 
		}
		else
		{
			response.render('sample_data', {title:'Kenneth & Lucas CRUD application', action:'LoggedIn', sampleData:data});
		}

	});

});

router.get("/add", function(request, response, next){

	response.render("sample_data", {title:'Register account with us', action:'add'});

});

router.post("/add_sample_data", function(request, response, next){

	var first_name = request.body.first_name;

	var last_name = request.body.last_name;

	var email = request.body.email;

	var password = request.body.password;

	var query = `
	INSERT INTO sample_data 
	(first_name, last_name, password, email) 
	VALUES ("${first_name}", "${last_name}", "${password}", "${email}")
	`;

	database.query(query, function(error, data){

		if(error)
		{
			throw error;
		}	
		else
		{
			response.redirect("/sample_data/LoggedIn");
		}

	});

});

module.exports = router;