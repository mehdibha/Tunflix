import "./config/env";
import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import authRoute from "./routes/auth.routes.js";
import browseRoute from "./routes/browse.routes.js";
import movieRoute from "./routes/movie.routes.js";
import tvshowRoute from "./routes/tvshow.routes.js";
import passport from "passport";
import morgan from "morgan";
import config from "./config";
import "./config/passport";

const app = express();
connectDB(); // connect DB

// middleWares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(passport.initialize());

// routes
app.use("/api/auth", authRoute);
app.use("/api/browse", browseRoute);
app.use("/api/movie", movieRoute);
app.use("/api/tv", tvshowRoute);


// server
app.listen(config.port, () => console.log(`*** Server running on port ${config.port} ***`));

process.on("SIGINT", () => process.exit(1));
