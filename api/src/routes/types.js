const {Router} = require('express');
const{dietTypesDb} = require('../controllers/recipes');
const db = require('../db');
const {Diet} = require('../db');

const router = Router();

router.get('/', async(req, res)=>{
    try{
        dietTypesDb.forEach(el=>{
            Diet.findOrCreate({
                where:{name: e}
            })
        });
        const dietTypes = await Diet.findAll();
        res.send(dietTypes)
    } catch (error) {
        next(error)
    }
})

module.exports = router;