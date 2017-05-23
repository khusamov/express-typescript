
Корневой класс всех контроллеров системы AbstractRequestHandler
Обеспечивает сохранение в контроллере объектов запроса, ответа и функции Next.
Также обеспечивает количество аргументов (3 или 4) для правильной работы Express.
Также обеспечивает запуск стратегии поведения контроллера.



Стратегия поведения контроллеров

Встроенные контроллеры
ErrorController
Controller

уже подключены к следующей стратегии поведения:

ControllerStrategy




Базовый контроллер Controller




Контроллер может возвращать:

undefined или null
ViewModel
Ошибку Error
Что-то иное (впоследствии это будет обернуто во ViewModel)
Обещание всего перечисленного выше

Если контроллер вернул undefined или null, то стратегия поведения ничего не обрабатывает. В этом случае
считается, что обработкой результатов занимается сам контроллер или его плагин.

Если контроллер возвращает неизвестный объект, то он помещается в переменную body ViewModel-и.
return 'Привет мир!';

Если контроллер возвращает ошибку, то происходит редирект на контроллер ошибок next(err)
throw new Error();
return new Error();
return Promise<Error>;
return Promise<throw Error>;


Контроллеры имеют встроенный плагин RedirectRequestHandlerPlugin для реализации следующего функционала:

Редирект на URL
Редирект на следующий контроллер next()
Редирект на следующий маршрут next('route')
Редирект на следующий маршрут next('router')

this.pluginManager.get('redirect').toNextController();
this.pluginManager.get('redirect').toRouter();
this.pluginManager.get('redirect').toRoute();
this.pluginManager.get('redirect').toUrl();


