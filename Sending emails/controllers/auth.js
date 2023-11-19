const User = require('../models/user');
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const transporter = nodeMailer.createTransport(sendgridTransport({
  auth:{
    api_key:
    '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'
  }
}))
exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage:message
   
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
User.findOne({email:email})
.then(user=>{
if(!user){
  req.flash('error','Invalid email or Password')
  return res.redirect('/login')
}
bcrypt
.compare(password , user.password)
.then(doMatch=>
{
  if(doMatch)
  {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save(err => {
      console.log(err);
      res.redirect('/');
    });
  }
  req.flash('error','Invalid email or Password')
  res.redirect('/login')

})
})
.catch(err=>console.log(err))
}

exports.postSignup=(req,res , next)=>{
  const email = req.body.email
  const password = req.body.password
  // const confirmPassword = req.user.confirmPassword
  User.findOne({email:email})
  .then(userDoc=>{
    if(userDoc)
    {
      req.flash('error','User Exist')
      return res.redirect('/signup')
    }
  return  bcrypt
  .hash(password, 12)
   .then(hashedPassword=>{
    const user = new User({
      email:email,
      password:hashedPassword,
      cart:{items:[]}
    })
    return user.save()
  })
  })
  .then(result=>{
    res.redirect('/login')
   return transporter.sendMail({
      to:email,
      from:"myemail.com",
      subject:"singup Complete",
      html:'<h1> Signed UP</h1>'

    })
    .catch(err => console.log(err))
 
  })
 
  .catch(err=>console.log(err))

}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
