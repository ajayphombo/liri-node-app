# liri-node-app
##About
--------
LIRI is like iPhone's SIRI;however, unline SIRI, LIRI is a (L)anguage (I)nterpretation and (R)ecognition (I)nterface. It is a command line **Node app** that takes in parameters and gives you back data.

##Functions
----------
There are four functions built in the bot:
*`movie()`
*`song()`
*`band()`
*`doit()`
To call any of the above functions, one has to type in its' respective parameter along with desired action. To do so, one has to navigate to the file directory in the command terminal and follow the format:
> `node liri <respective-parameter> <respective action>`

###`movie()`
`node liri movie-this <movie-title>`
This function takes in a *movie title* and displays:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
It takes `movie-this` as the parameter.
##License
---------
**MIT**License