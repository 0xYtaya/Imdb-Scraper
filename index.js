import cheerio from 'cheerio'
import request from 'request-promise'
import express  from 'express'

const scrapMoviseInfo = async (url) => {
    const html = await request.get(url)
    const $ = cheerio.load(html)
    const list = $(".lister-list > tr").map((i, el) => {
        const title = $(el).find(".titleColumn > a").text()
        const link = `https://www.imdb.com${$(el).find(".titleColumn > a").attr("href").split('?')[0]}`
        const posterUrl = $(el).find("td.posterColumn > a > img").attr("src").split("._")[0] + "._V1_FMjpg_UX1000_.jpg"
        const rate = $(el).find(".imdbRating").text().trim().replace(/^$/, "N/A")
        return ({ title, link, posterUrl, rate })
    }).get()
    return (list)
}
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const list = await scrapMoviseInfo('https://www.imdb.com/chart/moviemeter/')
    res.send(list)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})