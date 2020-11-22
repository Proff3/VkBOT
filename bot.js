const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const Scene = require('node-vk-bot-api/lib/scene');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
require('dotenv').config();
const bot = new VkBot(process.env.TOKEN);
bot.command("/start", beginWork)
bot.command("Кофе", getCoffee);
bot.startPolling();

async function beginWork(ctx) {
    try {
        await ctx.reply('Здравствуйте! Сформируйте заказ!', null, startKeyBoard);
    }
    catch (err) {
        console.log(err)
    }
}

async function getCoffee(ctx) {
    try {
        await ctx.reply('Выберите кофе', null, template);
    }
    catch (err) {
        console.log(err)
    }
}

var coffeeKeyBoard = Markup.keyboard([
    Markup.button("Капучино"),
]).oneTime()
var startKeyBoard = Markup.keyboard([
    [
        Markup.button("Кофе"),
        Markup.button("Выпечка")
    ],
    [
        Markup.button("Чай"),
        Markup.button("Манты"),
    ],
    [
        Markup.button("Далее")
    ],
]).oneTime()

let template = {
    type: "carousel",
    elements: [{
        title: "title",
        buttons: [{
            action: {
                type: "text",
                label: "Текст кнопки 🌚",
            }
        }],
        description: "Кофе"
    },],

}

var lattePhoto = 'photo-200531371_457239027';
var capuchinoPhoto = 'photo-200531371_457239028';