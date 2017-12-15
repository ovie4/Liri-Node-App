var keys = require("./keys.js");
console.log(keys);
var twitterConsumerKey = keys.twitter.consumer_key;
var twitterConsumerSecret = keys.twitter.consumer_secret;
var operand = process.argv[2];
var param1 = process.argv[3];
var param2 = process.argv[4];

var request=require("request");


if(operand==='my-tweets'){
	//request info from twitter
	var twitterAPI = require('node-twitter-api');
	var twitter = new twitterAPI({
    consumerKey: twitterConsumerKey,
    consumerSecret: twitterConsumerSecret,
    callback: 'http://yoururl.tld/something'
});

	twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    console.log(results);
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } 
    else {
        console.log(requestToken);
        console.log(requestTokenSecret);
    }
});




}
else if(operand==='spotify-this-song'){
	//request info from spotify

}

else if(operand==='movie-this'){
	//request info from omdb
	
	
	request("http://www.omdbapi.com/?t="+param1+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
		console.log(body);
	})

}

else if(operand==='do-what-it-says'){

	//read random.txt
	//put 
}