'use strict'
const User = require('../../models/user');
const saveBlobs = require('../../models/image/saveBlobs');

async function update( req, res) {
  const user = await User.findById( req.user._id);
  const {name, email, avatar} = req.body;
  user.name = name;
  user.email = email;
  if (req.files.length) {
    const image_ids = await saveBlobs( req.files);
    user.avatar = image_ids[0];
  } else if( avatar){
    user.avatar = avatar;
  }

  try {
    await user.save();
  } catch( e) {
    res.json({success: false, message: e});
    return;
  }
  res.json({success: true, user});
}

module.exports = update;
