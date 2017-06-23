
Исправляем Response StatusCode

new HttpException(new StatusCode())

Необходимо отделить друг от друга данные ViewModel и данные HTTP-ответа (статус, заголовки)
 
 response.statusCode = new StatusCode();
 вместо:
 viewModel.statusCode = new StatusCode();

Прикрутить gulp, чтобы файле не TS тоже копировались в каталог dist


Выполненный TODO

+ HttpServer, HttpsServer
+ redirect from http to https
+ res.format()
+ Проверить https://www.npmjs.com/package/express-implhandler 
+ https://www.npmjs.com/package/express-list-endpoints
+ на вложенные роутеры.
+ Сделать менеджер событий в AbstractRequestHandler для AbstractRequestHandler
+ Сделать менеджер плагинов.
+ otImplementedRequestHandlerPlugin
Сделать плагин RedirectRequestHandlerPlugin
Редирект на URL
Редирект на следующий контроллер next()
Редирект на следующий маршрут next('route')
Редирект на следующий маршрут next('router')