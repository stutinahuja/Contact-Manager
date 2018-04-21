Technologies used in this project

Web API : C#
UI : Angular2

To Run the application :
1. Open the solution in Visual Studio 2017
2. If angular enviorenemnt is not set up please follow the instructions at path : https://angular.io/guide/setup
3. Run following scripts in SQL Server Management studio so as to make the database ready:
   a. create database Contacts
   b. create table ContactsData (
      FirstName varchar(255),
      LastName varchar(255),
      Email varchar(255),
      PhoneNumber VARCHAR(20),
      Status BIT,
      ContactId int NOT NULL,
      PRIMARY KEY (ContactId)
      )
4. Update the SQL Connection string in DataAccessManager class
5. Set the startup project "ContactsManagerWebApi" and run the project. Web API will be launched.
6. To run the UI, launch command prompt and switch to "ContactsManagerAngularUI" directory and run the command "npm start"
7. UI will be launched in browser.