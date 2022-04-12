// import { UserModel } from 'src/model/user.schemas';
import { Request, Response } from "express";
import { createHash } from "crypto";
import { CustomerModel } from "../model/index";

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

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const user = await CustomerModel.findOne({ username });
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
    res.status(200).send(user._id).json({
      message: "login success",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const postRegister = async (req: Request, res: Response) => {
  res.send("xinchao ");
  const { username, password, customerName, phone, email } = req.body;

  if (!username || !password || !customerName || !phone || !email) {
    return res.status(400).json({
      message: "username, password, customerName, phone, email are required",
    });
  }

  const user = await CustomerModel.findOne({ username });
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

  return res.status(200).json({
    message: "register success",
  });
};
