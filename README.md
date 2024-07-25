# Recipe Website Project

## Table of Contents

- [Info](#info)
- [Technologies](#technologies)
- [Tools](#tools)
- [Getting Started](#getting-started)
- [Configuring PostgreSQL](#configuring-postgresql)

Running the Front-end
Running the Back-end
Configuring PostgreSQL
Setting Up pgAdmin and Importing SQL File



## Info
This project is a recipe management tool webpage. It allows users to manage and organize their recipes efficiently.
For testers, our GitHub repository is available at: https://github.com/vykintass/project_automotive_testing.git

## Technologies

Front-end:

- HTML
- CSS
- React
- JavaScript

Back-end:

- Express.js
- PostgreSQL

## Tools

The main coding environment used for this project is Visual Studio Code.

## Getting Started

To run the project, both the front-end and back-end need to be running simultaneously.
Running the Front-end

Navigate to the front-end directory:
cd front

Initialize the project:
npm i

Run the front-end:
npm run dev


Running the Back-end

Navigate to the back-end directory:
cd back

Initialize the project:
npm install

Run the back-end:
npm run dev


## Configuring PostgreSQL
Open the postgres.mjs file in VSCode (located in the back-end directory). Ensure the password is set to admin:
javascriptCopyconst sql = postgres({ 
  host: 'localhost', 
  port: 5432, 
  database: 'recipe', 
  username: 'postgres', 
  password: 'admin', 
});

Setting Up pgAdmin and Importing SQL File
Install pgAdmin

Download and install pgAdmin from the official website.
Follow the installation instructions specific to your operating system.

Create a New Server

Open pgAdmin.
Right-click on "Servers" in the Browser panel.
Select "Create" > "Server...".
Fill in the details:

Name: Enter recipe.
Connection:

Host name/address: localhost
Port: 5432
Maintenance database: postgres
Username: postgres
Password: admin




Click "Save".

Import SQL File

Right-click on the newly created server and select "Create" > "Database...".
Name the database as per your project requirements.
Open the query tool (right-click on the database and select "Query Tool").
Load your SQL file by clicking on the folder icon and select the file (recipeDataWebsite.sql).
Click the play button (or press F5) to execute the SQL file.