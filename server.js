require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chatRouter = require("./routes/chat.route");
const builderRouter = require("./routes/builder.route");
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.use('/chat', chatRouter)
app.use('/build-server', builderRouter)



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



module.exports = {
  getTasks : () => tasks,
}
