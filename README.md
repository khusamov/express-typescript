# express-typescript


Продолжение разговора про миксины (ну и долго же они реагируют)
https://github.com/Microsoft/TypeScript/issues/15870#issuecomment-308491310


РАБОЧИЕ ССЫЛКИ

https://toster.ru/q/411980
http://zf2.com.ua/doc/68
https://framework.zend.com/manual/2.4/en/tutorials/tutorial.eventmanager.html
http://zf2.com.ua/doc/130
https://github.com/zendframework/zendframework
https://github.com/zendframework/zend-mvc/blob/master/src/Controller/PluginManager.php
https://github.com/zendframework/zend-servicemanager/blob/master/src/AbstractPluginManager.php
http://www.stoimen.com/blog/2010/05/25/download-files-with-zend-framework/

Прототип 

https://github.com/romakita/ts-express-decorators
https://github.com/Romakita/ts-httpexceptions


Запуск разработки
-----------------

Пока в двух терминалах:

```
tsc -w

nodemon dist/test
```


Публикация
-----------------

Один раз авторизоваться на NPM

```
npm adduser
```

Перед публикацией увеличить номер версии в файле `package.json`.

```
tsc
npm publish
```