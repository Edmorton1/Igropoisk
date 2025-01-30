// async () {
//     try {
//         
//     }  catch(e) {
//         console.log(e)
//     }
// }

const jwt = require('jsonwebtoken')

class TokenService {
        async generateToken(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.ACCESS_PRIVAT_KEY, {})
            const refreshToken = jwt.sign(payload, process.env.REFRESH_PRIVAT_KEY, {})
            console.log(accessToken, refreshToken)
        }  catch(e) {
            console.log(e)
        }
    }
}

module.exports = new TokenService()