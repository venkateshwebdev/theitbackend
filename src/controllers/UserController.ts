import { Request, Response } from "express";
import User from "../models/UserModel";
import { UniqueConstraintError } from "sequelize";

/** Get all users */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    // load all users.
    const users = await User.findAll({
      order: [["id", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/** Create an user and send the created user back as response */
export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      // if error is due to uniquness issue. send the error.
      res.status(400).json({ message: "Email and name must be unique" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/** Update an user */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);

    if (user) {
      // update the user if found.
      await user.update(req.body);
      res.json(user);
    } else {
      // if user not found send 404
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      // if error is due to uniquness issue. send the error.
      res.status(400).json({ message: "Email and name must be unique" });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

/** Delete user by id */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({ where: { id } });
    if (result) {
      // return the id of the deleted user.
      res.json(id);
    } else {
      // if user not found send 404
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
