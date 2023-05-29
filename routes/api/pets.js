import express from "express";

import { schemas } from "../../models/pet.js";
import petsControllers from "../../controllers/pets.js";
import {
  authenticate,
  isValidId,
  uploadCloud,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";

const router = express.Router();

router.use(authenticate);

router.get("/", petsControllers.listPet);

router.post(
  "/",
  uploadCloud.single("file"),
  validateBody(schemas.addPetSchema),
  petsControllers.addPet
);

router.delete("/:id", isValidId, petsControllers.deletePet);

export default router;
