const { Telegraf } = require('telegraf')
const ids = require('./ids.json')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('lol', async (ctx) => {
  const index = Math.floor(Math.random() * ids.length)
  ctx.reply(`https://t.me/c/1577490870/${ids[index]}`)
})

bot.launch()
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

console.log('Bot launched', new Date())
