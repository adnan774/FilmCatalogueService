
document.addEventListener("DOMContentLoaded", function(){
	filmTable("data-type-1", "film-table");
});

function filmTable(formatField, resultRegion) {
	var address = "FilmsAPIController";
	var format = getValue(formatField);
	var responseHandler = filmFindHandler(format);
	console.log(format);
	
	ajaxGet(address, format,
		function(request) {
			responseHandler(request, resultRegion);
		});

}

function searchTable(formatField, resultRegion) {
	var format = getValue(formatField);
	var option = document.getElementById('search-type').value;
	var searchInput = document.getElementById('search-input').value; 
	var address = "FilmsAPIController?search-type="+option+"&search-input="+searchInput;
	
	console.log(option);
	console.log(searchInput);
	var responseHandler = filmFindHandler(format);
	ajaxGet(address, format,
		function(request) {
			responseHandler(request, resultRegion)
		});
	
}

function postFilmTable(formatField, resultRegion) {
	var address = "FilmsAPIController";
	var format = getValue(formatField);
	console.log(format);
	var responseHandler = postHandler(format);
	if (format == "application/xml") {
		var body = postXmlValues();
	} else if (format == "application/json") {
		var body = postJsonValues();
	} else {
		var body = postStringValues();
	}

	ajaxPost(address, format,
		function(request) {
			responseHandler(request, resultRegion);
		}, body);

}

function putFilmTable(formatField, resultRegion) {
	var address = "FilmsAPIController";
	var format = getValue(formatField);
	console.log(format);
	var responseHandler = putHandler(format);
	if (format == "application/xml") {
		var body = putXmlValues();
	} else if (format == "application/json") {
		var body = putJsonValues();
	} else {
		var body = putStringValues();
	}
	ajaxPut(address, format,
		function(request) {
			responseHandler(request, resultRegion);
		}, body);

}

function deleteFilmTable(formatField, resultRegion) {
	var address = "FilmsAPIController";
	var format = getValue(formatField);
	console.log(format);
	var responseHandler = deleteHandler(format);
	if (format == "application/xml") {
		var body = deleteXmlValues();
	} else if (format == "application/json") {
		var body = deleteJsonValues();
	} else {
		var body = deleteStringValues();
	}
	ajaxDelete(address, format,
		function(request) {
			responseHandler(request, resultRegion);
		}, body);

}

function xmlFilmTable(inputField, resultRegion) {
	var address = "FilmsAPIController";
	var data = "application/xml";
	ajaxGet(address, data,
		function(request) {
			showXmlFilmInfo(request, resultRegion);
		});
}


function showXmlFilmInfo(request, resultRegion) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		var xmlDocument = request.responseXML;
		var films = xmlDocument.getElementsByTagName("film");
		var rows = new Array(films.length);
		var subElementNames = ["id", "title", "year", "director", "stars", "review",];

		for (var i = 0; i < films.length; i++) {
			rows[i] =
				getElementValues(films[i], subElementNames);
		}

		var table = getTable(rows);
		htmlInsert(resultRegion, table);
	}
}

function jsonFilmTable(inputField, resultRegion) {
	var address = "FilmsAPIController";
	var data = "application/json";
	ajaxPost(address, data,
		function(request) {
			showJsonFilmInfo(request, resultRegion);
		});
}

function showJsonFilmInfo(request, resultRegion) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		var rawData = JSON.parse(request.responseText);
		var rows = new Array(rawData.length);

		for (var i in rawData) {
			var values = new Array(rawData[i].length)

			values[0] = rawData[i].id;
			values[1] = rawData[i].title;
			values[2] = rawData[i].year;
			values[3] = rawData[i].director;
			values[4] = rawData[i].stars;
			values[5] = rawData[i].review;
			rows[i] = values;
		}
	}
	var table = getTable(rows);
	htmlInsert(resultRegion, table);
}


function stringFilmTable(inputField, resultRegion) {
	var address = "FilmsAPIController";
	var data = "text/plain";
	ajaxPost(address, data,
		function(request) {
			showStringFilmInfo(request, resultRegion);
		});
}

function showStringFilmInfo(request, resultRegion) {
	if ((request.readyState == 4) &&
		(request.status == 200)) {
		var rawData = request.responseText;
		var rowStrings = rawData.split(/[$]+/);
		var rows = new Array(rowStrings.length - 1);

		for (var i = 1; i < rowStrings.length; i++) {
			rows[i - 1] = rowStrings[i].split("#");
		}
		var table = getTable(rows);
		htmlInsert(resultRegion, table);
	}
}
// Reminder: unlike in Java, in JavaScript it is OK to 
// use == to compare strings.

function filmFindHandler(format) {
	if (format == "application/xml") {
		return (showXmlFilmInfo);
	} else if (format == "application/json") {
		return (showJsonFilmInfo);
	} else {
		return (showStringFilmInfo);
	}
}

function postHandler(format) {
	if (format == "application/xml") {
		return (postXmlValues);
	} else if (format == "application/json") {
		return (postJsonValues);
	} else {
		return (postStringValues);
	}
}

function putHandler(format) {
	if (format == "application/xml") {
		return (putXmlValues);
	} else if (format == "application/json") {
		return (putJsonValues);
	} else {
		return (putStringValues);
	}
}

function deleteHandler(format) {
	if (format == "application/xml") {
		return (putXmlValues);
	} else if (format == "application/json") {
		return (putJsonValues);
	} else {
		return (putStringValues);
	}
}