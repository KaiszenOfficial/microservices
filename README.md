# NodeJS Services

> _A small collection of NodeJS services written in order to understand and learn some of the key aspects of coding server side logic for your business and learning purposes_.

### Included projects are
- ### Node Auth
	**_Description_**
	> The basic idea of this project is to implement a simple Login/Registration process and understand how authentication works.

	**_Key features_**
	- Setting up basic Express server.
	- Using mongoose to establish database connection [[Mongoose Documentation](https://mongoosejs.com/)].
	- Creating a basic User model to store user information.
	- Working with JsonWebTokens - creating, signing and verifying a jsonwebtoken.

- ### URL Shortener
	**_Description_**
	> The basic idea of this project is to implement an URL shortening service similar to [Bitly](https://bitly.com/).

- ### Node File upload
	**_Description_**
	> The basic idea of this project is to implement a file upload service to store files in MongoDB using [GridFS](https://docs.mongodb.com/manual/core/gridfs/).

	**_Key features_**
	- Using GridFS to store uploaded file in MongoDB.
	- Storing file metadata in separate collection.
	- Read the file from the database using the filename generated.

- ### Node Mail
	**_Description_**
	> The basic idea of this project is to implement an email service using [Nodemailer](https://nodemailer.com/about/) and [Email Templates](https://www.npmjs.com/package/email-templates).

	**_Key features_**
	- Setting up Nodemailer service.
	- Creating and displaying pre-build HTML templates.
	- Accepting custom HTML templates from user.