require('dotenv').config();
const mongoose = require('mongoose');

// Use the MongoDB URI from environment variables
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Our homepage
app.get('/', (req, res) => {
    res.send('Hello, welcome to the Drug Interaction Checker!');
});

// New route to check for drug interactions
app.post('/check-interaction', async (req, res) => {
    const drugs = req.body.drugs;
    let interactions = [];

    try {
        const foundDrugs = await Drug.find({ name: { $in: drugs } });

        foundDrugs.forEach(drug => {
            drug.interactions.forEach(interactingDrug => {
                if (drugs.includes(interactingDrug)) {
                    interactions.push(`Warning: ${drug.name} interacts with ${interactingDrug}`);
                }
            });
        });

        if (interactions.length === 0) {
            interactions.push("No interactions found.");
        }

        res.json({ interactions: interactions });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while checking interactions' });
    }
});

// Make sure the port number here matches the port you're listening on
app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});
// Mock database of drug interactions
const drugDatabase = {
    "Aspirin": ["Ibuprofen", "Warfarin"],
    "Ibuprofen": ["Aspirin", "Warfarin"],
    "Warfarin": ["Aspirin", "Ibuprofen"],
};

const mongoose = require('mongoose');

// Use the environment variable for MongoDB URI
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Could not connect to MongoDB', err));


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/drugChecker', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
    const drugSchema = new mongoose.Schema({
        name: String,
        interactions: [String]
    });
    
    const Drug = mongoose.model('Drug', drugSchema);
    
    const sampleDrugs = [
        { name: 'Aspirin', interactions: ['Ibuprofen', 'Warfarin'] },
        { name: 'Ibuprofen', interactions: ['Aspirin', 'Warfarin'] },
        { name: 'Warfarin', interactions: ['Aspirin', 'Ibuprofen'] }
    ];
    
    Drug.insertMany(sampleDrugs)
        .then(() => console.log('Sample drugs inserted'))
        .catch(err => console.error('Error inserting sample drugs', err));

        const userSchema = new mongoose.Schema({
            username: String,
            password: String
        });
        
        const User = mongoose.model('User', userSchema);
        
        const bcrypt = require('bcrypt');
        const jwt = require('jsonwebtoken');
        const secretKey = 'yourSecretKey';
        
        // Register route
        app.post('/register', async (req, res) => {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({ username: req.body.username, password: hashedPassword });
            await newUser.save();
            res.json({ message: 'User registered successfully' });
        });
        
        // Login route
        app.post('/login', async (req, res) => {
            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(400).json({ message: 'Invalid username or password' });
        
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) return res.status(400).json({ message: 'Invalid username or password' });
        
            const token = jwt.sign({ _id: user._id }, secretKey);
            res.json({ token: token });
        });
        const authenticateToken = (req, res, next) => {
            const token = req.header('Authorization');
            if (!token) return res.status(401).json({ message: 'Access denied' });
        
            try {
                const verified = jwt.verify(token, secretKey);
                req.user = verified;
                next();
            } catch (err) {
                res.status(400).json({ message: 'Invalid token' });
            }
        };
        
        app.post('/check-interaction', authenticateToken, async (req, res) => {
            // Your interaction logic here
        });
                
    