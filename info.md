1 установка fastify https://docs.nestjs.com/techniques/performance
eslint restart - исправить ошибку типизации после установки

2 helmet https://docs.nestjs.com/security/helmet#use-with-fastify
для проверки установим hbs https://docs.nestjs.com/techniques/mvc#fastify

3 добавил nest cli assets чтобы при build тоже файлы переносились в dist (понятно для чего вебпак теперь - HOT RELOAD + сжатие картинок и прочее)

4 добавил cors

5 аутентификация - на фронте логин, пароль, почта
yarn add class-validator class-transformer
для валидации DTO на бэке
обязательно для валидации прописать Content-Type': 'application/json иначе приходит строка а не object в body

yarn add @nestjs/typeorm typeorm pg установка БД + yml для docker compose

создали Entity User, подключили в AppModule TypeOrmModule.forRoot , в UserModule TypeOrmModule.forFeature([User])

yarn add bcrypt yarn add -D @types/bcrypt

yarn add @nestjs/jwt

jwt != encryption данные читаемы и base64, secret нужен чтобы никто не подделал токен
JWT = payload + signature - если изменишь payload то поменяется целостность данных(хэш не совпадет) и verify не пройдет
cookie vs header (CSRF vs XSS)

//TODO
client - jwt отправлять
verify and Guard

подтвердить почту и войти (отправка на почту письма)
восстановить пароль через почту и изменить его

3 authentication with hash ( salt pepper hash , registration, login, JWT, verify, restore PASS)
4 simple authorization attribute based access control Encryption
