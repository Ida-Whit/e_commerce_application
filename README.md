## E-Commerce Application

## Description
This program is the back-end of an e-commerce platform. It serves to easily keep track of inventory through product category, product name, and tag information. User can search, create, delete, or modify items on any of the tables through Insomnia. This program is written to an Express.js server and uses sequelize to interact with the data.

## Badges
N/A

## Visuals
<img src="/insomnia_image.png">
Link to video Walkthrough:
https://drive.google.com/file/d/1Kj2s1zJnfF109j9-XKpcyEYu651RD0Kr/view

## Installation
In order to begin with this program, you must first install all dependencies. To do this, run "npm i" in the terminal. Once this is complete, enter the 'db' folders terminal and create your databases through SQL. After that is complete you can now run the command "npm run seed" to seed your database with starter data. Then go to your server.js terminal and enter command "node server.js" to start your server. Once you have the message "App listening on port 3001!" (or whatever port you are using) then you can go over to Insomnia to start interacting with your database. Do this through GET, CREATE, UPDATE, and DELETE commands.

## Usage
This program is able to help users easily interact with a stores data through the back-end. For example, if the user wants to see all products and their associated data, they simply have to run the GET command for products. If the user see a product in this list that should not be there, they can run the DELETE command based on that products id number to delete it from the database.

User is also able to search and interact with product catergories and product tags. If they wish, the user can search a category by its ID number and view all associated data with that category. Lastly, the user can create or update data in any of the tables by running a POST or PUT command.

All commands listed above can be used to interact with all three tables. The url that would be used in Insomnia is listed below for each table. If the user needs to search by a specific id numner, all they have to do is add "/:id" to the end of the address, where ":id" is the id number.

"http://localhost:3001/api/categories"
"http://localhost:3001/api/products"
"http://localhost:3001/api/tags"

## Support
N/A

## Contributing
N/A

## Authors and acknowledgment
This program was written by myself, Ida Whitcomb. With starter code provided by UNH Coding Bootcamp staff and additional help provided by the learning assistants at Ask BCS.

## Project status
This project is complete.