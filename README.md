# Kanji

This will be an app to use the kanji api to learn my kanji.
I'm starting with my solo project, though.


# Cross Stitch Buddy


## Description

_Duration: 2 Week Sprint_

I love to cross stitch but I have trouble keeping track of all the thread. I always have left over half skeins and even almost whole skeins at the end of a project, but I'm usually working on several projects at the same time, and I never know if I actually need to buy another skein of thread, or if there's enough available in some other project. So I built cross stitch buddy to keep track of all my skeins of thread and which projects they are located in, so that I would always know where to find spare string (or if I really truly need to go to the store and buy more). I store a list of all the standard DMC colors of thread in my database, and then store line items for the threads that I need and the threads that I have which reference that table of possible DMC threads. Each line item is also associated with a project.

To see the fully functional site, please visit: cross-stitch-buddy.herokuapp.com
try logging on as mia, password mia, to see how the app is used


### Prerequisites

Link to software that is required to install the app (e.g. node).


- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Installation

1. Create a database named `cross_stitch_buddy`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries
3. Create a `.env` file at the root of the project and paste this line into the file:
    ```
    SERVER_SESSION_SECRET=superDuperSecret
    ```
    While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
4. Start postgres if not running already by using `brew services start postgresql`
5. Open up your editor of choice and run an `npm install`
6. Run `npm run server` in your terminal
7. Run `npm run client` in your terminal
8. The `npm run client` command will open up a new browser tab for you!

## Usage

1. Mia likes to cross stitch. She logs on to cross stitch buddy to keep track of her string
2. On the home page, Mia can look at the threads she has or the projects she has
3. From the projects list, Mia can add a new project. She can name the project, add a url of an image of the project, select which threads are needed for that project and how much of each thread is needed. If she navigates away from the page while setting up a new project, the project will be stored until she comes back and finishes it, at which time she can select "Save"
4. Once the new project is saved, it will show up in her projects list. From there, she can navigate to the project and add skeins of string that she has to it, or edit them or delete them.
5. From the project page it is possible to see how much string is needed for the project and how much is available overall (in her whole collection). If she views that string, she can see where each piece of string is located. 
6. If Mia sees an ad for thread on sale, she can just go to the threads page and scroll down it, and she can easily see, in red, which strings she actually needs to buy at the store (as opposed to which strings she could take from another project)


## Built With
- Node.js
- Express
- React
- Redux
- Redux-Saga
- Material UI


## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application, and thanks to Dijksra Cohort!

