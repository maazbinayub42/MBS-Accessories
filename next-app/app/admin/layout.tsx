"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage) {
      const auth = sessionStorage.getItem("mbs_admin_auth");
      if (auth !== "true") {
        router.push("/admin/login");
      }
    }
  }, [isLoginPage, router]);

  return <div className="admin-spa-root">{children}</div>;
}
