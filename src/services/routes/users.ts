import { Router } from "express";
import { createUserController, getUserByPhoneController, updateUserController } from "../controllers/users";
const router = Router();

router.post("/createUser", createUserController)
router.get("/getUserByPhone/:phone", getUserByPhoneController)
router.put("/updateUser", updateUserController)


export default router;
