const pool = require("../config/database");

const getAllPokemons = () => {
  const SQLQuery = "SELECT * FROM pokemons";

  return pool.execute(SQLQuery);
};

const getPokemonById = (id) => {
  const SQLQuery = "SELECT * FROM pokemons WHERE id = ?";
  const values = [id];

  return pool.execute(SQLQuery, values);
};



const createNewPokemons = async (body) => {
  const SQLQuery = "INSERT INTO pokemons (name, moves, image) VALUES (?, ?, ?)";
  const values = [body.name, body.moves, body.image];

  return pool.execute(SQLQuery, values);
};

const updatePokemons = (body, id) => {
  const SQLQuery = `UPDATE pokemons SET name='${body.name}', moves='${body.moves}', 
                        image='${body.image}' WHERE id=${id}`;

  return pool.execute(SQLQuery);
};

const deletePokemons = (id) => {
  const SQLQuery = `DELETE FROM pokemons WHERE id=${id}`;

  return pool.execute(SQLQuery);
};


// Section for Collection My Pokemon

const getAllMyPokemon = async () => {
    const sqlQuery = 'SELECT * FROM mypokemons'
    return pool.execute(sqlQuery);
}

// const addToMyPokemon = async (id_pokemons, id_user) =>{
//     const [result] = await pool.execute('INSERT INTO mypokemons (id_pokemons, id_user) VALUES (?, ?)', [id_pokemons, id_user]);
//     const id = result.insertId;
//     return { id, id_pokemons, id_user };
// }

const addToMyPokemon = async (id_pokemons, id_user) => {
  // Cek apakah data sudah ada sebelumnya
  const [existingData] = await pool.execute(
    'SELECT id FROM mypokemons WHERE id_pokemons = ? AND id_user = ?',
    [id_pokemons, id_user]
  );

  if (existingData.length > 0) {
    throw new Error('Data already exists');
  }

  // Data belum ada, lanjutkan dengan penambahan data
  const [result] = await pool.execute(
    'INSERT INTO mypokemons (id_pokemons, id_user) VALUES (?, ?)',
    [id_pokemons, id_user]
  );
  
  const id = result.insertId;
  return { id, id_pokemons, id_user };
};

const deleteMyPokemon = async (id) =>{
    const sqlQuery = `DELETE FROM mypokemons where id = ${id}`
    return pool.execute(sqlQuery);
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  createNewPokemons,
  updatePokemons,
  deletePokemons,
  //collection
  getAllMyPokemon,
  addToMyPokemon,
  deleteMyPokemon,
};
