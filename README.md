The primary use of this app is to create and manage projects and it's related tasks and users. An _Admin_, who is built into the system will create _Projects_ and assign a _Project Manager (PM)_ to it. The PM will later add _Tasks_ into the project and assign each task to registered _Users_.

The three user roles in this application are:

- Admin
- Project Manager (PM)
- Employee (User)

All users registered through the /signup page has the **User** role by default. Only admin can change the user role to **PM**.

```
This project is created using the MERN stack on Windows.
```

Steps to start the application:

- Clone the repo
- Run `npm install` inside each of the frontend and backend folders
- Create .env file in the root of backend folder with the following contents

```
DB = "mongodb+srv://guest:12345@projecter.vt3wa4s.mongodb.net/main?retryWrites=true&w=majority"
PORT = 3000
JWT_KEY = fjkerherfui35euifd8932DJFELFH43EFERJKJEH
JWT_EXPIRE = 10d
```

- Run `npm start` inside both folders and start exploring. The shared database is read only.

```
User credentials:
- email: ky@gmail.com
- password: 22222
```

_Created a new repo because of commit duplication issue on the old one. Lost about 100 commits._

Frontend tools:

> React  
> MUI  
> Formik & Yup  
> React Router  
> Axios  
> Redux Toolkit  
> SCSS

Backend tools:

> Node  
> Express  
> Mongoose  
> Dotenv  
> Bcrypt  
> CORS  
> JWT

![Projecter - Home Page](/projecter_frontend/src/assets/images/screenshots/1_home.jpg)

Find more screenshots [here](/projecter_frontend/src/assets/images/screenshots/).

Developed by [Yubin Karki](https://www.linkedin.com/in/yubinkarki/)
