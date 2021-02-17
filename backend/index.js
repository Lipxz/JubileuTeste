const express = require('express');
const cors = require('cors');
const routesController = require('./routes/routesController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/', routesController);

app.listen(PORT, () => {
    console.log(`Server started and it' on the port: ${PORT}`);
});