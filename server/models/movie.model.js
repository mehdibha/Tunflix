import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        tmdb_id: {
            type: String,
            required: true,
            unique: true,
        },
        imdb_id: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        overview: {
            type: String,
            required: true,
        },
        genres: {
            type: [
                {
                    genreId: String,
                    genreName: String,
                },
            ],
            required: true,
        },
        release_date: {
            type: String,
            required: true,
        },
        runtime: {
            type: Number,
            required: true,
        },
        poster_path: {
            type: String,
            required: true,
        },
        backdrop_path: {
            type: String,
            required: true,
        },
        imdb_rating: {
            type: Number,
        },
        trailers: {
            type: [
                {
                    name: String,
                    key: String,
                },
            ],
            required: true,
        },
        cast: {
            type: [{ id: String, name: String, profile_path: String, character: String }],
            required: true,
        },
        crew: {
            type: [{ id: String, name: String, job: String }],
            required: true,
        },
        likers: {
            type: [String],
            required: true,
        },
        unlikers: {
            type: [String],
            required: true,
        },
        comments: {
            type: [
                {
                    commenterId: String,
                    commenterFullName: String,
                    text: String,
                    timestamp: Number,
                },
            ],
            required: true,
        },
        media_path: {
            type : [
                {
                    source : String,
                    url : String
                }
            ]
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("movie", movieSchema);
