
 const multer =require("multer")
 const path = require("path");


// upload folder
const uploadFolder = "./uploads";
// multer file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExt);
  },
});

// file upload finnal object
var upload = multer({
  storage: storage,
  limit: {
    fileSize: 1000000,
  },
  fileFilter: (res, file, cb) => {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, jpeg, png formate  allowed!"));
    }
  },
});

module.exports=upload