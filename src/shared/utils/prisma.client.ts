import { PrismaClient } from "@prisma/client";

export default class PrismaInstance {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!PrismaInstance.instance) {
            PrismaInstance.instance = new PrismaClient();
        }

        return PrismaInstance.instance;
    }
}
