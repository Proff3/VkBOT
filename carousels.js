//const { Keyboard } = require('vk-io');
import { Keyboard } from 'vk-io';
var coffeCarousel = JSON.stringify({
    type: "carousel",
    elements: [{
        title: "Капучино ☕",
        description: "При покупке 300мл и 350мл десерт в подарок!",
        photo_id: '-200531371_457239033',
        buttons: [
            {
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
        photo_id: '-200531371_457239035',
        buttons: [
            {
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
                    label: "Латте 350мл - 110₽",
                },
                color: Keyboard.PRIMARY_COLOR
            }],
    },
    {
        title: "Американо ☕ и Эспрессо ☕",
        description: "При покупке 250мл Американо ☕ десерт в подарок!",
        photo_id: '-200531371_457239034',
        buttons: [
            {
                action: {
                    type: "text",
                    label: "Американо 150мл - 80₽",
                }
            },
            {
                action: {
                    type: "text",
                    label: "Американо 250мл - 100₽",
                },
                color: Keyboard.PRIMARY_COLOR
            },
            {
                action: {
                    type: "text",
                    label: "Эспрессо 50мл - 50₽",
                },
                color: Keyboard.PRIMARY_COLOR
            }
        ],
    },
    ],
})

var bakeryCarousel = JSON.stringify({
    type: "carousel",
    elements: [{
        title: "Чебуреки 🥟",
        description: "Домашние чебуреки из свежего мяса!",
        photo_id: '-200531371_457239032',
        buttons: [
            {
                action: {
                    type: "text",
                    label: "Чебурек - 30₽",
                }
            },
            {
                action: {
                    type: "text",
                    label: "2 чебурека - 60₽",
                },
                color: Keyboard.PRIMARY_COLOR
            },
            {
                action: {
                    type: "text",
                    label: "3 и более чебурека",
                }
            }],
    }, {
        title: "Блины 3 шт. 🥞",
        description: "Джем в подарок!",
        photo_id: '-200531371_457239036',
        buttons: [
            {
                action: {
                    type: "text",
                    label: "3 блина и джем - 50₽",
                },
                color: Keyboard.PRIMARY_COLOR
            },
            {
                action: {
                    type: "text",
                    label: "6 блинов и 2 джема - 100₽",
                },

            },
            {
                action: {
                    type: "text",
                    label: "9 блинов и 3 джема - 150₽",
                }
            }],
    },
    ],
})

var coctailCarousel = JSON.stringify({
    type: "carousel",
    elements: [{
        title: "Новогодний коктейль 🥛",
        description: "При покупке коктейля сироп, маршмеллоу и леденец в подарок!",
        photo_id: '-200531371_457239037',
        buttons: [
            {
                action: {
                    type: "text",
                    label: "Коктейль 200мл - 80₽",
                }
            },
            {
                action: {
                    type: "text",
                    label: "Коктейль 300мл - 100₽",
                },
                color: Keyboard.PRIMARY_COLOR,
            },
        ],
    }]
})

module.exports.coctailCarousel = coctailCarousel;
module.exports.bakeryCarousel = bakeryCarousel;
module.exports.coffeCarousel = coffeCarousel;