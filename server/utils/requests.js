import config from '../config'

const API_KEY = config.TMDBApiKey

const requestsHome = [
    {name:"Trending movies",url:`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`},
    {name:"Trending TV Shows",url:`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`},
]

const requestsMovies = [
    {name:"Trending",url:`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`},
    {name:"Action",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`},
    {name:"Adventure",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=12`},
    {name:"Comedy",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`},
    {name:"Animation",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=16`},
    {name:"Crime",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=80`},
    {name:"Drama",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=18`},
    {name:"Family",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10751`},
    {name:"Fantasy",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=14`},
    {name:"History",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=36`},
    {name:"Horror",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`},
    {name:"Mystery",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=9648`},
    {name:"ScienceFiction",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=878`},
    {name:"Documentary",url:`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`},
]

const requestsTVShows = [
    {name:"Trending",url:`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`},
    {name:"Action & Adventure",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10759`},
    {name:"Animation",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16`},
    {name:"Comedy",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=35`},
    {name:"Drama",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=18`},
    {name:"Mystery",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=9648`},
    {name:"Family",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10751`},
    {name:"Kids",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10762`},
    {name:"Sci-Fi & Fantasy",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10765`},
    {name:"War & Politics",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=10768`},
    {name:"Documentary",url:`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=99`},
]

export {requestsHome,requestsMovies,requestsTVShows};