Backend build using Nodejs + Typescript + Postgres

Hosted live link

https://theitbackend.onrender.com/api/users  ( since we are on free trail, in random intervals the hosted service goes idle. in that case atleast wait for 30 secs it will load ) 

Supported apis

/api/users /GET  -  Get all users

/api/users /POST  -  Create a user

/api/users/:id /PUT  -  Update a user

/api/users/:id /DELETE  - Delete a user

/api/users/email /POST  -  Send selected rows in email


How to setup locally.

update .env file to your own keys
```
DB_USER=postgres
DB_PASSWORD=<yourpassword>
DB_NAME=testdatabase
DB_HOST=localhost
DB_PORT=5432
PORT=4000
# NODE_ENV=production
EMAIL=<your email> 
EMAIL_PASSWORD=<Email app secret>
```

Email and Email password ( APP PASSWORD ) is requried to send emails successfully. ( configure the app password for your gmail and then use it )


To run

```
npm i
npm run dev
```


Check the terminal for the successful database connection. if not setup the database correctly.

Use postman to test the endpoints. Or you can connect this link to the frontend via .env and test it right away.



High level diagram


![Screenshot 2023-12-16 at 10 59 46 AM](https://github.com/venkateshwebdev/theitbackend/assets/105224564/cf435ce1-73c4-4aaa-bdb6-fc2ea463261d)


Table

![Screenshot 2023-12-16 at 11 07 24 AM](https://github.com/venkateshwebdev/theitbackend/assets/105224564/da35f8d9-7ce7-48a3-874d-c5326230c3ea)




