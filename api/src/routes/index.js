const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//requerimos axios para hacer los routes

const routerRecipes = require("./recipes");
const routerTypes = require(`./types`);
const routerPostRecipe = require('./postrecipe');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(`/recipes`, routerRecipes)
router.use(`./types`, routerTypes);
router.use('./postrecipe',routerPostRecipe)





module.exports = router;
