require ('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const pokemonsRoutes = require('./routes/pokemons');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const middlewareLogRequest = require('./middleware/logs');

app.use(middlewareLogRequest);
app.use(express.static('../public/img'))
app.use(express.json());
app.use("/pokemons", pokemonsRoutes)
app.use("/users", usersRoutes)
app.use("/auth", authRoutes)


app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});