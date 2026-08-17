import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit to 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.originalname.endsWith(".csv") || file.originalname.endsWith(".json")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV and JSON files are supported"));
    }
  },
});
