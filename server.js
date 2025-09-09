const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer'); // ADD THIS
const path = require('path'); 
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// --- SETUP FOR FILE UPLOADS ---

// Create the 'uploads' directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
console.log("dirname", __dirname )
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
// Serve files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Configure Multer for File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// --- MongoDB Connection ---
const MONGO_URI = 'mongodb://localhost:27017/portalEmployee'; 
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- User Schema and Model ---
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isadmin:{type:Boolean,  required: true }

});
const User = mongoose.model('User', UserSchema, 'user');


const LoanSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  loanId: { type: String, required: true },
  originalLoanAmount: { type: String },
  interestRate: { type: String },
  remainingBalance: { type: String },
  nextPaymentDate: { type: String },
  nextPaymentAmount: { type: String },
  status: { type: String, required: true, default: 'Pending' },
  documents: [
    {
      originalname: String,
      path: String,
      mimetype: String
    }
  ]
});
const Loan = mongoose.model('Loan', LoanSchema, 'loandetails');

const applyLoanSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  salary: { type: String },
  status: { type: String, required: true, default: 'Pending' },
  // This 'documents' array is where the file info will be stored
  documents: [{
    originalname: String,
    path: String,
    mimetype: String
  }]
});

const applyLoan = mongoose.model('applyLoan', applyLoanSchema, 'applyLoan');


const loanProducts = [
  {
    id: 'prod_personal_01',
    title: 'Personal Loan',
    description: 'A flexible loan for your personal needs, from vacations to electronics.',
    interestRate: '5.4%',
    maxAmount: 25000,
    term: 'Up to 36 months'
  },
  {
    id: 'prod_emergency_02',
    title: 'Emergency Fund',
    description: 'Quick access to funds for unexpected events and emergencies.',
    interestRate: '4.2%',
    maxAmount: 10000,
    term: 'Up to 24 months'
  },
  {
    id: 'prod_home_03',
    title: 'Home Improvement',
    description: 'Finance your next home renovation project with a low-interest loan.',
    interestRate: '4.8%',
    maxAmount: 50000,
    term: 'Up to 60 months'
  }
];


// ✅ NEW ENDPOINT: Get available loan products
app.get('/loan-products', (req, res) => {
  // Simply return the hardcoded list of products
  console.log("loan products", loanProducts)
  res.status(200).json(loanProducts);
});



// ✅ CORRECTED LOGIN ENDPOINT
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // This is the insecure plain text check you have implemented
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
     res.status(200).json(user);

    // This is the corrected response structure
   // res.status(200).json({ 
   //   message: 'Login successful!', 
   //   email: user.email,
     // isAdmin: user.isAdmin 
  //  });
  console.log("user details after login",user)

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 2. GET LOAN DETAILS ENDPOINT
app.get('/loan-details/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    const loanDetails = await Loan
    .findOne({ email: userEmail });
    console.log("test" ,loanDetails);
    
    if (!loanDetails) {
      return res.status(404).json({ message: 'Loan details not found' });
    }
    res.status(200).json(loanDetails);
    

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// ✅ Corrected endpoint to get ALL loan records
app.get('/all-loan-details', async (req, res) => {
  try {
    // 1. Use Loan.find({}) to get every document in the collection.
    const allLoanDetails = await Loan.find({});
    
    // 2. Check if the returned array is empty.
    if (!allLoanDetails || allLoanDetails.length === 0) {
      return res.status(404).json({ message: 'No loan details found' });
    }

    // 3. Send the full array of documents as the response.
    res.status(200).json(allLoanDetails);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// In server.js, add this alongside your other routes

// ✅ NEW Endpoint to handle user registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both an email and a password.' });
    }

    // 2. Check if a user with that email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }

    // 3. Create a new user instance
    // WARNING: Storing plain text passwords is very insecure. 
    // It's highly recommended to hash passwords with bcrypt in a real application.
    const newUser = new User({
      email: email,
      password: password, // Storing password as plain text
      isadmin: false // New users are employees by default
    });

    // 4. Save the new user to the database
    await newUser.save();

    // 5. Send a success response
    res.status(201).json({ message: 'User registered successfully!' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


app.post('/add-loan', async (req, res) => {
  try {
    const { 
      email, 
      loanId, 
      originalLoanAmount, 
      interestRate, 
      remainingBalance, 
      nextPaymentDate, 
      nextPaymentAmount 
    } = req.body;
    console.log("servername", req.body)
    // Check if a loan with this email or loanId already exists
    const existingLoan = await Loan.findOne({ $or: [{ email }, { loanId }] });
    if (existingLoan) {
      return res.status(409).json({ message: 'A loan for this email or with this Loan ID already exists.' });
    }

    // Create a new loan document with the exact data provided
    const newLoan = new Loan(req.body);

    // Save the new loan to the database
    const savedLoan = await newLoan.save();

    // Send the newly created loan back as a confirmation
    res.status(201).json(savedLoan);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// In server.js
app.post('/apply-loan', upload.single('document'), async (req, res) => {
  try {
    // Text fields from the form are in req.body
    const { email, salary } = req.body;
    // Multer puts the uploaded file's information in req.file
    const uploadedFile = req.file;

    // --- Validation ---
    if (!uploadedFile) {
      return res.status(400).json({ message: 'A document is required.' });
    }
    const existingLoan = await applyLoan.findOne({ email });
    if (existingLoan) {
      return res.status(409).json({ message: 'An application for this Employee ID already exists.' });
    }

    // --- Prepare Document Data for Saving ---
    // Create an object with the file details you want to save
    const documentToSave = {
      originalname: uploadedFile.originalname,
      path: uploadedFile.path, // The path where multer saved the file (e.g., 'uploads/document-16624...jpg')
      mimetype: uploadedFile.mimetype
    };

    // --- Create and Save the New Loan ---
    const newLoan = new applyLoan({
      email: email,
      salary: salary,
     // Add the document information to the 'documents' array
      documents: [documentToSave],
    });

    // Save the entire loan record (with document info) to MongoDB
    await newLoan.save();

    res.status(201).json({ message: 'Loan application submitted successfully!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during application process.' });
  }
});

    
// --- Start the Server ---
const PORT = 5000;






app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});