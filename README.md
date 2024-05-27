# ZGaming Rest API

## Enviroment Variables
If this is the first time you clone the repo is important to create the ```.env``` file so that you can set up your own settings. I'll show an example


- root-> mysql username
- localhost:3306 -> port where the database is running
- products-db-> database name

> Note: You need to create the database in your mysql server before setting up this config
```js

DATABASE_URL = "mysql://root:@localhost:3306/products-db"


```


### Create and seed the database

Run this command to migrate all the models to the database without triggering "seed.js'. 

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered.  The seed file in [`prisma/seed.js`](./prisma/seed.js) will be executed and your database will be populated with the sample data.

> Note: For this project use the second command ```npx prisma migrate dev``` to load the data sample in ```seed.js```


### Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

### `POST`


### `PUT`

### `DELETE`

###