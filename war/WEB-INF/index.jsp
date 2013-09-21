<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Getting Started with AJAX using JAVA</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <script src="http://code.angularjs.org/1.2.0-rc.2/angular.min.js"></script>
<script src="http://code.angularjs.org/1.2.0-rc.2/angular-animate.min.js"></script>
<script src="resources/js/ajax.js"></script>
</head>
<body>
	<h1 align="center">You have reached Siddhant's Address Book</h1>
  <div id="contactTable"></div>
  

<h3 align="center">Add Contact</h3>
<h4 align="center">Please feel free to add yourself!</h4>
	<form id="contactDetails" action="" method="get">
		<table align="center">
			<tr>
				<td>First Name :</td>
				<td><input type="text" style="width: 185px;" maxlength="30"
					name="fname" id="fname" /></td>
			</tr>
			<tr>
				<td>Last Name :</td>
				<td><input type="text" style="width: 185px;" maxlength="30"
					name="lname" id="lname" /></td>
			</tr>
			<tr>
				<td>Email Id :</td>
				<td><input type="text" style="width: 185px;" maxlength="30"
					name="email" id="email" /></td>
			</tr>
			<tr>
				<td>Mobile Number :</td>
				<td><input type="text" style="width: 185px;" maxlength="30"
					name="mobno" id="mobno" /></td>
			</tr>
		</table>
		<div align="center"><input value="Save" type="button" onclick="sendRequest()"/></div>
	</form>
	
	<div ng-app='AngularJSApp' ng-controller="Ctrl">
      <select ng-model="template" ng-options="t.name for t in templates">
       <option value="">(blank)</option>
      </select>
      url of the template: <tt>{{template.url}}</tt>
      <hr/>
      <div class="example-animate-container">
        <div class="include-example" ng-include="template.url"></div>
      </div>
    </div>
 
</body>
</html>