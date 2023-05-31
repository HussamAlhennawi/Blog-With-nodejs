<h1 align="center">Blog With node.js</h1>

<br><br>

## About The Project
Blog With node.js is a simple blog system build using:
- Back-end: node.js & express.js
- Database: MongoDB 
- View engine: ejs
- CSS style: Tailwind

## Features
- Authentication using JWT
- CRUD operations on Blog

## Instructions
after cloning the project you may use these command to install dependencies and prepare your .env file:
> These command will make .env file and generate a secret key to use it when sign & verify JWT
```
npm i
node initProject.js
```
> Before run the command below make sure to modify DB_URI variable in .env with your credentials (username & password) and (cluster name & database name)
```
node app
```
> Then open you browser:
```
http://localhost:8000
```

## Feedback
I will be happy to hear from you, if you have any suggestion or feedback please share it with me on my **[E-mail](mailto:alhennawi.hussam@gmail.com)**.

## License
This Project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## 
Finally Thanks to **[Freecodecamp](https://www.youtube.com/c/Freecodecamp)** & **[NetNinja](https://www.youtube.com/@NetNinja)** tutorials which help me to learn node.js and build this project.
