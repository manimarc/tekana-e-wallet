# Tekana-e-wallet Project READYME
## Action Plan 
### Day 1-5
### Back-end solution
The Goal is to build from scratch a back-end solution that serves 1 million customers around the world.
### Project Scope
This project will be limited to the design and development of a new e-wallet solution with the enumerated activities:
- Gather requirements analysis
- Make a deep research and analysis of latest technology stack
- Development and testing features
- Deploy the deleverables into production
### Strategies and Techniniques
1. Meeting with the business team, front-end team, UI or UX Engineers and Product Owner allows to get insigth of the intended system.
2. Determine the programming language , framework, database, hosting infrasture due to besiness requirements, scalability, data types, availability and security
3. Follow engineering best practices, such as writing clean, well-documented code and performing thorough testing.
5. Design , code and deploy
### Methodology
Agile methodology is used by breaking the project into phases and emphasizes continuous collaboration and improvement

#### Gather requirements analysis from users (User stories)
The mimimum required features to be built are:
    - Create, Read customers (Registration)
    - Create and read wallets of customers
    - Create and read transactions.
And turned into user stories as a way formulate the tasks and selecting the priority:
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
- Server : Linux version 20.4 (Ubuntu prefered)
- Docker image (to allow easy installation and configuration)

- [NestJS + Express](https://nestjs.com/) allows to develop API that listens to HTTP request and handle responses
- [Typescript](https://www.typescriptlang.org/) Which means it checks if the specified types match before running the code, not while running the code.
- [MongoDb](https://www.mongodb.com/docs/) (due to its scalability and performance compared to structured query languages)
- Microservice Layer: [RabbitMQ](https://www.rabbitmq.com/), it is a language agnostic microservice architecture; It allows variations of pub-sub, request-response, and point to point pattern; rabbitMQ can be synchronous/ asynchronous; push based approach; priotirize messages and decoupled consumer queues

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
| /transactions | post   | Creates new wallet transanction for user or customer, login required                                    | {<br>description: string<br>type: string<br>password: string<br>wallet_debited:string<br>debited_amount:number<br>wallet_credited:string<br>credited_amount:string<br>fee_or_charges:number<br>currency_credited:string<br>currency_debited:string}                                                                  | HTTP: 201 CREATED  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>}                                                                                                                                                                                            |
| /transactions | get   | Administrator will display all transactions, login required                                    |                                                                   | HTTP: 200 OK  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>}                                                                                                                                                                                            |
| /transactions/{id} | get   | Administrator will display a transaction by using transaction \_id, login required                                    |                                                                   | HTTP: 200 OK  <br>{<br>reference_id:string<br>description:string<br>credited_amount:number<br>debited_amount:string<br>type:string<br>status:string<br>balance_before_debited:string<br>balance_after_debited:string<br>balance_before_credited:string<br>balance_after_credited:string<br>wallet_credited:string<br>wallet_debited:string<br>fee_or_charges:number<br>currency_debited:string<br>currency_credited:string<br>createdAt:date<br>createdBy:string<br>\_id:string<br>} |

## Description

Tekana-e-wallet system is a system that will allow all users around the world to transfer, send, receive, deposit, pay, borrow wallet with an easy way.

## Installation
- Clone the repository
```
git clone https://github.com/manimarc/tekana-e-wallet.git
```
- Configure and run docker compose file
```bash
# copy .env.example into .env for environment configuration
$ sudo cp .env.example  .env
# Download and install Mongodb image using docker composer
$ sudo docker-compose up   -d

```
- Install dependencies

```bash
# packages using yarn for the app
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
# seeding the data for user credential
$ sudo yarn nestjs-command create:user
# or seeding the data for user credential with
$ sudo npx nestjs-command create:user

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
- Once the start script is done, the API Gateway will be listening on [http://localhost:3000](http://localhost:3000)

## Mongodb design

![database structure](wallet%20db%20design.png)

# Roadmap

### General

- [ ] Add Integration Tests
- [ ] Add CI/CD Pipeline
- [ ] Add Kubernetes Manifests
- [x] Pre-populate DBs
- [ ] Configure NGinx Load Balancer
- [ ] Distributed Tracing

### API Gateway
- [ ] convert one currency to another
- [ ] Refund customers
- [ ] Add request/input data validation
- [ ] Add Logs Monitoring

### Microservices and Database

- [ ] Add unit tests
- [ ] Add caching with Redis
- [ ] Configure database replica set
