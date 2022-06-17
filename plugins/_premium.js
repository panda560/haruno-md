import db from '../lib/database.js'

export async function all(m) {
    let user = db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (user.premiumTime != 0 && user.premium) {
        if (new Date() * 1 >= user.premiumTime) {
            await m.reply(`Waktu premium mu sudah habis.`)
            user.premiumTime = 0
            user.premium = false
        }
    }
}