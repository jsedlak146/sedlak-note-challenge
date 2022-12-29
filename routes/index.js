//make router, export it

let router = require ("express").Router()
let dataBase = require ("../db/db.json")
const fs = require('fs')
    
//Get route for /api/notes
router.get('/notes', (req, res) =>{
    console.log('route hit')
    res.json(dataBase);
});

router.post('/notes', (req, res) =>{
    console.log(req.body)
    dataBase.push(req.body)
    fs.writeFile('../db/db.json' , JSON.stringify(dataBase) , err => {
        if (err) throw err
    })
    
});

module.exports = router
