# Tekana-e-wallet Project READYME
## Action Plan 
### Day 1-4
#### Gather requirements analysis from users (User stories)
- As a wallet user I want a system that allows me to perform online registration so that i can start using it
- As a wallet user I want a system that allows me login so that i feel confident of my wallet security
- As a wallet user I want an interface that allows me to transfer wallet from my accounts to another user's account so that so that payments become easy
- As a wallet user I want a interface that allows me to create wallet with different currency so that I can store wallet in diffent currency.
- As wallet Agent I want a system that allows me to create and update a user so that user managent become easy
- As a wallet agent I want a system that allows me to deposit user's wallet on their accounts so that their accounts being used
- As a wallet agent I want an interface that allows me to fetch user's account so that i will be able to perform wallet deposit or transaction
As wallet administrator I want a system that allows me to list all users so that i can manager them
- As a wallet administrator I want a system that allows me to list all wallet accounts so that i can manage users' wallets
- As a wallet administrator I want a system that allows to list all transaction so that i can manage all users' transactions 
#### Design the database structure
- The link is provided at thebottom of the document
- The link can also be accessible to : [database structure](https://dbdiagram.io/d/63b5a4bc7d39e42284e8eb82)
#### Adopt Agile SDLC model (by priotirizing the requirements based on user story, develop and deliver the finished product)
- As I work in a team and adopting agile SDLC model scrum is preferable so that scrum master will be able to monitor the progress of the project
- different tools to monitor the project and allow the whole team to know the progress are available such as Jira, ClickUp, ...
#### Choose the best technology to handle 1 million of users.
- Server : Linux (Ubuntu prefered)
- Docker image (to allow easy installation and configuration)
- Nestjs
- Typescript
- MongoDb (due to its scalability and performance compared to structured query languages)
## Day 5-8
- Create Users end-points
- Perform Authentication(username and possword, token should be accessible using http only to avoid hackers accessing it using javascript, encrypt the password using bcrypt library ) and Authorization (limiting some resources based on user role).
- Create Wallet end-points
- Create Transaction end-points
## Day 8-9
#### End points documentation

| ADDRESS:://{ }                             | METHOD | NOTES                                                                                | REQUEST                                                           | RESPONSE                                                                                                                                                                                              |
| ------------------------------------------ | ------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /auth/login                           | post   | Client browser receives Authentication as a cookie                                    | {<br>email: string,<br>password: string,<br>}                      | HTTP: 200 OK<br>{<br>_id: string,<br>email: string,<br>names:string,<br>phone:string,<br>role:string,<br>status:string,<br>}                                                                                                                                             |
| /auth/sign-up                           | post   | Client browser receives a session\_id as a cookie                                    | {<br>names: string<br>email: string<br>password: string<br>phone:string<br>} | HTTP: 201 CREATED<br>{<br>_id:string<br>email: string<br>names: string<br>role:string<br>status:string}                                                                                                                                        |
| /users                                  | get    | Returns all users |        | HTTP: 200 OK<br>{<br>\_id: string<br>names: string<br>email: string<br>phone: string<br>} |
| /users/{id}                           | get      | Client browser receives a session\_id as a cookie                                 |   | HTTP: 200 Ok<br>{<br>\_id:string<br>email: string<br>names: string<br>role:string<br>status:string<br>}                                |
| /users                      | post   | Client browser receives a session\_id as a cookie                                    | {<br>names: string,<br>email: string,<br>password: string,<br>phone:string<br>} | HTTP: 201 CREATED<br>{<br>\_id:string,<br>email: string,<br>names: string,<br>role:string,<br>status:string}                                                                                                                                        |
| /users/{id}                         | patch   | Client browser receives a session\_id as a cookie                                    | {<br>names: string<br>email: string<br>password: string<br>phone:string<br>} | HTTP: 201 CREATED<br>{<br>\_id:string<br>email: string<br>names: string<br>role:string<br>status:string<br>}                                                   |
| /wallet               | post   | Creates a new wallet, login required                                             | {<br>balance: number,<br>currency: string,<br> user\_id:string<br>} | HTTP: 201 CREATED<br>{[wallet:{<br>\_id:string,<br>balance: number,<br>currency: string,<br>user\_id:string,<br>},user:{<br>\_id:string,<br>email: string,<br>names: string,<br>role:string,<br>status:string<br>}]}                                                                                                                                       |
| /wallet/{id}               | get    | Returns user wallet by id  , login required                                          |                        | HTTP: 200 OK<br>\[wallet:{<br>_id:string,<br>balance: number,<br>currency: string,<br>user_id:string,<br>},user:{<br>_id:string,<br>email: string,<br>names: string,<br>role:string,<br>status:string<br>}]        |
| /wallet/userid               | get    | Returns user wallet by user_id  , login required, {userId} query params |                                                                   | HTTP: 200 OK<br>{[wallet:{<br>_id:string,<br>balance: number,<br>currency: string,<br>user_id:string,<br>},user:{<br>_id:string,<br>email: string,<br>names: string,<br>role:string,<br>status:string<br>}]}        |
| /wallet/userid_currency                | get    | Returns user wallet by user_id and currency , login required, {userId, currency} query params |                                                                   | HTTP: 200 OK<br>\{[<br>wallet:{<br>_id:string,<br>balance: number,<br>currency: string,<br>user_id:string,<br>},<br>user:{<br>_id:string,<br>email: string,<br>names: string,<br>role:string,<br>status:string<br>}]}        |
| /transactions | post   | Creates new wallet transanction for user or customer, login required                                    | {<br>description: string<br>type: string<br>password: string<br>wallet_debited:string<br>debited_amount:number<br>wallet_credited:string<br>credited_amount:string<br>fee_or_charges:number<br>currency_credited:string<br>}                                                                  | HTTP: 201 CREATED  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>}                                                                                                                                                                                            |
| /transactions | get   | Administrator will display all transactions, login required                                    |                                                                   | HTTP: 200 OK  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>}                                                                                                                                                                                            |
| /transactions/{id} | get   | Administrator will display a transaction by using transaction \_id, login required                                    |                                                                   | HTTP: 200 OK  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>} |

## Description

Tekana-e-wallet system is a system that will allow all users around the world to transfer, send, receive, deposit, pay, borrow wallet with an easy way.

## Installation

```bash

# Download and install Mongodb image using docker composer
$ sudo docker-compose up   -d
# packages using yarn for the app
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Mongodb design

![database structure](wallet%20db%20design.png)

## Version plan
1. Refund customers
2. convert one currency to another
3. perform end to end testing
