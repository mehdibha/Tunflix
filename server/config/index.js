const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4444,
    jwtSecret: process.env.JWT_SECRET,
    mongoUri: process.env.MONGODB_URI,
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    jwtSecret: process.env.JWT_SECRET,
    googleIdClient : process.env.GOOGLE_ID_CLIENT,
    googleSecret : process.env.GOOGLE_SECRET,
    TMDBApiKey : process.env.TMDB_API_KEY
  }
  
export default config