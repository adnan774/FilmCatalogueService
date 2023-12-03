// Get the browser-specific request object, either for
// Firefox, Safari, Opera, Mozilla, Netscape, or IE 7 (top entry);
// or for Internet Explorer 5 and 6 (bottom entry). 

function getRequestObject() {
  if (window.XMLHttpRequest) {
    return(new XMLHttpRequest());
  } else if (window.ActiveXObject) { 
    return(new ActiveXObject("Microsoft.XMLHTTP"));
  } else {
    return(null); 
  }
}

// Insert the html data into the element 
// that has the specified id.

function htmlInsert(id, htmlData) {
  document.getElementById(id).innerHTML = htmlData;
}

// Return escaped value of textfield that has given id.
// The builtin "escape" function url-encodes characters.

function getValue(id) {
  return(escape(document.getElementById(id).value));
}

function ajaxGet(address, format, responseHandler) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("GET", address, true);
  request.setRequestHeader("Accept", 
                           format);
  request.send(null);
}

function ajaxPost(address, format, responseHandler, body) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("POST", address, true);
  request.setRequestHeader("Content-Type", 
                           format);
  request.send(body);
}

function ajaxPut(address, format, responseHandler, body) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("PUT", address, true);
  request.setRequestHeader("Content-Type", 
                           format);
  request.send(body);
}

function ajaxDelete(address, format, responseHandler, body) {
  var request = getRequestObject();
  request.onreadystatechange = 
    function() { responseHandler(request); };
  request.open("DELETE", address, true);
  request.setRequestHeader("Content-Type", 
                           format);
  request.send(body);
}

// Given an element, returns the body content.

function getBodyContent(element) {
  element.normalize();
  return(element.childNodes[0].nodeValue);
}

// Given a doc and the name of an XML element, returns an 
// array of the values of all elements with that name.
// E.g., for 
//   <foo><a>one</a><q>two</q><a>three</a></foo>
// getXmlValues(doc, "a") would return 
//   ["one", "three"].

function getXmlValues(xmlDocument, xmlElementName) {
  var elementArray = 
     xmlDocument.getElementsByTagName(xmlElementName);
  var valueArray = new Array();
  for(var i=0; i<elementArray.length; i++) {
     valueArray[i] = getBodyContent(elementArray[i]);
  }
  return(valueArray);
}

function postXmlValues() {
 
  title = document.getElementById("title").value;
  year = document.getElementById("year").value;
  director = document.getElementById("director").value;
  stars = document.getElementById("stars").value;
  review = document.getElementById("review").value;
  
  var body = '<film><title>'+title+'</title><year>'+year+'</year><director>'+director+'</director><stars>'+stars+'</stars><review>'+review+'</review></film>'
  return body;
}

function postJsonValues() {
  
  title = document.getElementById("title").value;
  year = document.getElementById("year").value;
  director = document.getElementById("director").value;
  stars = document.getElementById("stars").value;
  review = document.getElementById("review").value;
  
 var body = '{"title":"'+title+'", "year":"'+year+'", "director":"'+director+'", "stars":"'+stars+'", "review":"'+review+'"}'
 
 return body;
}

function postStringValues() {
	
  title = document.getElementById("title").value;
  year = document.getElementById("year").value;
  director = document.getElementById("director").value;
  stars = document.getElementById("stars").value;
  review = document.getElementById("review").value;
  
  var body = title+'#'+year+'#'+director+'#'+stars+'#'+review
  
  return body; 
}

function putXmlValues() {
 	
  id = document.getElementById("uId").value;
  title = document.getElementById("uTitle").value;
  year = document.getElementById("uYear").value;
  director = document.getElementById("uDirector").value;
  stars = document.getElementById("uStars").value;
  review = document.getElementById("uReview").value;
  
  var body = '<film><id>'+id+'</id><title>'+title+'</title><year>'+year+'</year><director>'+director+'</director><stars>'+stars+'</stars><review>'+review+'</review></film>'
  return body;
}

