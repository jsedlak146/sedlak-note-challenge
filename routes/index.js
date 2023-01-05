//make router, export it

let router = require ("express").Router()
let dataBase = require ("../db/db.json")
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');
    
//Get route for /api/notes
router.get('/notes', (req, res) =>{
    console.log('route hit')
    res.json(dataBase);
});

router.post('/notes', (req, res) =>{
    console.log(req.body)
    req.body.id = uuidv4()
    dataBase.push(req.body)
    fs.writeFile('db/db.json' , JSON.stringify(dataBase) , err => {
        if (err) throw err
        // else {
        //     console.log("Note written successfully\n");
        //     console.log("The database has the following contents:");
        //     console.log(fs.readFileSync("../db.json", "utf8"));
        // }
    })
});

router.delete('/notes/:id', (req) => {
    const { id } = req.params
    let db = dataBase.filter(note => note.id != id)
    fs.writeFile('db/db.json' , JSON.stringify(db) , err => {
        if (err) throw err
        // else {
        //     console.log("Note deleted successfully\n");
        //     console.log("The database has the following contents:");
        //     console.log(fs.readFileSync("../db.json", "utf8"));
        // }
    })
    dataBase = db
})

module.exports = router
