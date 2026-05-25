import { Router } from "express";
import {
  createStudentHandler,
  deleteStudentHandler,
  getStudentHandler,
  listStudentsHandler,
  updateStudentHandler,
} from "./students.controller";

const router = Router();

router.get("/", listStudentsHandler);
router.get("/:id", getStudentHandler);
router.post("/", createStudentHandler);
router.put("/:id", updateStudentHandler);
router.delete("/:id", deleteStudentHandler);

export { router as studentsRouter };
