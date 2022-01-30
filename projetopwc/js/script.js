'use strict';

let path = window.location.pathname;
let page = path.split("/").pop();

if(page == "" || page == "index.html")
{
	$('#favoritos').removeClass("active");
	$('#home').addClass("active");
}
else
{
	$('#home').removeClass("active");
	$('#favoritos').addClass("active");	
}

