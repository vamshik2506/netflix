export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  createdAt: string;
};

export type Movie = {
  id: string;
  title: string;
  description?: string;
  category: string;   // "Drama", "Comedy", etc.
  s3Key: string;
  createdAt: string;
};
