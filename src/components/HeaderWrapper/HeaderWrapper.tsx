// components/HeaderWrapper.tsx
import { cookies } from "next/headers";
import Header from "@components/Header/Header";

export default async function HeaderWrapper() {

    const cookieStore = await cookies();
    const authCookie = cookieStore.get("auth_token");
    const isBlurred = !authCookie;

    return <Header isBlurred={isBlurred} />;
}
