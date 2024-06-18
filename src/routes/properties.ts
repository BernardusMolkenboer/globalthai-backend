import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth";
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController";

const router = Router();

router.get("/", authenticateJWT, getProperties);
router.get("/:id", authenticateJWT, getProperty);
router.post("/", authenticateJWT, createProperty);
router.put("/:id", authenticateJWT, updateProperty);
router.delete("/:id", authenticateJWT, deleteProperty);

export default router;
