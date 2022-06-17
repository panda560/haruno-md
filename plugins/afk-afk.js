import db from '../lib/database.js'

let handler = async (m, { text }) => {
    let user = db.data.users[m.sender]
    user.afk = + new Date
    user.afkReason = text
    m.reply(`
  ${conn.getName(m.sender)} sekarang AFK ${text ? ': ' + text : ''}
  `)
}
handler.help = ['afk [alasan]']
handler.tags = ['main']
handler.command = /^afk$/i

export default handler