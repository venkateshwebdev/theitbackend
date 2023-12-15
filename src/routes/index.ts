import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

// GET ALL USERS -> /users
router.get("/users", UserController.getUsers);
// POST A USER -> /users ( body: usermodel )
router.post("/users", UserController.createUser);
// UPDATE A USER => /users/:id ( body: usermodel )
router.put("/users/:id", UserController.updateUser);
// DELETE A USER -> /users/:id ( body: userId )
router.delete("/users/:id", UserController.deleteUser);

export default router;
