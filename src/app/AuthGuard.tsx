"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    console.log('session', session);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.replace("/login");
        }
    }, [session, status, router]);

    if (!session) {
        // Có thể trả về null hoặc loading indicator
        return null;
    }

    return <>{children}</>;
} 