# www.imdb.comd scraper README

This project utilizes the Node.js framework to scrape movie information from IMDb using Cheerio and Axios libraries. The scraped data is then exposed as an API using Express.js.

## Prerequisites
- Node.js installed on your machine

## Installation
1. Clone or download the project repository.
2. Open a terminal and navigate to the project directory.
3. Run the command `npm install` to install the required dependencies.

## Usage
1. In the project directory, open the `app.js` file.
2. You will find a function called `scrapMoviseInfo` which is responsible for scraping the movie information from IMDb.
3. The function accepts a URL as a parameter and returns a list of movie objects containing properties such as title, link, poster URL, and rating.
4. Modify the API routes in the `app.js` file according to your requirements. Currently, the following routes are defined:
   - `/api/top`: Retrieves the top-rated movies from IMDb.
   - `/api/moviemeter`: Retrieves movies by popularity from IMDb.
   - `/api/toptv`: Retrieves the top-rated TV shows from IMDb.
   - `/api/tvmeter`: Retrieves TV shows by popularity from IMDb.
5. To start the server, run the command `node app.js`. The server will be running on port 5555.
6. Open your preferred API testing tool or web browser and access the desired API route to retrieve the scraped movie information.

## Example
If the server is running locally, you can access the APIs as follows:

- To retrieve the top-rated movies: [http://localhost:5555/api/top](http://localhost:5555/api/top)
- To retrieve movies by popularity: [http://localhost:5555/api/moviemeter](http://localhost:5555/api/moviemeter)
- To retrieve the top-rated TV shows: [http://localhost:5555/api/toptv](http://localhost:5555/api/toptv)
- To retrieve TV shows by popularity: [http://localhost:5555/api/tvmeter](http://localhost:5555/api/tvmeter)

Alternatively, you can access the deployed version of this project in the cloud:

- Deployed project: [https://www-imdb-com.onrender.com/](https://www-imdb-com.onrender.com/)

## Acknowledgements
- [Cheerio](https://cheerio.js.org/) - Fast, flexible, and lean implementation of core jQuery designed specifically for the server.
- [Axios](https://axios-http.com/) - Promise-based HTTP client for the browser and Node.js.
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.