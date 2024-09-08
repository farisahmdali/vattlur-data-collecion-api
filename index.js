const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://farisahmdali:5FCw7lE1wVPaGs1r@cluster0.uqhswzj.mongodb.net/vattalur', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema for family data
const familySchema = new mongoose.Schema({
  household: {
    houseNo: String,
    phoneNumber: String,
    area: String,
  },
  members: [{
    name: String,
    dob: Date,
    address: String,
    bloodGroup: String,
    job: String,
    adhaarProof: String,
    education: String,
    gender: String,
    maritalStatus: String,
    guardianRelation: String,
    isDailyPatient: String,
    isOrphan: String,
    phoneNumber: String,
  }],
});

const Family = mongoose.model('Family', familySchema);

// API endpoint to save family data
app.post('/api/save-family-data', async (req, res) => {
  try {
    const familyData = new Family(req.body);
    await familyData.save();
    res.status(201).json({ message: 'Family data saved successfully' });
  } catch (error) {
    console.error('Error saving family data:', error);
    res.status(500).json({ message: 'Error saving family data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
