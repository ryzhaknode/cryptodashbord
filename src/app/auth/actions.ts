"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import {cookies} from "next/headers";

export interface RegisterUser {
    email: string;
    username: string;
    password: string;
}

export type LoginUserInput = Omit<RegisterUser, "username">;

interface User {
    id: number;
    email: string;
    username: string;
    password: string;
}

interface RegisterUserResponse {
    success: boolean;
    message: string;
    user?: User;
}

export async function registerUser({
                                       email,
                                       username,
                                       password,
                                   }: RegisterUser): Promise<RegisterUserResponse> {
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: "Такий Email вже є" };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
            },
        });

        if (user){
            const cookieStore = await cookies();
            cookieStore.set("auth_token", user.id.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7,
                path: "/",
            } as any);
        }

        return { success: true, message: "Успішна реєстрація", user };
    } catch (error) {
        console.error("Помилка реєстрації:", error);
        return { success: false, message: "Не вдалося зареєструвати користувача" };
    }
}


export async function loginUser({ email, password }: LoginUserInput): Promise<RegisterUserResponse> {
    try {
        const user = await db.user.findUnique({ where: { email } });

        if (!user) return { success: false, message: "Користувача не знайдено" };

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return { success: false, message: "Невірний пароль" };

        const cookieStore = await cookies();
        cookieStore.set("auth_token", user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        } as any);


        return { success: true, message: "Доступ дозволено" };
    } catch (error) {
        console.error("Помилка входу:", error);
        return { success: false, message: "Помилка входу" };
    }
}