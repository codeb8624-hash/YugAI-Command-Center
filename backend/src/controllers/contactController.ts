import type mysql from "mysql2/promise";
import type { Request, Response } from "express";
import { query } from "../db/index.js";

interface ContactFormBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inMemoryContacts: ContactFormBody[] = [];

export async function handleContact(req: Request, res: Response): Promise<void> {
  const { name, email, subject, message } = req.body as ContactFormBody;

  if (!name || !email || !subject || !message) {
    res.status(400).json({
      success: false,
      data: null,
      error: {
        code: "VALIDATION_ERROR",
        message: "All fields are required: name, email, subject, message.",
      },
    });
    return;
  }

  if (typeof name !== "string" || name.length < 2 || name.length > 100) {
    res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message: "Name must be between 2 and 100 characters." },
    });
    return;
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message: "A valid email address is required." },
    });
    return;
  }

  if (typeof subject !== "string" || subject.length < 3 || subject.length > 200) {
    res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message: "Subject must be between 3 and 200 characters." },
    });
    return;
  }

  if (typeof message !== "string" || message.length < 10 || message.length > 5000) {
    res.status(400).json({
      success: false,
      data: null,
      error: { code: "VALIDATION_ERROR", message: "Message must be between 10 and 5000 characters." },
    });
    return;
  }

  const ipAddress = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.ip || "";
  const userAgent = req.headers["user-agent"] || "";

  const result = await query(
    `INSERT INTO Contacts (name, email, subject, message, ip_address, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    [name, email, subject, message, ipAddress, userAgent]
  );

  if (result) {
    const header = result[0] as mysql.ResultSetHeader;
    res.status(201).json({
      success: true,
      data: {
        id: header.insertId,
        createdAt: new Date().toISOString(),
      },
      error: null,
    });
    return;
  }

  inMemoryContacts.push({ name, email, subject, message });
  console.log(`[Contact] In-memory save: ${name} <${email}> — ${subject}`);

  res.status(201).json({
    success: true,
    data: { id: `mem_${inMemoryContacts.length}`, createdAt: new Date().toISOString() },
    error: null,
  });
}
