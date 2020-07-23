// Sub for handling errors
exports.errorhandle = function(errormsg, errorname, cmd, authorid) {
	var date = new Date();
	var datecurr = date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate() + " " + date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds()
	return "An Error Occurred, please visit https://bit.ly/2EcEqGr and create an new issue with the following as a log: ```\nDate (ISO 8601 UTC): " + datecurr + "\nFull Command Variable: " + cmd + "\nMessage Author ID: " + authorid + "\nError Name: " + errorname + "\nError Message: " + errormsg + "```";
}