class steamController {
    async game(req, res) {
        const {id} = req.params
        console.log(id)
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}&l=russian`);
        const data = await response.json();
        res.send(data)
    }
}

module.exports = new steamController