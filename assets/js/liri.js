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
var movieName = "";
var songName = "";

function writeLog(output) {
    var fs = require("fs");
    fs.appendFile("../log.txt", output + "\n", function(err) {
        if (err) {
            console.log(err);
        }
    })
}


function getTwitter() {
    //request info from twitter
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: twitterConsumerKey,
        consumer_secret: twitterConsumerSecret,
        access_token_key: twitterAccessTokenKey,
        access_token_secret: twitterAccessTokenSecret
    });
    writeLog("Twitter Search:");
    client.get('statuses/user_timeline', function(error, tweets, response) {
        if (error) {
            console.log(error);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log("Tweet: " + tweets[i].text + "; written on " + tweets[i].created_at);
            writeLog("Tweet: " + tweets[i].text + "; written on " + tweets[i].created_at);
        }
    });
}

function getSpotify() {
    //request info from spotify
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: spotifyClientId,
        secret: spotifyClientSecret
    });
    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
    }
    writeLog("Spotify Search:");
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            //artist
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            writeLog("Artist: " + data.tracks.items[0].artists[0].name);
            //song name
            console.log("Song name: " + data.tracks.items[0].name);
            writeLog("Song name: " + data.tracks.items[0].name);
            //preview link
            console.log("Preview this song: " + data.tracks.items[0].external_urls.spotify);
            writeLog("Preview this song: " + data.tracks.items[0].external_urls.spotify);
            //album name
            console.log("Album: " + data.tracks.items[0].album.name);
            writeLog("Album: " + data.tracks.items[0].album.name);
        }
    });
}

function getOmdb() {

    //request info from omdb
    var request = require("request");
    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName += nodeArgs[i];
        }
    }
    writeLog("omdb Search:");
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            console.log(error);
        } else if (!error && response.statusCode === 200) {
            bodyObj = JSON.parse(body);
            console.log("Title: " + bodyObj.Title);
            writeLog("Title: " + bodyObj.Title);
            console.log("Year: " + bodyObj.Year);
            writeLog("Year: " + bodyObj.Year);
            for (var i = 0; i < 2; i++) {
                if (bodyObj.Ratings[i]) {
                    console.log(bodyObj.Ratings[i].Source + " Rating: " + bodyObj.Ratings[i].Value);
                    writeLog(bodyObj.Ratings[i].Source + " Rating: " + bodyObj.Ratings[i].Value);
                } else {
                    console.log("No Ratings Available");
                    writelog("No Ratings Available");
                }
            }
            console.log("Produced in: " + bodyObj.Country);
            console.log("Language: " + bodyObj.Language);
            console.log("Plot: " + bodyObj.Plot);
            console.log("Starring: " + bodyObj.Actors);
            writeLog("Produced in: " + bodyObj.Country);
            writeLog("Language: " + bodyObj.Language);
            writeLog("Plot: " + bodyObj.Plot);
            writeLog("Starring: " + bodyObj.Actors)
        }
    })
}


function liri() {
    //twitter
    if (operand === 'my-tweets') {
        getTwitter();

    } else if (operand === 'spotify-this-song') {
        if (!param1) {
            param1 = "The Sign Ace of Bass";
            console.log(param1);
            getSpotify();
        } else {
            getSpotify();
        }

    } else if (operand === 'movie-this') {
        if (!param1) {
            movieName = "Mr Nobody";
            getOmdb();
        } else {
            getOmdb();
        }
    }

} //ends liri function
liri();

if (operand === 'do-what-it-says') {
    function readRandom() {
        //read random.txt
        var fs = require("fs");
        fs.readFile("../random.txt", "utf8", function(error, data) {
            if (error) {
                console.log(error)
            } else {
                var splitData = data.split(",");
                console.log(splitData);
                operand = splitData[0];
                param1 = splitData[1];
                liri();
            }
        })
    }
    readRandom();

}