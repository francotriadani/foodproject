const {Router} = require("express");//requerimos router
const axios = require("axios");//req axios
const {getApiById,getDatabaseById,getAllrecipes,} = require("../controllers/recipes"); //importamos funciones
const {Recipe, Diet} = require("../db") //importamos el destructuring de db

const router = Router();

//creamos la route del GET /recipes?name="..."
router.get(`/`,async(req,res)=>{
    try{
        //traemos el query
        const{name} = req.query;
        //creamos variable que traiga la func getallrecipes
        let allrecipes = await getAllrecipes()
        //condicionamos si name tiene valor
        if(name){
            //filtramos, pasamos name a minusculas,y nos fijamos si incluye el valor pasado a string
            let recipeByName = await allrecipes.filter(el =>el.name.toLowerCase().includes(name.toString()));
            //condicionamos nuevmente si encontramos un valor
            if(recipeByName.length){
                //si se encuentra, creamos una variable para mapear el objeto
                let recipe = recipeByName.map(el=>{
                    //retornamos los valores que necesitamos 
                    return{
                        id: el.id,
                        name: el.name,
                        //condicionamos, si tiene el elemento, que mapee el resultado
                        diets: el.diets ? el.diets : el.diets.map(el=>el.name),
                        heltscore: el.heltscore,
                        image: el.image
                    }
                })
                //si tenemos la info va a a rrojar un status 200 y el valor de recipe
                return res.status(200).send(recipe);
            }
            //si no tiene, devolvemos un valor 400 y un mensaje que indique que no se encontraron resultados
            return res.status(400).send("Sorry, we coulden't find the recipe or the recipe doesn't exist")
        }else{
            //si no hay query, llamamos a todos los elementos y los mapeamos
            let recipes = allrecipes.map(el=>{
                return {
                    id: el.id,
                    name: el.name,
                    //condicionamos, si tiene el elemento, que mapee el resultado
                    diets: el.diets ? el.diets : el.diets.map(el=>el.name),
                    heltscore: el.heltscore,
                    image: el.image
                }
            })//si tenemos la info va a a rrojar un status 200 y el valor de recipe
            return res.status(200).send(recipe);
        }
        
    }catch{
        return res.status(400).send("Invlid Input")
    }
})

//ahora el RECIPES ID 
router.get(`/:id`,async(req,res)=>{
    const {id} = req.params;
    try {
        //testeamos el codigo del uuid con el id del param
        if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
            //creamos variable para traer el id de la db
            let recipesDbById = await getDatabaseById(id); 
            //retornamos           
            return res.status(200).json(recipesDbById)
        }else{
            //si no entra en el uuid buscara en los id de la api
            let recipesApiById = await getApiById(id)
            if(recipesApiById.data.id){
                let dataRecipes = {
                    name: recipesApiById.data.title,
                    image: recipesApiById.data.image,
                    summary: recipesApiById.data.summary,
                    diets: recipesApiById.data.diets,
                    heltscore: recipesApiById.data.healthScore,
                    analyzedInstructions: recipesApiById.data.analyzedInstructions[0]?.steps.map(el=>{
                        return{
                            number: el.number,
                            step: el.step
                        }
                    })
                }
                
            }return res.status(200).send(dataRecipes); 
        }
    }catch{return res.status(400).send("id not foud");}
});

module.exports = router;
