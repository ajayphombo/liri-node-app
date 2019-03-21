require("dotenv").config();
var keys = require("./keys.js");
var axios=require("axios");
var Spotify = require('node-spotify-api');
var fs=require("fs");
var command=process.argv[2];
var result=process.argv.slice(3).join(" ");

switch(command){
    case "movie-this":
    movie(result);
    break;

    case "spotify-this-song":
    song(result);
    break;

    case "concert-this":
    band(result);
    break;

    case "do-what-it-says":
    doit();
    break;

}
function doit(){
  fs.readFile("random.txt","utf8",function(error,data){
      if(error){
          return console.log(error);
      };
      var dataArr = data.split(",");
      //console.log(dataArr);
      var result=dataArr[1].slice(1,-1);
      //console.log(dataArr[0]);
      if(dataArr[0]==='spotify-this-song'){
        var result=dataArr[1].slice(1,-1);
        //console.log(result);
        song(result);
      }else if(dataArr[0]==='movie-this'){
        var result=dataArr[1].slice(1,-1);
        movie(result);
      }else if(dataArr[0]==='concert-this'){
        var result=dataArr[1].slice(1,-1);
        band(result);
      }

      else(console.log("What Should I do?"));
  });
};

function movie(result){
    axios.get("http://www.omdbapi.com/?t="+result+"&y=&plot=short&apikey="+keys.movie).then(
        function(response) {
          console.log( `\nTitle:${response.data.Title}`);
          console.log( `Year:${response.data.Year}`);
          console.log(`Imdb Rating: ${response.data.imdbRating}`);
          console.log( `Rotten Tomatoes Rating:${response.data.Ratings[1].Value}`);
          console.log( `Country:${response.data.Country}`);
          console.log( `Language:${response.data.Language}`);
          console.log( `Plot:${response.data.Plot}`);
          console.log( `Actors:${response.data.Actors}\n`);
        }
      );

};
function song(result){
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: result }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("\nArtists: " +data.tracks.items[0].artists[0].name); 
      console.log("Song: " + data.tracks.items[0].name);
      console.log('Album: ',data.tracks.items[0].album.name);
      console.log(`Preview: ${data.tracks.items[0].preview_url}\n`);

      });
}

function band(result){
    axios.get("https://rest.bandsintown.com/artists/" + result + "/events?app_id="+keys.band).then(
      function(response){
        console.log(`\nVenue Name :${response.data[0].venue.name}`);
        console.log(`Venue latitude:${response.data[0].venue.latitude}` );
        console.log(`Venue longitude:${response.data[0].venue.longitude}`);
        console.log(`Event date:${response.data[0].datetime}\n`);

      }
    )

}
