const request = require("request-promise");
const cheerio = require("cheerio");
const request_normal = require("request");
const fs = require("fs");
const path = require('path');
const { exit } = require("process");


async function scrapMoviseInfo() {
    const html = await request.get("https://www.imdb.com/chart/moviemeter/");
    const $ = await cheerio.load(html);
    const moviesInfo = $(".lister-list > tr").map((i, el) => {
        const movieTitle = $(el).find(".titleColumn > a").text()
        const DescriptionLink = `https://www.imdb.com${$(el).find(".titleColumn > a").attr("href").split('?')[0]}`
        const posterUrl = $(el).find("td.posterColumn > a > img").attr("src").split("._")[0] + "._V1_FMjpg_UX1000_.jpg"
        const movieRate = $(el).find(".imdbRating").text().trim().replace(/^$/, "Don't have Rate yet!")
        return ({ movieTitle, movieRate, movieRank: (i + 1), DescriptionLink, posterUrl })
    }).get()
    return (moviesInfo)
}

async function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time * 1000)
    })
}

async function main() {
    const MoviesInfo = await scrapMoviseInfo();
    for (let i = 0; i < MoviesInfo.length; i++) {
        const Url = MoviesInfo[i].posterUrl;
        request_normal.get(Url).pipe(fs.createWriteStream(`Posters/${(Url.split("/images/M/")[1])}`))
        await sleep(0.2)
        MoviesInfo[i].path = `Posters/${(Url.split("/images/M/")[1])}`
    }
    fs.writeFileSync(path.resolve(__dirname, 'MoviesInfoo.json'), JSON.stringify(MoviesInfo));
    exit(0)
}

main()
