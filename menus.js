
async function getCoffe(context, carousel, api) {
    context.state = { isHandled: true };
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Выберите кофе! Смахните влево!',
        template: carousel,
        random_id,
        user_id: id
    });
}
async function getBakery(context, bakeryCarousel, api) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Выберите выпечку! Смахните влево!',
        template: bakeryCarousel,
        random_id,
        user_id: id
    });
}
async function getTea(context, teaKeyBoard, api) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Чай в пакетиках ☕ - 200мл',
        keyboard: teaKeyBoard,
        random_id,
        user_id: id
    });
}
async function getManti(context, mantiKeyBoard, api) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Соус к мантам в подарок! (Время приготовления 45 мин.)',
        keyboard: mantiKeyBoard,
        random_id,
        user_id: id
    });
}

async function getCoctail(context, coctailCarousel, api) {
    context.state = { isHandled: true }
    let id = context.senderId;
    let random_id = context.conversationMessageId;
    await api.messages.send({
        message: 'Выберите коктейль!',
        template: coctailCarousel,
        random_id,
        user_id: id
    });
}

module.exports.getCoctail = getCoctail;
module.exports.getTea = getTea;
module.exports.getBakery = getBakery;
module.exports.getCoffe = getCoffe;
module.exports.getManti = getManti;