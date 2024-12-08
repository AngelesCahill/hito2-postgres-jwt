import { Router } from "express";
import { ProjectController } from "../controllers/project.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router();

//http://localhost:3000/api/v1/projects

router.get('/', ProjectController.getProjects);
router.get('/:uid', ProjectController.getProjectById);
router.put('/:uid', ProjectController.updateProject);
router.post('/', ProjectController.createProject);
router.delete('/:uid', ProjectController.deleteProject);

export default router;