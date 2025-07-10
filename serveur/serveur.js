const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Configuration upload fichiers
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});
const upload = multer({ storage });

app.post('/submit', upload.fields([
  { name: 'teamImage', maxCount: 1 },
  { name: 'proof', maxCount: 1 }
]), (req, res) => {
  const body = req.body;

  const newEntry = {
    Team: body.team,
    Captain: body.captain,
    Member1: body.member1 || '',
    Member2: body.member2 || '',
    Member3: body.member3 || '',
    Member4: body.member4 || '',
    Member5: body.member5 || '',
    Member6: body.member6 || '',
    TeamImage: req.files['teamImage'][0].filename,
    PaymentProof: req.files['proof'][0].filename,
    Timestamp: new Date().toISOString()
  };

  const filePath = 'server/inscriptions.xlsx';
  let workbook;
  let worksheet;

  if (fs.existsSync(filePath)) {
    workbook = xlsx.readFile(filePath);
    worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = xlsx.utils.sheet_to_json(worksheet);
    json.push(newEntry);
    const updatedSheet = xlsx.utils.json_to_sheet(json);
    workbook.Sheets[workbook.SheetNames[0]] = updatedSheet;
  } else {
    worksheet = xlsx.utils.json_to_sheet([newEntry]);
    workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Inscriptions');
  }

  xlsx.writeFile(workbook, filePath);
  res.json({ message: 'Inscription reçue avec succès !' });
});

app.listen(3000, () => console.log('Serveur sur http://localhost:3000'));
