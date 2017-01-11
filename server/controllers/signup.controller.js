import signup from '../models/signup';
import sanitizeHtml from 'sanitize-html';


export function addUser(req, res) {
  if (!req.body.userDetails.fname || !req.body.userDetails.lname || !req.body.userDetails.email || !req.body.userDetails.password || !req.body.userDetails.mobile) {
    res.status(403).end();
    console.log('user',req.body.userDetails);
  }
signup.findOne({email:req.body.userDetails.email}).exec(function(err, user) {

    if (err) throw err;
    
    if(user) {
      res.json({userDetails: { message: 'Email Id already exists'}})
    }else {
  const newsignup = new signup(req.body.userDetails);

  // Let's sanitize inputs
  // let password = md5(req.body.userDetails.password);
  newsignup.fname = sanitizeHtml(newsignup.fname);
  newsignup.lname = sanitizeHtml(newsignup.lname);
  newsignup.email = sanitizeHtml(newsignup.email);
  newsignup.password = sanitizeHtml(newsignup.password);
  newsignup.mobile = sanitizeHtml(newsignup.mobile);

  console.log(newsignup);

  newsignup.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ userDetails: { message: 'User registered successfully'} });
  });
}
});
}

export function getPosts(req, res) {
  signup.find().sort('-dateAdded').exec((err, userList) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ userList });
  });
}

export function deleteList(req, res) {
  signup.remove({ _id: req.params._id}).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
  });
}