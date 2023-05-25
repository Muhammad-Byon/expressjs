const PokemonsModel = require ('../models/pokemons');

const getAllPokemons = async (req, res) => {
    try {
        const [data] = await PokemonsModel.getAllPokemons();
        res.json({
            message: 'Get All Pokemons Success',
            data: data
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

const getPokemonById = async (req, res) => {
    const pokemonId = req.params.id; // Ambil ID pokemon dari URL
    try {
      const [data] = await PokemonsModel.getPokemonById(pokemonId);
      res.json({
        message: 'Get Pokemon by ID Success',
        data: data
      });
  
    } catch (error) {
      res.status(500).json({
        message: 'Server Error',
        serverMessage: error,
      });
    }
  };
  

const createNewPokemons = async (req, res) => {
    const body = req.body;
        await PokemonsModel.createNewPokemons(body);
        res.status(201).json({
          message: 'Create New Pokemons Success',
          data: body
        });
    // try {
    //     const body = req.body;
    //     await PokemonsModel.createNewPokemons(body);
    //     res.status(201).json({
    //       message: 'Create New Pokemons Success',
    //       data: 'data'
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         message: 'Server Error',
    //         error: error.message
    //     })
    // }
}

const updatePokemons = async (req,res) => {
    const {id} = req.params;
    const {body} = req;
    try {
        await PokemonsModel.updatePokemons(body, id);
        res.json({
            message: 'UPDATE Pokemons Success',
            data: {
                id: id,
                ...body
            },
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })   
    }
}

const deletePokemons = async (req, res) => {
    const {id} = req.params;
    try {
        await PokemonsModel.deletePokemons(id);
        res.json({
            message: 'DELETE User Success',
            data: null
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            serverMessage: error,
        })
    }
}

//Section for My Pokemon Collection

const getAllMyPokemons =  async (req, res) =>{
    try {
        const [data] = await PokemonsModel.getAllMyPokemon();
        // console.log("test", data);
        res.json({
            message: 'GET All My pokemons Success',
            data: data
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
} 

const addToMyPokemons = async (req, res) =>{
    const { id_pokemons, id_user } = req.body;

    try {
      const pokemon = await PokemonsModel.addToMyPokemon(id_pokemons, id_user);
      res.json({
        message: 'Add To My Pokemons Success',
        data: pokemon
      });
    } catch(error) {
      console.error('Error creating Pokemon', error);
      res.status(500).json({ error: 'Error creating Pokemon' });
      }
}

const deleteMyPokemons = async (req, res) => {
    const { id } = req.params;
    try {
        await PokemonsModel.deleteMyPokemon(id);
        res.json({
            message: 'Delete Pokemon Success',
            data: null
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
}

module.exports = {
    getAllPokemons,
    getPokemonById,
    createNewPokemons,
    updatePokemons,
    deletePokemons,
    //collection
    getAllMyPokemons,
    addToMyPokemons,
    deleteMyPokemons,
}