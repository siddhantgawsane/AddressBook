/*
 * creates a new XMLHttpRequest object which is the backbone of AJAX,
 * or returns false if the browser doesn't support it
 */

window.onload = function(){
	makeRequest();
};

function getXMLHttpRequest() {
  var xmlHttpReq = false;
  // to create XMLHttpRequest object in non-Microsoft browsers
  if (window.XMLHttpRequest) {
    xmlHttpReq = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      // to create XMLHttpRequest object in later versions
      // of Internet Explorer
      xmlHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (exp1) {
      try {
        // to create XMLHttpRequest object in older versions
        // of Internet Explorer
        xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (exp2) {
        xmlHttpReq = false;
      }
    }
  }
  return xmlHttpReq;
}
/*
 * AJAX call starts with this function
 */
function makeRequest() {
  var xmlHttpRequest = getXMLHttpRequest();
  xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
  xmlHttpRequest.open("POST", "getContacts", true);
  xmlHttpRequest.setRequestHeader("Content-Type","application/json");
  xmlHttpRequest.send(null);
}

function sendRequest() {
		var JSONObject = {firstName : document.getElementById('fname').value ,
		                  lastName : document.getElementById('lname').value , 
		                  emailId : document.getElementById('email').value , 
		                  mobileNo : document.getElementById('mobno').value };
		var xmlHttpRequest = getXMLHttpRequest();
		xmlHttpRequest.onreadystatechange = getReadyStateHandler(xmlHttpRequest);
		xmlHttpRequest.open("POST", "addContacts", true);
		xmlHttpRequest.setRequestHeader("Content-Type",
		"application/json");
		JSONObject = JSON.stringify(JSONObject);
		xmlHttpRequest.send(JSONObject);
		alert("Contact "+JSONObject.firstName+" Added Successfully!");
		makeRequest();
	}

/*
 * Returns a function that waits for the state change in XMLHttpRequest
 */
var jsondata = {};
function getReadyStateHandler(xmlHttpRequest) {
 
  // an anonymous function returned
  // it listens to the XMLHttpRequest instance
  return function() {
    if (xmlHttpRequest.readyState == 4) {
      if (xmlHttpRequest.status == 200) {
    	  jsondata=eval("("+xmlHttpRequest.responseText+")");
    	  var rssentries=jsondata.contacts;
     	  var output='<table align="center">';
    	  for(var i=0;i<rssentries.length;i++){
    		  output+='<tr>';
    		  output+='<td>'+rssentries[i].firstName+'</td>';
    		  output+='<td>'+rssentries[i].lastName+'</td>';
    		  output+='<td>'+rssentries[i].mobileNo+'</td>';
    		  output+='<td>'+rssentries[i].emailId+'</td>';
    		  output+='</tr>';
    	  }
    	  output+='</table>';
    	  document.getElementById("contactTable").innerHTML =output;// xmlHttpRequest.responseText;
    	  alert(jsondata);
      } else {
        alert("HTTP error " + xmlHttpRequest.status + ": " + xmlHttpRequest.statusText);
      }
    }
  };
}
var app = angular.module('AngularJSApp',[]);
app.controller("Ctrl", function($scope) {
	  $scope.templates = jsondata;
//	    [ { name: 'template1.html', url: 'https://www.google.co.in/'}
//	    , { name: 'template2.html', url: 'template2.html'} ];
	  $scope.template = $scope.templates[0];
	}
)