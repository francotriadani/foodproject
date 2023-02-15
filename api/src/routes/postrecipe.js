const { Router} = require('express');
const {Recipe, Diet} = require('../db');

const router = Router();

router.post('/', async (req, res) =>{
    try{
        const{name,summary,healthscore,stepbystep,dietTypes} = req.body
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthscore,
            stepbystep
        })

        let dietTipeRecipeDB = await Diet.findAll({
            where: {name:dietTypes}
        })
        newRecipe.addDiet(dietTipeRecipeDB)
        res.status(200).send(newRecipe)
    } catch (error){
        next(error)
    }
})


module.exports = router;