const axios = require ("axios");
const db = require ("../db");
const {Diet,Recipe} = require("../db");
const {YOUR_API_KEY} = process.env;

//funciones controladoras
//controladora de info de la api
const getApiInfo = async ()=> {
    //pedimos los primeros 100 result a la api
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)/*el ultimo fragmento es para que traiga los primeros 100 result*/
    //mapeamos los valores de la api
    const apiInfo = await apiUrl.data.results.map(el=>{
       return{
        id: el.id,
        name: el.title,
        image: el.image,
        summary: el.summary,
        diets: el.diets,
        heltscore: el.healthScore,
        analyzedInstructions: el.analyzedInstructions[0]?.steps.map(el=>{
            return{
                number: el.number,
                step: el.step
            }
        })
        
       };
    })
    return apiInfo;
}

//traemos la info de la db
const getDBinfo = async() =>{
    return await Recipe.findAll({
       include:{
            model: Diet,
            attributes: ["name"],
            through: {
               attribute: [],
           },
        }
    })   
}

//traer info de la api por id
const getApiById = async (id) =>{
    return await axios.get(`https://api.spoonacular.com/recipes/${id}/information?${YOUR_API_KEY}`)
}

//traaer info de la db por id
const getDatabaseById = async (id)=> {
    return await Recipe.findByPk(id,{
        include:{
            model: Diet,
            attributes: ["name"],
            through: {
               attribute: [],
           }
        }
    });
}

//concatenamos la info de la api con la info de la db
const getAllrecipes = async ()=> {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBinfo();
    const todaLaInfo = apiInfo.concat(dbInfo);

    return todaLaInfo;
}


//creo un array de tipos de dietas de en db
const dietTypesDb = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian', 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30', 'dairy free'];

module.exports = {
    getApiInfo,
    getDBinfo,
    getApiById,
    getDatabaseById,
    getAllrecipes,
    dietTypesDb
}