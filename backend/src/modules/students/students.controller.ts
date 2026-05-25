import type { Request, Response } from "express";
import { AppError } from "../../shared/errors/app-error";
import {
  createStudent,
  deleteStudent,
  getStudent,
  listStudents,
  updateStudent,
} from "./students.service";
import { createStudentSchema, updateStudentSchema } from "./students.schemas";

export async function listStudentsHandler(_req: Request, res: Response) {
  const students = await listStudents();
  res.json(students);
}

export async function getStudentHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const student = await getStudent(id);

  if (!student) {
    throw new AppError("Student not found", 404);
  }

  res.json(student);
}

export async function createStudentHandler(req: Request, res: Response) {
  const payload = createStudentSchema.parse(req.body);
  const student = await createStudent(payload);
  res.status(201).json(student);
}

export async function updateStudentHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const payload = updateStudentSchema.parse(req.body);
  const updated = await updateStudent(id, payload);

  if (!updated) {
    throw new AppError("Student not found", 404);
  }

  res.json(updated);
}

export async function deleteStudentHandler(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = await deleteStudent(id);

  if (!deleted) {
    throw new AppError("Student not found", 404);
  }

  res.status(204).send();
}
