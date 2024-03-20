import { User } from "@prisma/client";

export type TOmitUser = Omit<
    User,
    "password" | "createdAt" | "updatedAt" | "deletedAt" | "role"
>;

export type TOmitUserWithPassword = Omit<
    User,
    "createdAt" | "updatedAt" | "deletedAt" | "role"
>;
