const cheerio = require('cheerio')
const axios = require('axios')
const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const scrapMoviseInfo = async (url) => {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    const list = $(".lister-list > tr").map((i, el) => {
        const title = $(el).find(".titleColumn > a").text()
        const link = `https://www.imdb.com${$(el).find(".titleColumn > a").attr("href").split('?')[0]}`
        const posterUrl = $(el).find("td.posterColumn > a > img").attr("src").split("._")[0] + "._V1_FMjpg_UX1000_.jpg"
        const rating = $(el).find(".imdbRating").text().trim().replace(/^$/, "0.0")
        return ({ title, rating, posterUrl, link })
    }).get()
    return (list)
}
const app = express()
const port = 5556

app.get('/', (req, res) => {
    const api = [
        {
            top: '/api/top',
            origin: 'https://www.imdb.com/chart/top/'
        },
        {
            moviemeter: '/api/moviemeter',
            origin: 'https://www.imdb.com/chart/moviemeter/'
        },
        {
            toptv: '/api/toptv',
            origin: 'https://www.imdb.com/chart/toptv/'
        },
        {
            tvmeter: '/api/tvmeter',
            origin: 'https://www.imdb.com/chart/tvmeter/'
        }
    ]
    res.send(api)
})

const listToDb = async (list) => {
    try {
      const createdMovies = await prisma.movie.createMany({
        data: list.map((movie) => ({
          title: movie.title,
          rating: parseFloat(movie.rating),
          posterUrl: movie.posterUrl,
          link: movie.link,
        })),
        skipDuplicates: false,
      });
      return createdMovies;
    } catch (error) {
      console.error('Error creating movies:', error);
      throw error;
    }
};

app.get('/api/top', async (req, res) => {
    const list = await scrapMoviseInfo('https://www.imdb.com/chart/top/')
    res.send(list)
    // await listToDb(list)
})

app.get('/api/moviemeter', async (req, res) => {
    const list = await scrapMoviseInfo('https://www.imdb.com/chart/moviemeter/')
    res.send(list)
    // await listToDb(list)
})


app.get('/api/toptv', async (req, res) => {
    const list = await scrapMoviseInfo('https://www.imdb.com/chart/toptv/')
    res.send(list)
    // await listToDb(list)
})

app.get('/api/tvmeter', async (req, res) => {
    const list = await scrapMoviseInfo('https://www.imdb.com/chart/tvmeter/')
    res.send(list)
    // await listToDb(list)
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
})