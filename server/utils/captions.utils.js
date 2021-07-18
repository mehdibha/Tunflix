import ytssubs from "ytssubs";
import got from "got";
import { createWriteStream } from "fs";
import unzip from "unzip-stream";
import srt2vtt from 'srt-to-vtt';

const fetchYTS = async (imdb_id, langArray, path) => {
    ytssubs.getSubs(imdb_id, (err, results) => {
        if (err) {
            throw err;
        }
        if (!results){
            throw err
        }
        const filteredResults = langArray.reduce((acc, l) => {
            const languages = results.subs.filter((s) => s.lang === l).sort((a, b) => b.rating - a.rating);
            if (languages.length > 0) {
                acc[l] = languages[0];
            }
            return acc;
        }, {});
        const prom = Object.keys(filteredResults).map(elem => {
            got.stream(filteredResults[elem].url).pipe(unzip.Parse()).on('entry', (entry) => {
                var filePath = path;
                if (filePath === path) {
                  entry.pipe(srt2vtt()).pipe(createWriteStream(path + `${elem}.vtt`));
                } else {
                  entry.autodrain();
                }
              })
        });
    });
};

export { fetchYTS };
