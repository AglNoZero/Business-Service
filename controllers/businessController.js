var mongoose = require("mongoose");
const { query, body, validationResult } = require("express-validator");
const stream = require("stream");
const drive = require("../services/google_drive");
const StoreProfile = require("../models/store_profile");

var storeProfileEmail;

exports.createStoreProfile = async function (req, res, next) {

  if (await StoreProfile.isStoreProfileExisted(req.body.email)) {
    return res.status(400).send("Profile is already existed!");
  }
  var profile = new StoreProfile();
  //profile.store_id = req.body.
  profile.name = req.body.name;
  profile.status = "VALIDATING";
  profile.email = req.body.email; storeProfileEmail = req.body.email;
  profile.address = req.body.address;
  profile.phone = req.body.phone;
  //profile.logo = req.body.logo;
  profile.receptionist_name = req.body.receptionist_name;
  profile.goods_type = req.body.goods_type;
  profile.opening_time = req.body.opening_time;
  profile.closing_time = req.body.closing_time;
  profile.established_date = new Date(req.body.established_date);
  //profile.licenses = req.body.licenses;

  //Process Logo
  const profileLogo = req.file;
  if (!profileLogo) {
    return res.status(400).json({ message: "Logo is required!" });
  }
  profile.logo = await uploadPicture(profileLogo, req.body.email);

  if (!req.files.array[0]) {
    return res.status(400).json({ message: "License is required!" });
  }

  for(file of req.files.array){
    await uploadPicture(file, req.body.email);
  }

  profile.licenses = drive.generateFolderPublicUrl(req.body.email);
  /*Process 
  const profileLicenses = req.files;
  if (!profileLicenses) {
    return res.status(400).json({ message: "Licenses are required!" });
  }
  profile.lLicenses = await uploadProfilePic(profileLogo);
  */
  console.log(profile);
  profile
    .save()
    .then(() => res.status(201).json(profile))
    .catch(next);
};

/*
exports.uploadLicenses = async function (req, res, next) {
  let licensesPic = req.files['licenses'];
  if (!licensesPic) {
    return res.status(400).json({ message: "Licenses picture are required!" });
  }
  //profile.logo = await uploadPicture(profileLogo);
} 
*/

async function uploadPicture(fileObj, folderName) {
  const fileName = fileObj.originalname;
  const mimeType = fileObj.mimetype;
  //const folderName = storeProfileEmail;
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObj.buffer);

  share_link = await drive.uploadFile(
    fileName,
    folderName,
    mimeType,
    bufferStream
  );

  return share_link;
}

async function uploadPictures(fileArr) {
  const fileName = fileObj.originalname;
  const mimeType = fileObj.mimetype;
  const folderName = storeProfileEmail;
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObj.buffer);

  share_link = await drive.uploadFile(
    fileName,
    folderName,
    mimeType,
    bufferStream
  );

  return share_link;
}