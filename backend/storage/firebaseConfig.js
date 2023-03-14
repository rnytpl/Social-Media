// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdQZe9uxWGVheRqHUv1fRrb5nbHUQJKWw",
  authDomain: "social-media-app-f5543.firebaseapp.com",
  projectId: "social-media-app-f5543",
  storageBucket: "social-media-app-f5543.appspot.com",
  messagingSenderId: "1097957166659",
  appId: "1:1097957166659:web:5f539a32737c18e2a2cef6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadMulter = async (req, res, next) => {
  if (req.file) {
    const storageRef = ref(storage, req.file.originalname);
    const metadata = {
      contentType: req.file.mimetype,
    };
    const uploadTask = await uploadBytes(storageRef, req.file.buffer, metadata);
    const downloadUrl = await getDownloadURL(uploadTask.ref);

    req.body = {
      ...req.body,
      picturePath: downloadUrl,
    };
    next();
  }
  next();
};
