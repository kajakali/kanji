const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all the projects and their details for the logged in user
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    let sqlText = `SELECT * FROM "project" 
    JOIN "project_details" ON "project_details"."id" = "project"."id" 
    WHERE "user_id" = $1 AND "being_created" = FALSE;`; //TODO also don't show the General storage project = WHERE project_name is NOT General Storage
    pool.query(sqlText, [req.user.id]).then( response => {
        res.send(response.rows);
    }).catch( error => {
        console.log('error in getting projects', error);
        res.sendStatus(500);
    }); 
});
//GET any project that hasn't been finished being created
router.get('/add', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    let sqlText = `SELECT * FROM "project" 
    LEFT JOIN "project_details" ON "project_details"."id" = "project"."id"
    WHERE "user_id" = $1 AND "being_created" = TRUE;`;
    pool.query(sqlText, [req.user.id]).then( response => {
        console.log('this is the project that has not been finished', response.rows);
        res.send(response.rows);
    }).catch( error => {
        console.log('error in getting projects', error);
        res.sendStatus(500);
    });    
});

//GET the information about the project with a specific id. The user_id is redundant but a safety measure
//to prevent users from getting other people's projects
router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('the project id and the user id for the project we are fetching', req.params.id, req.user.id);
     let sqlText = `SELECT * FROM "project" 
    JOIN "project_details" ON "project_details"."id" = "project"."id"
    WHERE "user_id" = $1 AND "project"."id" = $2;`;
    pool.query(sqlText, [req.user.id, req.params.id]).then( response => {
        res.send(response.rows);
    }).catch( error => {
        console.log('error in getting projects', error); 
        res.sendStatus(500);
    });
 
    
});
/**
 * POST route template
 */

 
router.post('/add', rejectUnauthenticated, async (req, res) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        const { id } = req.user
        const newProjectText = `INSERT INTO "project" ("user_id") VALUES ($1) RETURNING "id";`;
        const { rows } = await client.query(newProjectText, [id]);
        const newDetailsText = `INSERT INTO "project_details" ("id") VALUES ($1) RETURNING "id";`;
        await client.query(newDetailsText, [rows[0].id]);
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error
    }
    finally {
        client.release()
    }
})


/* router.post('/add', rejectUnauthenticated, (req, res) =>{
    let sqlText = `INSERT INTO "project" ("user_id") VALUES ($1) RETURNING "id";`;
    pool.query(sqlText, [req.user.id]).then( response => {
        let newSqlText = `INSERT INTO "project_details" 
        ("id") 
        VALUES ($1) RETURNING "id";`;
        console.log('in post add step 1', response.rows[0].id);
        pool.query(newSqlText, [response.rows[0].id]).then( response => {
            console.log('in post add step 2', response.rows[0].id);
            res.sendStatus(200);
        }).catch( error => {
            console.log('error in making a blank new project', error); 
            res.sendStatus(500);
        });
    }).catch( error => {
        console.log('error in creating a new blank project', error);
        res.sendStatus(500);
    });
}); */

//PUT to mark a project that was being created as a normal project that is no longer going to show up
//when the user goes to the add project page
router.put('/save', rejectUnauthenticated, (req, res) => {
    console.log(req.body.data, req.user);
    let sqlText = `UPDATE "project"
    SET "being_created" = FALSE
    WHERE "id" = $1 AND "user_id" = $2 RETURNING "id";`;
    pool.query(sqlText, [req.body.data.project_id, req.user.id]).then( response => {
        res.send({project_id: response.rows[0].id});
    }).catch( error => {
        console.log('error in updating project', error);
        res.sendStatus(500);
    });
})
//TODO:  have this piece of sql code happen next so that a start date is assigned
/* UPDATE "project_details" 
SET "start_date" = NOW() 
WHERE "id" = $1 AND "user_id" = $2 RETURNING "id"; */
router.put('/change', rejectUnauthenticated, (req, res) => {
    console.log('changing project name', req.body.data.project_id, req.body.data.project_name, req.user.id);
    let sqlText = `UPDATE "project_details" 
    SET "project_name"=$2 WHERE "id"=$1 RETURNING "id";
    `;
    pool.query(sqlText, [req.body.data.project_id, req.body.data.project_name]).then( response => {
        res.send({project_id: response.rows[0].id});
    }).catch( error => {
        console.log('error in updating project', error);
        res.sendStatus(500); 
    });
})

router.put('/image', rejectUnauthenticated, (req, res) => {
    console.log('changing project image', req.body.data.project_id, req.body.data.project_image, req.user.id);
    let sqlText = `UPDATE "project_details" 
    SET "project_image"=$2 WHERE "id"=$1 RETURNING "id";
    `;
    pool.query(sqlText, [req.body.data.project_id, req.body.data.project_image]).then( response => {
        res.send({project_id: response.rows[0].id});
    }).catch( error => {
        console.log('error in updating project', error);
        res.sendStatus(500); 
    });
})

module.exports = router;