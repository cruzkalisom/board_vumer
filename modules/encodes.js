const bcrypt = require('bcrypt')

const encodePassword = (password) => {
    const saltRounds = 10

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)

    return hash
}

module.exports = {
    encodePassword: encodePassword,
    bcrypt: bcrypt
}