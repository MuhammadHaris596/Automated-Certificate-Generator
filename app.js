const express = require('express');
const app = express();
const path = require('path');
const sendCertificateByEmail = require('./utils/sendCertificate')

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/preview', (req, res) => {
    res.render('form')
});

app.post('/generate', async (req, res) => {
  const { name, email } = req.body;
  await sendCertificateByEmail(name, email);
  res.render('success',{name,email});
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

