import { UserRepository } from "../db/repositories/user/UserRepository";
import { UserService } from "../services/user/UserService";
import { jwtTokenService } from "../services/token/TokenService";
import { UserController } from "../controllers/UserController";
import { User } from "../db/models/user/user.model";

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository, jwtTokenService);
export const userController = new UserController(userService);
