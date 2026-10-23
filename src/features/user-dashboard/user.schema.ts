import { z } from "zod";

export const createPromptValidationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  template: z.string().min(1, "Template is required"),
  category: z.enum(["code", "text", "image"]),
  isPublic: z.boolean(),
  tags: z.array(z.string()).optional(),
});
