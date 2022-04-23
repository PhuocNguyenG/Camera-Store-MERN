// import { UserModel } from 'src/model/user.schemas';
import { Request, Response } from "express";
import { createHash } from "crypto";
import { CustomerModel } from "../model/index";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

function comparePassword(password: string, userPass: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const pass = createHash("sha256").update(password).digest("hex");
    if (pass === userPass) {
      resolve(true);
    }
    reject();
  });
}

function createPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const pass = createHash("sha256").update(password).digest("hex");
    resolve(pass);
  });
}

export const postLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await CustomerModel.findOne({ username: username });

    if (!user) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "username or password is incorrect",
      });
    }
    const now = new Date();
    res.status(202).json({
      token: generateToken(user._id),
      expiry: now.getTime() + 1000 * 60 * 30,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const postRegister = async (req: Request, res: Response) => {
  const { username, password, customerName, phone, email } = req.body;

  const user = await CustomerModel.findOne({ username: username });
  if (user) {
    return res.status(400).json({
      message: "username is already exist",
    });
  }

  const pass = await createPassword(password);
  const newUser = new CustomerModel({
    username,
    password: pass,
    customerName,
    phone,
    email,
  });

  await newUser.save();

  return res.status(201).json({
    message: "register success",
  });
};

//Generate JWT
const generateToken = (id: any) => {
  return jwt.sign({ id }, "hyperCamera", {
    expiresIn: "30m",
  });
};
