const path = require("path");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  // destination: `${process.cwd()}/public/uploads/`,
  destination: `../chat_app-frontend/public/public/uploads/`,
  filename: function (req, file, cb) {
    if (
      file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)
    ) {
      cb(
        null,
        `${Date.now()}-${req.body._id}` + path.extname(file.originalname)
      );
    } else {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    //   cb(null,`IMAGE-` + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single("myImage");

router.post("/upload", upload, (req, res, { err }) => {
  console.log("Request ---", req.body);
  console.log("Request file ---", req.file); //req.file => file passato da formData

  if (!err) return res.status(200).send(req.file.filename);
});

module.exports = router;
