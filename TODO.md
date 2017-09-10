

Терминология:

JSON Schema - стандарт описания структуры данных на JSON.
OpenAPI (бывший Swagger) - спецификация для описания веб-сервисов REST.
REST-клиент - инструмент для тестирования веб-сервисов REST.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

TODO:

Валидация JSON Schema (выбрать готовый)
    https://www.npmjs.com/package/ajv (нет возможности написать nullable)
    https://www.npmjs.com/package/jsonschema
    https://www.npmjs.com/package/z-schema
    https://github.com/acornejo/jjv
    https://github.com/geraintluff/tv4
    https://github.com/playlyfe/themis Добавление ключевого слова есть, а остальное под вопросом
    https://github.com/korzio/djv (addFormat невнятный)
    https://github.com/AlexeyGrishin/schemasaurus Старый и странный

    Списки валидаторов:
        https://github.com/ebdrup/json-schema-benchmark
        http://json-schema.org/implementations.html
        https://github.com/json-schema-org/json-schema-org.github.io

    Критерии выбора валидатора:
        Проверить как ссылаться на внешние схемы из схемы. Это нужно для реализации полиморфных узлов (discriminator).
        Проверить как добавлять ключевые слова на примере nullable и discriminator
        придумать способ хранения схем
            Например можно пользоваться конвертером https://github.com/chaliy/sequelize-json-schema

Объектная модель JSON Schema
    А она нужна? 
        В OOM3 схема может хранится как простой объект. Для валидатора этого достаточно.
        А доступ к внутренним объектам схемы пока не нужен. И скорее всего не понадобится вовсе.
    Попробовать найти существующий вариант.
    Написать свой вариант:
        JSON Schema Object Model
        jsonschema-object-model-spec (JSOM)
        jsonschema-object-model

Объектная модель спецификации OpenAPI
    Попробовать найти существующий вариант.
    Написать свой вариант:
        OpenAPI 3 Object Model
        openapi3-object-model-spec (OOM3)
        openapi3-object-model
        Посмотреть 
            https://github.com/metadevpro/openapi3-ts/blob/master/src/model/OpenApi.ts
            https://www.npmjs.com/package/swagger-parser
            https://github.com/OAI/OpenAPI-Specification

Написать готовый сервер на основе Express
    express-openapi3
    openapi3-server
    Разбор шваггер протокола:
        Пример сервера и клиента Шваггер /temp/swagger-sample
        https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
        https://www.npmjs.com/package/swagger
        https://www.npmjs.com/package/swagger-editor
        https://www.npmjs.com/package/swagger-jsdoc
        https://www.npmjs.com/package/swagger-router
        https://www.npmjs.com/package/swagger-express-router
        http://editor.swagger.io/
        http://petstore.swagger.io/


Минимально функциональная версия инструментария:
    Здесь можно уже пробовать создавать примеры серверов.


Кодогенератор моделей данных для сервера sequelize на основе OpenAPI
    openapi3-to-sequelize-models

Кодогенератор моделей данных для клиента на основе OpenAPI

Кодогенератор библиотеки доступа к серверу для клиента

Написать редактор OpenAPI
    Примеры АПИ https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v3.0
    Примеры готовых редакторов:
        Eclipse Editor for OpenAPI 2.0 and 3.0 https://github.com/RepreZen/KaiZen-OpenAPI-Editor
        Для OpenAPI v3 https://github.com/Mermade/openapi-gui
        Для Шваггер в2 https://studio.restlet.com/
        Для Шваггер в2 https://github.com/swagger-api/swagger-editor
    Список готовых редакторов можно посмотреть тут:
        https://github.com/OAI/OpenAPI-Specification/blob/master/IMPLEMENTATIONS.md

Написать или найти готовый редактор JSON Schema.

