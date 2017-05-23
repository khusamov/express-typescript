# express-typescript

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