Щоб все працювало треба спочатку запустити сайт "npm run serverStart"
далі не закриваючи вкладку у браузері перейти до термінала нажміть Ctrl + C и напишіть "npm run dataStart" и після цього поверніться на сайт и все буде працювати

ще можна відкрити два термінала на першому запустити сайт а на другому запустити json-server

http://localhost:3000/students  данні

http://localhost:3000/index.html  сайт

npm run serverStart

json-server --watch students.json --port 3000
