var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sujitha6079@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'sujitha6079@gmail.com',
  to: 'nitukiran2019@gmail.com, mailstosujitha21@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});