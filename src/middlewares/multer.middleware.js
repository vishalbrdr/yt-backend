import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    const destinationDir = "./public/tmp";

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir, { recursive: true });
    }
    
    cb(null, destinationDir);
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export { upload };
