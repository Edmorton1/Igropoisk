const db = require('../db.js')

class GamesModel {
    async getGamesFastNoReleaseDate() {
        try {
            return await db.query(`select * from games WHERE release_date != 'Скоро выйдет' ORDER BY steam_id`)
        } catch(e) {
            console.log(e)
        }
    }
    async getSteamAppid() {
        const response =  (await db.query(`SELECT * FROM games ORDER BY steam_id`)).rows
        return (response.map(e => (e.steam_id)))
    }
    async getSearch(query) {
        return (await db.query(`SELECT * FROM games WHERE LOWER(name) LIKE LOWER('%${query}%') ORDER BY NAME LIKE '${query}%' DESC, total_reviews DESC`)).rows
    }
    async getFilter(query) {
        const {genre, developer, publisher, release_date, status} = query
        let {page} = query
        page ? page : page = 1
        page == 0 ? page = 1: page
        let {order} = query
        order ? order : order = 'rating'
        const orderTypes = ['popularity', 'rating', 'release_date']
        orderTypes.includes(order) ? order : order = 'rating'
        order == 'rating' ? order = "total_reviews - total_negative" : order
        order == 'popularity' ? order = "total_reviews" : order
        const perPage = 45
        // console.log(genre, order, developer, publisher, release_date, status)
            const developerSQL = developer ? `AND developers @> ARRAY['${developer}']` : ``
            const publisherSQL = publisher ? `AND publishers @> ARRAY['${publisher}']` : ``
            const release_dateSQL = release_date ? `AND release_date = '${release_date}'` : ``
            const statusSQL = status == 'soon' ? `WHERE release_date = 'Скоро выйдет' OR CAST(release_date AS INT) > 2025` : `WHERE release_date != 'Скоро выйдет' AND CAST(release_date AS INT) <= 2025`
            if (genre) {
                const genreString = genre.split(',')
                const genreSQL = genre ? `AND genres @> ARRAY[${genreString}]` : ``
                const pages = Number((await db.query(`select COUNT(steam_id) from games ${statusSQL} ${genreSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL}`)).rows[0].count) / perPage
                return [(await db.query(`SELECT * FROM games ${statusSQL} ${genreSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC LIMIT ${perPage} OFFSET ${(page-1) * perPage}`)).rows, Math.ceil(pages)]
            }
            const pages = Number((await db.query(`select COUNT(steam_id) from games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL}`)).rows[0].count) / perPage
            return [(await db.query(`SELECT * FROM games ${statusSQL} ${developerSQL} ${publisherSQL} ${release_dateSQL} ORDER BY ${order} DESC LIMIT ${perPage} OFFSET ${(page-1) * perPage}`)).rows, Math.ceil(pages)]
    }
}

module.exports = new GamesModel()