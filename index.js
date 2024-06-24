const fs = require('fs')
const path = require('path')

function randomSecret(size = 100) {
    let dict = '1234567890-=!@#$%¨&*()_+`{^}?:><|/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let temp = ''
    for (i = 0; i < size; i++) {
        temp += dict[randrange(0, (dict.length - 1))]
    }
    return temp

}

function randrange(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

if (!fs.existsSync(path.join(__dirname, "config.json")))
    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify({
        'port': 8080,
        'secret': randomSecret(),
        'senha': "EDITE_A_SENHA!"
    }))


require('./src/server')