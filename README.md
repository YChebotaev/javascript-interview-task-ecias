# JavaScript Interview Task

Hi dear candidate,

You should implement a client-server application. All its features are described in the general description section.

The application's technology stack:

- NodeJs (backend),
- Vue.js or React (frontend).

Feel free to use any libraries which might help you, e.g. Axios.

## General description

The application allows users to upload and download documents. Each user can upload a new document using a special
form by attaching a PDF file and filling in required fields.

The document's upload form contains the following fields:

- Title of the document (the required field, 100 characters maximum);
- General description of the document (not required field, 255 characters maximum);
- Input field to attach a PDF file (the input must accept only PDF files with size no more 10Mb).

There are 2 views:

- An index page where user can view all uploaded documents. For each document the application must display its title,
  description and the download link;
- A page with the uploading form.

Each user is able to delete any document.

## Optional task

Implement a simple authorization based on JWT. The registration is not required.
It will be enough to mock a single user.

# Up and running

## 1. Start database

```shell
chmod +x start_mongodb.sh
./start_mongodb.sh
```

## 2. Start frontend

```shell
cd frontend
npm install
npm start
```

## 3. Start backend

```shell
npm install
npm start
```
