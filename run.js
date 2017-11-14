const XMLHttpRequest = require('XMLHttpRequest').XMLHttpRequest

var xmlHttp = new XMLHttpRequest()
xmlHttp.open( "GET", "https://kmp-api.herokuapp.com/run", false )
xmlHttp.send( null )
console.log(xmlHttp.responseText)
