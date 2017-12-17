var keys = require("./keys.js");

var twitterConsumerKey = keys.twitter.consumer_key;
var twitterConsumerSecret = keys.twitter.consumer_secret;
var twitterAccessTokenKey = keys.twitter.access_token_key;
var twitterAccessTokenSecret = keys.twitter.access_token_secret;
var twitterBearerToken = keys.twitter.bearer_token;
var spotifyClientId = keys.spotify.clientId;
var spotifyClientSecret = keys.spotify.clientSecret;
//arguments
var operand = process.argv[2];
var param1 = process.argv[3];
var param2 = process.argv[4];

function liri(){

//twitter
if (operand === 'my-tweets') {
    //request info from twitter
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: twitterConsumerKey,
        consumer_secret: twitterConsumerSecret,
        bearer_token: twitterBearerToken,
    });

    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) {
            //	console.log(error);
        }
        console.log(tweets); // The favorites. 
        // console.log(response);  // Raw response object. 
    });




} else if (operand === 'spotify-this-song') {
    //request info from spotify
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: spotifyClientId ,
        secret: spotifyClientSecret
    });

    spotify.search({ type: 'track', query: param1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 else{
//console.log(data.tracks.items[0]); 
//artist
console.log("Artist: "+data.tracks.items[0].artists[0].name); 
//song name
console.log("Song name: "+data.tracks.items[0].name); 
//preview link
console.log("Preview this song: "+data.tracks.items[0].external_urls.spotify); 
//album name
console.log("Album: "+data.tracks.items[0].album.name);

}
});

} else if (operand === 'movie-this') {
    //request info from omdb

    var request = require("request");
    request("http://www.omdbapi.com/?t=" + param1 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        console.log(body);
    })

}

} //ends function
 else if (operand === 'do-what-it-says') {
    //read random.txt
    var fs = require("fs");
    fs.readFile("../random.txt", "utf8", function(error, data){
    	if(error){
    		console.log(error)
    	}
    	else{
    		var splitData = data.split(",");
    		console.log(splitData);
    		param1=splitData[0];
    		param2=splitData[1];
    		
    	}
    })
    //put 
} 

