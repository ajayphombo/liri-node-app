require("dotenv").config();
var keys = require("./keys.js");
var axios=require("axios");
var Spotify = require('node-spotify-api');
var fs=require("fs");
var command=process.argv[2];
var result=process.argv[3];

switch(command){
    case "movie-this":
    movie();
    break;

    case "spotify-this-song":
    song();
    break;

    case "concert-this":
    band();
    break;

    case "do-what-it-says":
    doit();
    break;

}


function movie(){
    axios.get("http://www.omdbapi.com/?t="+result+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
          console.log( `Title:${response.data.Title}`);
          console.log( `Year:${response.data.Year}`);
          console.log(`Imdb Rating: ${response.data.imdbRating}`);
          console.log( `Rotten Tomatoes Rating:${response.data.Ratings[1].Value}`);
          console.log( `Country:${response.data.Country}`);
          console.log( `Language:${response.data.Language}`);
          console.log( `Plot:${response.data.Plot}`);
          console.log( `Actors:${response.data.Actors}`);
        }
      );

}
function song(){
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: result }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}

function band(){

}
function doit(){
    fs.readFile("random.txt","utf8",function(error,data){
        if(error){
            return console.log(error);
        };
        result=data;
        movie();
        song();
        band();

    })



}




