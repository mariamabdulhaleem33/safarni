import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";
import type { SignupFormType } from "@/schemas/signupSchema";
import type { LoginFormType } from "@/schemas/loginSchema";

export const firebaseSignup = async (data: SignupFormType) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  await updateProfile(userCredential.user, {
    displayName: data.name,
  });

  await sendEmailVerification(userCredential.user);

  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email,
  };
};

export const login = async (data: LoginFormType) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  return userCredential.user;
};
