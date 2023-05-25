const express = require ("express");

const PokemonController = require ('../controller/pokemons.js');

const router = express.Router();


//READ - GET
router.get('/', PokemonController.getAllPokemons);
router.get('/collection', PokemonController.getAllMyPokemons);

//GET - By Id
router.get('/:id', PokemonController.getPokemonById);

//CREATE - POST
router.post('/', PokemonController.createNewPokemons);
router.post('/collection', PokemonController.addToMyPokemons);

//UPDATE - PUT
router.put('/:id', PokemonController.updatePokemons);
 
//DELETE - DELETE
router.delete('/:id', PokemonController.deletePokemons);
router.delete('/collection/:id', PokemonController.deleteMyPokemons);


module.exports = router;