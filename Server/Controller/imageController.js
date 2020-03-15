const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require("dotenv").config();
const config = require('../../config');
const { uuid } = require('uuidv4');


const {region} = process.env;

aws.config.update(config.awsConfig)
const s3 = new aws.S3();

var upload = multer({
    storage: multerS3({
        s3,
        bucket: 'farmorderform',
        metadata: function (req, file, cb){
            cb(null, {fieldName: file.fieldname})
        },
        key: function (req, res, cb){
            cb(null, req.s3Key)
        }
    })
})
const singleFileUpload = upload.single('image');

function uploadToS3(req,res,next){
    req.s3Key = uuid();
    let downloadURL = `https://farmorderform.s3-${region}.amazonaws.com/${req.s3Key}`
    return new Promise((resolve, reject) => {
        return singleFileUpload(req,res,err => {
            if (err) return reject(err);
            return resolve(downloadURL)
        })
    })
}

module.exports = {
    
    uploadImageToS3: (req, res) => {
        uploadToS3(req,res)
        .then(downloadURL => {
            console.log(downloadURL)
            const db = req.app.get("db")
            const {item_id} = req.params
console.log(item_id)
             const item = db.upload_image([downloadURL, item_id])
             
        res.status(200).send(item)})
        
    
}
    }
    