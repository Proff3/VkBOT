const { Keyboard } = require('vk-io');
function timeKeyBoard(times) {
    let keyboard = Keyboard.builder();
    times.forEach((item, idx) => {
        id = item.split('').reverse()[0]
        if ((idx + 1) % 5 == 0) {
            keyboard.textButton({
                label: item,
                color: id % 5 == 0 ? Keyboard.PRIMARY_COLOR : Keyboard.SECONDARY_COLOR
            })
            keyboard.row()
        } else {
            keyboard.textButton({
                label: item,
                color: id % 5 == 0 ? Keyboard.PRIMARY_COLOR : Keyboard.SECONDARY_COLOR
            })
        }

    });
    keyboard.oneTime()
    return keyboard
}
var startKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Кофе ☕',
    })
    .textButton({
        label: 'Выпечка 🥟',
    })
    .row()
    .textButton({
        label: 'Чай',
    })
    .textButton({
        label: 'Манты 🍲',
    })
    .row()
    .textButton({
        label: 'Новогодний коктейль 🥛',
        color: Keyboard.POSITIVE_COLOR
    })
    .oneTime()
    .inline()

var mainKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Кофе ☕',
    })
    .textButton({
        label: 'Выпечка 🥟',
    })
    .row()
    .textButton({
        label: 'Чай',
    })
    .textButton({
        label: 'Манты 🍲',
    })
    .row()
    .textButton({
        label: 'Новогодний коктейль 🥛',
        color: Keyboard.POSITIVE_COLOR
    })
    .row()
    .textButton({
        label: 'Просмотреть заказ',
        color: Keyboard.PRIMARY_COLOR
    })
    .row()
    .textButton({
        label: 'Выбрать время',
        color: Keyboard.POSITIVE_COLOR
    })
    .row()
    .textButton({
        label: 'Отменить заказ',
        color: Keyboard.NEGATIVE_COLOR
    })
    .oneTime()
    .inline()

var teaKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Чай зеленый - 30₽',
        color: Keyboard.PRIMARY_COLOR
    })
    .row()
    .textButton({
        label: 'Чай фруктовый - 30₽',
    })
    .row()
    .textButton({
        label: 'Чай ягодный - 30₽',
    })
    .oneTime()
    .inline()

var mantiKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Порция мант - 150₽',
    })
    .row()
    .textButton({
        label: 'Две порции мант - 300₽',
        color: Keyboard.PRIMARY_COLOR
    })
    .row()
    .textButton({
        label: 'Три порции мант - 450₽',
    })
    .oneTime()
    .inline()

var newOrderKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Оправить заказ!',
        color: Keyboard.POSITIVE_COLOR
    })
    .row()
    .textButton({
        label: 'Отменить заказ',
        color: Keyboard.NEGATIVE_COLOR
    })
    .oneTime()
    .inline()

var mistakeKeyBoard = Keyboard.builder()
    .textButton({
        label: 'Сделать заказ!',
        color: Keyboard.POSITIVE_COLOR
    })
    .oneTime()
    .inline()


module.exports.mantiKeyBoard = mantiKeyBoard;
module.exports.teaKeyBoard = teaKeyBoard;
module.exports.startKeyBoard = startKeyBoard;
module.exports.mainKeyBoard = mainKeyBoard;
module.exports.timeKeyBoard = timeKeyBoard;
module.exports.newOrderKeyBoard = newOrderKeyBoard;
module.exports.mistakeKeyBoard = mistakeKeyBoard;