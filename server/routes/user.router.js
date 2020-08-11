const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res, next) => {  
  const client = await pool.connect();
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  let user_id = '';
  let project_id = '';
  const addUserText = `INSERT INTO "user" (username, password) 
  VALUES ($1, $2) RETURNING id`;
  try {
    await client.query('BEGIN')
    const response1 = await client.query(addUserText, [username, password]);
    const addProjectText = `INSERT INTO "project" ("user_id", "being_created") 
    VALUES ($1, FALSE) RETURNING "user_id", "id";`; 
    const response = await client.query(addProjectText, [response1.rows[0].id]);
    user_id = response.rows[0].user_id;
    project_id = response.rows[0].id;
    const addDetailsText = `INSERT INTO "project_details" 
    ("id", "project_name", "start_date") 
    VALUES ( $1, 'General Storage', NOW()) RETURNING "id";`;
    await client.query(addDetailsText, [project_id]); //this names the project and gives it a start date
    const getPossibleColorsText = `SELECT "id" FROM "possible_thread" ORDER BY "id";`;
    const { rows } = await client.query(getPossibleColorsText);
    const addColorNeededText = `INSERT INTO "thread_needed" 
    ( "project_id", "color_id") VALUES 
    ( $1, $2);`;
    for (i=0; i<rows.length; i ++) {
      await client.query(addColorNeededText, [project_id, rows[i].id]);
    }
    await client.query('COMMIT');
    await res.send({id: user_id});
  }
  catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
  finally {
    client.release();
  }
  
});


 //isnt' currently used. Should create a new project when a user is created
 router.post('/', rejectUnauthenticated, (req, res) => {
  let sqlText = `
  INSERT INTO "project" ("user_id", "being_created") VALUES ($1, FALSE) RETURNING "id";`;
  pool.query(sqlText, [req.body.data.id]).then( response => {
      let newSqlText = `INSERT INTO "project_details" 
      ("id", "project_name", "start_date") 
      VALUES ( $1, 'General Storage', NOW());`;
      pool.query(newSqlText, [response.rows[0].id]).then( response => {
          res.sendStatus(200);
      }).catch( error => {
          console.log('error in making a new project', error); 
          res.sendStatus(500);
      });
  }).catch( error => {
      console.log('error in making general storage project', error); 
      res.sendStatus(500);
  });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
