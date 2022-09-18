
# BoadCamp API

<p align="center">
   <img width=350 src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5fa-fe0f.svg"/>
</p>

- Em um mundo onde o digital tomou conta de tudo, muitas coisas ficaram esquecidas em nossas lembranças
- E se pudéssemos alugar um filme ou jogo em uma LOCADORA? assim como faziam os maias, incas e astecas?
- Esta é uma api de locadora, onde você pode registrar seus jogos e disponibizar para outras pessoas o alugarem

- [Veja meu deploy na heroku aqui]()

***

## Como usar

Instale meu projeto, crie um banco de dados com os comandos SQL na pasta database-boardcamp e configure o .env como no exemplo

```bash
  git clone git@github.com:marcojr73/projeto15-boardcamp.git
```

```bash
  npm i
  
  npm run dev
```

***

##	 Tecnologias e Conceitos

- Node.js
- Express
- Joi
- layered architecture
- Postgres
- SQL

***
    
## API Reference

#### Insert a ner customer

```
  POST /customers
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`name` | `string` |
| `body` |`phone` | `string` |
| `body` |`cpf` | `string` |
| `body` |`birthday` | `string` |
cpf format must be XXXXXXXXXXX
phone format must be XXXXXXXXXXX
birthday format must be DD/MM/YYYY

#### List all customers

```
  GET /customers
```

#### Find customer by cpf

```
  GET /customers?cpf=${cpf}
```

#### Find customer by id

```
  GET /customers:id
```

#### Updade data customer

```
  PUP /customers:id
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`name` | `string` |
| `body` |`phone` | `string` |
| `body` |`cpf` | `string` |
| `body` |`birthday` | `string` |
cpf format must be XXXXXXXXXXX
phone format must be XXXXXXXXXXX
birthday format must be DD/MM/YYYY

#### Insert an new category

```
  POST /categories
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`name` | `string` |

#### Insert an new game

```
  POST /games
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`name` | `string` |
| `body` |`image` | `string` |
| `body` |`stockTotal` | `number` |
| `body` |`categoryId` | `number` |
| `body` |`pricePerDay` | `number` |

#### List all games

```
  GET /games
```

#### Insert a new rental

```
  POST /rentals
```

| sent by |Parameter | Type     |             
| :-------- |:-------- | :------- | 
| `body` |`customerId` | `number` |
| `body` |`gameId` | `number` |
| `body` |`daysRented` | `number` |

#### Insert a new rental return

```
  POST /rentals:${id}
```

#### List all rentals

```
  GET /rentals
```

#### Delete rental

```
  DELETE /rentals:${id}
```



