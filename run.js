const fetch = require('fetch').fetchURL

fetchUrl("https://kmp-api.herokuapp.com/run", function(error, meta, body){
    console.log(body.toString());
});