function putJsonValues() {
  
  id = document.getElementById("uId").value;
  title = document.getElementById("uTitle").value;
  year = document.getElementById("uYear").value;
  director = document.getElementById("uDirector").value;
  stars = document.getElementById("uStars").value;
  review = document.getElementById("uReview").value;
  
  var body = '{"id":"'+id+'", "title":"'+title+'", "year":"'+year+'", "director":"'+director+'", "stars":"'+stars+'", "review":"'+review+'"}'
  
 return body;
}

function putStringValues() {

  id = document.getElementById("uId").value;
  title = document.getElementById("uTitle").value;
  year = document.getElementById("uYear").value;
  director = document.getElementById("uDirector").value;
  stars = document.getElementById("uStars").value;
  review = document.getElementById("uReview").value;
  
  var body = id+'#'+title+'#'+year+'#'+director+'#'+stars+'#'+review
  
  return body; 
}

function deleteXmlValues() {
 	
  id = document.getElementById("dId").value;
  var body = '<film><id>'+id+'</id></film>'
  
  return body;
}

function deleteJsonValues() {
  
  id = document.getElementById("dId").value;
  var body = '{id:'+id+'}'
 
 return body;
}

function deleteStringValues() {

  id = document.getElementById("dId").value;  
  var body = id
  
  return body; 
}

// Given an element object and an array of sub-element names,
// returns an array of the values of the sub-elements.
// E.g., for <foo><a>one</a><c>two</c><b>three</b></foo>,
// if the element points at foo,
// getElementValues(element, ["a", "b", "c"]) would return
// ["one", "three", "two"]

function getElementValues(element, subElementNames) {
  var values = new Array(subElementNames.length);
  for(var i=0; i<subElementNames.length; i++) {
    var name = subElementNames[i];
    var subElement = element.getElementsByTagName(name)[0];
    values[i] = getBodyContent(subElement);
  }
  return(values);
}

function updateFormModal(i) {
	modal = document.getElementById('updateModal');
	
	//console.log(i);
	
	
	var elements = document.getElementsByClassName(i);
	
	//do for loop (rows.length) ierate to get each value
	for(var i=0; i<elements.length; i++) {
		//console.log(elements[i]);
		//console.log(elements[0]);
		document.getElementById('uId').value = elements[0].innerHTML;
		document.getElementById('uTitle').value = elements[1].innerHTML;
		document.getElementById('uYear').value = elements[2].innerHTML;
		document.getElementById('uDirector').value = elements[3].innerHTML;
		document.getElementById('uStars').value = elements[4].innerHTML;
		document.getElementById('uReview').value = elements[5].innerHTML;		
		
	}
  	
}

function deleteFormModal(i) {
	modal = document.getElementById('deleteModal');
	
	
	console.log(i);
	
	id = document.getElementById("dId").value = i;
	
}



// Takes as input an array of headings (to go into th elements)
// and an array-of-arrays of rows (to go into td
// elements). Builds an xhtml table from the data.

function getTable(rows) {
  var table = "<table id='table' border='1' class='table-primary table table-striped table-hover border-primary'>\n" +
  				"<thead><tr><th scope='col'>ID</th><th scope='col'>Title</th><th scope='col'>Year</th><th scope='col'>Director</th><th scope='col'>Stars</th><th scope='col'>Review</th><th scope='col'>Edit</th><th scope='col'>Delete</th></tr></thead>" 
              + getTableBody(rows) +
              "</table>";
  return(table);
}


function getTableBody(rows) {
  var body = "";
  for(var i=0; i<rows.length; i++) {
    body += "<tr class='table-secondary'>";
    var row = rows[i];
    for(var j=0; j<row.length; j++) {
      body += "<td class="+row[0]+">" + row[j] + "</td>";
    }
    
    body += "<td><button class='btn btn-light' data-bs-toggle='modal' data-bs-target='#updateModal' onClick='updateFormModal("+row[0]+")'><img src='images/icons8-pencil-16.png' alt='edit button'/></button></td>";
    body += "<td><button class='btn btn-light' data-bs-toggle='modal' data-bs-target='#deleteModal' onClick='deleteFormModal("+row[0]+")'><img src='images/icons8-remove-16.png' alt='delete button'/></button></td>";
    body += "</tr>\n";
  }
  return(body);
}