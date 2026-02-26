
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}


const firebaseConfig = {
  apiKey: "AIzaSyDqmsO1UECJZu-jQx5CQt3yIXwPQiJ1Z4o",
  authDomain: "safarni-auth-ad50c.firebaseapp.com",
  projectId: "safarni-auth-ad50c",
  storageBucket: "safarni-auth-ad50c.firebasestorage.app",
  messagingSenderId: "833931144458",
  appId: "1:833931144458:web:874cfa1fefe0b94df15ef3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);