### Authentication server with Redis and postgreSQL

# This is a simple restApi for server authentication that uses redis to get the jwt very fast and stores user info on postgres

# To retrive the jwt token the api does 2 things:
1) first it tries to grab the token on redis ("userName" is the main key on both redis and postgres)
2) in case the token is not found on redis, it searches it on the postgres database
