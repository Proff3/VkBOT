require('dotenv').config();

const { startKeyBoard, mainKeyBoard, timeKeyBoard, teaKeyBoard, mantiKeyBoard, newOrderKeyBoard, mistakeKeyBoard, } = require('./keyborads');
const { coffeCarousel, bakeryCarousel, coctailCarousel } = require('./carousels');
const { getCoffe, getBakery, getTea, getManti, getCoctail } = require('./menus');
const { VK } = require('vk-io');
const https = require('https');
let agent = https.createServer();
agent.listen(process.env.PORT || 5000)
const bot = new VK({
    token: process.env.TOKEN,
    server: agent
});
const api = bot.api;

const orderPhrases = new RegExp('капучино|латте|американо|эспрессо|3в1|сироп|маршмеллоу|блин|чебурек|чай [з,с]|мант|коктейль [3,2]00мл', 'i');
const timeExp = /\d\d:\d\d/;

//bot.listen(process.env.PORT || 5000);
bot.updates.on('message_new', async (context) => {
    console.log(context.senderId);
    if (context.text === 'Начать' || context.text === "Сделать заказ!") beginWork(context)
    else if (!localDB[context.senderId]) catchFool(context);
    if (context.text.startsWith('Кофе')) getCoffe(context, coffeCarousel, api);
    if (context.text.startsWith('Выпечка')) getBakery(context, bakeryCarousel, api);
    if (context.text === ('Новогодний коктейль 🥛')) getCoctail(context, coctailCarousel, api);
    if (context.text === 'Чай') getTea(context, teaKeyBoard, api);
    if (context.text.startsWith('Манты')) getManti(context, mantiKeyBoard, api);
    if (context.text === 'Просмотреть заказ') getOrder(context, api);
    if (context.text === 'Выбрать время') pickTime(context);
    if (context.text === 'Отменить заказ') cancelOrder(context);
    if (context.text === 'Оправить заказ!') pushOrder(context);
    if (timeExp.test(context.text)) buyMessage(context);
    if (orderPhrases.test(context.text)) continueWork(context);
    if (!context.state.isHandled) catchFool(context);
});

async function beginWork(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    localDB[id] = {};
    localDB[id].order = [];
    localDB[id].hasManti = false;
    setTimeout(cancelOrder.bind(this, context), 1000 * 60 * 30)
    await api.messages.send({
        message: 'Здравствуйте! Сформируйте заказ!',
        keyboard: startKeyBoard,
        random_id,
        user_id: id
    });
}

async function continueWork(context) {
    context.state = { isHandled: true }
    let id = context.senderId;
    if (context.text.includes('мант')) localDB[id].hasManti = true;
    localDB[id].order.push(context.text);
    let random_id = context.conversationMessageId
    await api.messages.send({
        message: 'Продолжайте выбирать или, если заказ заврешен, выберите время!',
        keyboard: mainKeyBoard,
        random_id,
        user_id: id
    });
}

async function pickTime(context) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    if (!!localDB[context.senderId].order[0]) { //Проверка на дурака, если человек ничего не заказал
        let times = getTimes(context);
        let message = localDB[id].hasManti ?
            'Выберите время, пожалуйста! (Время приготовления мант 45 мин.)' : "Выберите время, пожалуйста!"
        await api.messages.send({
            message,
            keyboard: timeKeyBoard(times),
            random_id,
            user_id: id
        });
    } else beginWork(context)
}

function getTimes(context) {
    let times = [];
    let time = new Date();
    time = localDB[context.senderId].hasManti ?
        time.AddMinutes(80) : time.AddMinutes(5);
    let idx = theClosestTime(time);
    console.log(pickedTimes[idx]);
    while (times.length < 30) {
        if (Math.abs(time - pickedTimes[idx]) > 150000) {
            let minutes = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
            let hours = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
            times.push(`${hours}:${minutes}`);
        }

        if (time.getMinutes() > 58) {
            time.setMinutes(0);
            time.setHours(time.getHours() + 1);
        } else {
            time.setMinutes(time.getMinutes() + 1)
        }
    }
    return times;
}

bot.updates.start();


async function buyMessage(context) {
    let id = context.senderId;
    context.state = { isHandled: true };
    let [hours, minutes] = context.text.split(":");
    let time = new Date();
    time.setMinutes(+minutes);
    time.setHours(+hours);
    localDB[id].time = context.text;
    createPickedTime(time);

    let message = "Ваш заказ:\n" + localDB[id].order.join("\n") + "\nВыбранное время:" + localDB[id].time;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message,
        keyboard: newOrderKeyBoard,
        random_id,
        user_id: id
    });
}

async function getOrder(context, api) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let message = "Ваш заказ:\n" + localDB[id].order.join("\n");
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message,
        keyboard: mainKeyBoard,
        random_id,
        user_id: id
    });
}

async function cancelOrder(context) {
    context.state = { isHandled: true }
    let id = context.senderId;
    localDB[id].hasManti = false;
    localDB[id].order = [];
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: "Заказ отменен!",
        keyboard: startKeyBoard,
        random_id,
        user_id: id
    });
}

async function catchFool(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: "Для начала работы нажмите!",
        keyboard: mistakeKeyBoard,
        random_id,
        user_id: id
    });
}


var localDB = {};

var pickedTimes = [new Date() - 1000 * 60 * 60 * 2]

function theClosestTime(time) {
    let min = 1000 * 60 * 60 * 2;
    let index = 0;
    pickedTimes.forEach((pickedTime, idx) => { if (Math.abs(time - pickedTime) < min) index = idx })
    return index;
}

async function pushOrder(context) {
    let id = context.senderId;
    psuhTheOrderToBaristas(context, id);
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: "Для создания нового заказа - нажмите кнопку!",
        keyboard: mistakeKeyBoard,
        random_id,
        user_id: id
    });
}

function createPickedTime(pickedTime) {
    pickedTimes.push(pickedTime);
    setTimeout(() => { pickedTimes = pickedTimes.filter(time => time != pickedTime) }, 1000 * 60 * 60 * 2)
}

async function psuhTheOrderToBaristas(context, id) {
    message = "Заказ:\n" + localDB[id].order.join("\n") + "\nВремя - " + localDB[id].time;
    console.log(message);
    let random_id = context.conversationMessageId * 2;
    await api.messages.send({
        message,
        random_id,
        user_id: 165865599
    });
    random_id++;
    await api.messages.send({
        message,
        random_id,
        user_id: 544246967
    });
    random_id++;
    await api.messages.send({
        message,
        random_id,
        user_id: 339548026
    });
}

Date.prototype.AddMinutes = (minutes) => {
    let time = new Date();
    for (let i = 0; i < minutes; i++) {
        if (time.getMinutes() > 58) {
            time.setMinutes(0);
            time.setHours(time.getHours() + 1);
        } else time.setMinutes(time.getMinutes() + 1)
    }
    return time;
}