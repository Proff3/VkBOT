require('dotenv').config();
const { VK, Keyboard } = require('vk-io');
const bot = new VK({
    token: process.env.TOKEN
});
const api = bot.api;
bot.updates.on('message_new', async (context) => {
    if (context.text === 'Начать' || context.text === "Cделать заказ") beginWork(context);
    if (context.text === 'Кофе') getCoffe(context);
    if (isOrderOld(context.text)) continueWork(context);
    if (context.text === 'Выбрать время') pickTime(context);
});

async function getCoffe(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId
    await api.messages.send({
        message: 'Выберите кофе! Смахните влево!',
        template: coffeCarousel,
        random_id,
        user_id: id
    });
}

async function beginWork(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Здравствуйте! Сформируйте заказ!',
        keyboard: startKeyBoard,
        random_id,
        user_id: id
    });
}

async function continueWork(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId
    await api.messages.send({
        message: 'Если заказ заврешен, выберите время!',
        keyboard: mainKeyBoard,
        random_id,
        user_id: id
    });
}

async function pickTime(context) {
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    let times = await getTimes();
    console.log(times);
    await api.messages.send({
        message: 'Выберите время, пожалуйста!',
        keyboard: makeKeyBoard(times),
        random_id,
        user_id: id
    });
}

async function getTimes() {
    let times = [];
    let time = new Date();
    for (let i = 0; i < 5; i++) {
        console.log(time)
        if (time.getMinutes() > 58) {
            time.setMinutes(0);
            time.setHours(time.getHours() + 1);
        } else time.setMinutes(time.getMinutes() + 1)
    }
    while (times.length < 30) {
        let minutes = time.getMinutes() < 9 ? "0" + time.getMinutes() : time.getMinutes();
        let hours = time.getHours() < 9 ? "0" + time.getHours() : time.getHours();
        times.push(`${hours}:${minutes}`);
        if (time.getMinutes() > 58) {
            time.setMinutes(0);
            time.setHours(time.getHours() + 1);
        } else {
            time.setMinutes(time.getMinutes() + 1)
        }
    }
    return times;
}

function makeKeyBoard(times) {
    let keyboard = Keyboard.builder();
    times.forEach(item => {
        id = item.split('').reverse()[0]
        if (id % 5 == 0) {
            keyboard.textButton({
                label: item,
                color: Keyboard.PRIMARY_COLOR
            })
            keyboard.row()
        } else {
            keyboard.textButton({
                label: item,
            })
        }

    });
    keyboard.oneTime()
    return keyboard
}

bot.updates.start();


var coffeCarousel = JSON.stringify({
    type: "carousel",
    elements: [{
        title: "Капучино ☕",
        description: "При покупке 300мл и 350мл десерт в подарок!",
        photo_id: '-200531371_457239030',
        buttons: [{
            action: {
                type: "text",
                label: "Капучино 250мл - 90₽",
            }
        },
        {
            action: {
                type: "text",
                label: "Капучино 300мл - 100₽",
            },

        },
        {
            action: {
                type: "text",
                label: "Капучино 350мл - 110₽",
            },
            color: Keyboard.PRIMARY_COLOR
        }],
    }, {
        title: "Латте ☕",
        description: "При покупке 300мл и 350мл десерт в подарок!",
        photo_id: '-200531371_457239030',
        buttons: [{
            action: {
                type: "text",
                label: "Латте 250мл - 90₽",
            }
        },
        {
            action: {
                type: "text",
                label: "Латте 300мл - 100₽",
            },

        },
        {
            action: {
                type: "text",
                label: "Латте, 350мл - 110₽",
            },
            color: Keyboard.PRIMARY_COLOR
        }],
    }
    ],
})

function isOrderOld(text) {
    let isOld = false;
    const orderPhrases = ['Капучино', 'Латте', 'Блины', 'Чебуреки', 'Чай'];
    orderPhrases.forEach(item => { if (text.includes(item)) isOld = true });
    return isOld;
}

var startKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Кофе',
    })
    .textButton({
        label: 'Выпечка',
    })
    .row()
    .textButton({
        label: 'Чай',
    })
    .textButton({
        label: 'Манты',
    })
    .row()
    .oneTime()
    .inline()
var mainKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Кофе',
    })
    .textButton({
        label: 'Выпечка',
    })
    .row()
    .textButton({
        label: 'Чай',
    })
    .textButton({
        label: 'Манты',
    })
    .row()
    .textButton({
        label: 'Выбрать время',
    })
    .oneTime()
    .inline()

