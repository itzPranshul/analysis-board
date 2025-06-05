const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const stockfishRoutes = require('./routes/stockfishRoutes');

const app = express();
const PORT = 5000;

app.use(cors()); 

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/chess-community', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected locally'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', stockfishRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
