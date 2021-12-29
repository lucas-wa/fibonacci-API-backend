import { Router } from "express";
import { CreateUsersController } from "./controllers/CreateUsersController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
const router = Router();

const createUsersController = new CreateUsersController();
const authenticateUserController = new AuthenticateUserController();

// router.get("/", (req, res) => {return res.json("Olá Mundo!");});

router.post("/users", createUsersController.handle);
router.post("/login", authenticateUserController.handle);

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  return res.json("Essa é sua dashboard pessoal!");
});

export { router };
