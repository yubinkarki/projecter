The primary use of this app is to create and manage projects and it's related tasks and users. An _Admin_, who is built into the system will create _Projects_ and assign a _Project Manager (PM)_ to it. The PM will later add _Tasks_ into the project and assign each task to registered _Users_.

The three user roles in this application are:

- Admin
- Project Manager (PM)
- Employee (User)

All users registered through the __signup__ page has the **User** role by default. Only admin can change the user role to **PM**. There will be one admin on the database as defined in the environment file.

```
This project is created using the MERN stack. Database is Mongo cloud.
```

Steps to start the application:

- Clone the repo
- Run `nvm use` && `npm install` inside each of the frontend and backend folders
- Create .env file in the root of backend folder with the following contents

```
PORT = 3000
JWT_EXPIRE = 90d
NODE_ENV=development
DB = "your-online-db-url"
JWT_KEY = at-least-32-character-ultra-secure-secret-key
```

- Run `npm start` inside both folders and start exploring.  

Frontend tools:

> MUI  
> SCSS  
> Axios  
> React  
> React Router  
> Formik & Yup  
> Redux Toolkit  

Backend tools:

> JWT  
> CORS   
> Dotenv    
> Bcrypt  
> Express   
> Mongoose   
> Node (v18)    

![Projecter - Home Page](/screenshots/1_home.jpg)

Find more screenshots [here](/screenshots).

Developed by [Yubin Karki](https://yubinkarki.com.np/)
