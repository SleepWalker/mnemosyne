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
var Contact = Backbone.Model.extend({
    defaults: {
        name: '',
        surname: '',
        birthday: '',
        organization: '',
        position: '',
        group: '',
        contacts: {
            phones: [],
            emails: [],
            locations: []
        }
    },
});

module.exports = Contact;