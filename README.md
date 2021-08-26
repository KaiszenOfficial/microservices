### A collection of simple NodeJS services

**Node Auth**
*A simple registration and login service.*
>- Register and user.
>- Login using any registered user credentials.
>- Login returns **Jsonwebtoken** and the user details. The jsonwebtoken is created based on the user credentials submitted during registration.

**Node Fileupload**
*A simple fileupload service.*
>- Upload any file and store in **MongoDB**.
>- Uses **GridFS** for uploading and reading the file from MongoDB

**Node Mail**
*A simple mailing service.*
>- Send emails using nodemailer as a service

**URL Shortener**
*A simple service which shortens URLs into compact ones.*
>- Very similar to the URL shortening done by services like Bitly or TinyURL

#### Tech Stack
*My tech stack of choice for this little project was **NodeJS (Express)** with **MongoDB** for storing all the data.*

#### Current Version and Future plans
*Most of the services are pretty much ready for use. Node Mail service still needs some work and there needs to an UI which can be used to interact with all the services for better understanding and visualization.*