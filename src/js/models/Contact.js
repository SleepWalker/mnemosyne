var Backbone = require('backbone');
/*
Название
Должность и компания
Транскрипция имени
Псевдоним
Записать как
Примечания
Адрес эл. почты
Телефон
Почтовый адрес
День рождения
URL
Отношения
Имя в чате
Номер для интернет-звонков
Пользовательская настройка...
 */
/**
 * email
 * phone
 * url
 * custom
 */
var Contact = Backbone.Model.extend({
    defaults: {
        type: '',
        name: '',
        value: ''
    },
});

module.exports = Contact;