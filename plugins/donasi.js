import fetch from 'node-fetch'
let handler = async(m, { conn }) => {
    let teks = `
┌──「 Donasi 」
├ Dana:-
├ OVO:-
├ GoPay: +62 812-7367-7810
├ Pulsa: +62 819-5929-3465
└───
`.trim()
    const message = {
        image: { url: image},
        jpegThumbnail: await(await fetch(image)).buffer(),
        caption: teks,
        footer: watermark,
        templateButtons: [
            {
                urlButton: {
                    displayText: 'Saweria',
                    url: 'https://saweria.co/FadliStudio'
                }
            }, {
                quickReplyButton: {
                    displayText: 'Owner',
                    id: '.owner'
                }
            }
        ]
    }
    return await conn.sendMessage(m.chat, message, { quoted: m })
}
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

export default handler
