# Dan Store - Node.js project
# Introduction
Welcome to the Dan Store web application! This project is designed to help you set up a simple online store management system. Dan Store allows you to manage product listings, gather customer opinions, and provides an "About Us" page to share information about your business and its vision.
# Getting Started
Before you can start using this project, please follow these steps to set up your development environment:
# Prerequisites
You should have **Node.js** and **npm** (Node Package Manager) installed on your computer and **mysql database server**.
# Installation
1.	Clone this repository to your local machine:
   
        git clone https://github.com/belteshazzer/dan-store.git

3.	Navigate to the project folder:

        cd dan-store

5.	Install the project dependencies:

        npm install mysql2

        npm install cors

6.	Create a MySQL database by running the SQL operations provided in the #databaseOperation.txt file.

# Configuration
Update the server.js file with your MySQL database connection details. You can find this file in the project's "api" directory.

        const connection = mysql.createConnection({
            host: 'your-database-host',
            user: 'your-database-user',
            password: 'your-database-password',
            database: 'your-database-name',
          });

# Usage
1.	Run the server application:
   
          node api/server.js
2.	now you can communicate with your database through http://localhost:3000 to access the Dan Store.
3.	then open the html files in your browser

# Features
**Product Management**: You can add, edit, and delete products.

**Customer Opinions**: Gather customer feedback and messages using the "Contact Us" page.

**About Us Page**: Share information about your business and its vision.

# Contact
For any questions or support, please contact:

  Your Name: Daniel Yirdaw
  
  Project Repository: https://github.com/belteshazzer/dan-store
