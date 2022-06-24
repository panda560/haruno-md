let handler = async(m, { conn }) => {
  let contact = await conn.sendContact(m.chat, [[owner[0] + '@s.whatsapp.net', 'PRATAMA'], [owner[1] + '@s.whatsapp.net', 'WINDY'], [owner[2] + '@s.whatsapp.net', 'ANGGRA']], m)
  await conn.reply(m.chat, 'Nomor *owner* itu bukan nomor bot.\nHarap pengertian nya nggak ngechat command bot ke nomer owner. Makasih.', contact)
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

export default handler