Создание REST-клиента для тестирования API:
    Временно вместо своего REST-клиента можно использовать:
        Postman 
            https://www.getpostman.com/
        Restlet Client 
            https://restlet.com/modules/client/
            https://chrome.google.com/webstore/detail/restlet-client-rest-api-t/aejoelaoggembcahagimdiliamlcdmfm
    Глянуть на эти произведения:
        https://github.com/swagger-api/swagger-UI (Browse and test a REST API described with the OpenAPI 3.0 Specification.)
        https://github.com/koumoul-dev/openapi-viewer (Web-Based interface for visualizing and testing OpenAPI\Swagger definitions)
        https://github.com/temando/open-api-renderer (A React renderer for Open API v3)


Расширение специального плагина express-openapi3 для Express:
    Passport (https://www.npmjs.com/package/passport-openapi)
    Sessions
    Cookies
    Sequelize 
    robots.txt

Прикрутить дюк https://github.com/senchalabs/jsduck

TODO факультатив:

    Типизация обработчиков событий:
    https://www.npmjs.com/package/ts-eventemitter
    https://github.com/tenry92/typed-event-emitter

    Полезные декораторы:
    https://github.com/jayphelps/core-decorators.js

    Асинхронные обработчики событий
    https://github.com/morrisallison/event-station/blob/master/docs/Usage.md#asynchronous-listeners

    Отличный пример приложения под экспресс
    https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter










----------------------------------------------- ПОЯСНЕНИЯ ------------------------------------------

Пишем документацию - файл OpenAPI


На его основе генерируется

- валидатор запроса для сервера
- валидатор ответа для сервера
- модели данных для клиента 
- модели данных для сервера sequelize
- АПИ клиент для клиента
- АПИ сервер для экспресса ?


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Процесс создания сервера:

На вход 
    подается документация
    Также пишутся обработчики операций
Апи сервер на основе документации 
    генерирует на лету обработчики для Экспресса
    По operationId связывает обработчики с сервером
Также АПИ сервер может взять на себя 
    авторизацию и аутентификацию






- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



Состав сервера:    


1) АПИ сервера (в формате OpenAPI)
	АПИ сервера содержит ссылки на обработчики операций
		Грубый пример выглядит так:
			URL конечной точки -> operationId
			/user/{id}/friends -> getUserFriends

2) Код обработчиков операций
	Грубый пример:
		Каталог с файлами .js обработчиков.

3) Связывание АПИ и операций внутри Express при помощи специального плагина посредством operationId
	Грубый пример:
		operationId -> Код обработчика
		getUserFriends -> function() { Код обработчика }


- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


Работа сервера состоит из двух этапов:

Этап инициализации сервера:

	Схема АПИ сервера на спецификации Open API в виде файла .json поступает на вход плагина для Express.

	Плагин перед обработкой АПИ проверяет его при помощи AJV, таким образом мы исключаем ошибки написания АПИ, 
	сверив его со схемой OpenAPI.

	В итоге плагином создаются обработчики запросов в виде соответствия
	<path из спецификации Open API> (URL запроса сервера) 
		-> operationId (номер операции которая должна исполнятся для обработки этого запроса)

Этап эксплуатации (runtime) сервера:

	Поступил запрос -> 
		Если в АПИ для данного запроса есть схема данных, то входные данные запроса 
		проверяются при помощи AJV на соответствие этой схеме.
		Если данные верны, то тогда запускается обработчик operationId
		Иначе на клиент отсылается ответ с описанием ошибки в данных.

	
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

специальный плагин для экспресса:

    Связывание АПИ (файл АПИ по спецификации OpenAPI) и обработчиков запросов (операции )

    Файл (.json) - на языке OpenAPI (ранее называемый Шваггер) - Содержит АПИ сервера.
    Файл содержит список конечных точек и имена операций, которые обрабатывают запросы по этим конечным точкам.
    Требуется написать плагин для Express, который на входе получает 
        АПИ сервера (файл) и ссылки на операции 
        и связывает АПИ с обработчиками операций посредством имен операций, указанных в АПИ

    app.use(openApiMapping({
        api: 'путь к файлу с АПИ сервера api.json',
        operations: {
            oper1: function() {...},
            oper2: function() {...},
            operN: function() {...}
        }
    }));