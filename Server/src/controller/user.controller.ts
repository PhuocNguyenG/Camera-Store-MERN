import { Request, Response } from "express";
import { UserModel } from "../model/index";

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }

};
export const createUser = async (req: Request, res: Response) => {
  try {
    // const newDataUser = req.body;

    // const user = new UserModel(newDataUser);
    // await user.save();

    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const dataUser = req.body;
    await UserModel.findOneAndUpdate({ _id: dataUser._id }, dataUser, {
      new: true,
    }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: "users not found",
        });
      }
      user.save();
      return res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
