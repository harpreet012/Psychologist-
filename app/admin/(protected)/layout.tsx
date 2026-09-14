import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-session";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Defense in depth: middleware already guards this route, but a
  // Server Component check ensures no protected data is ever rendered
  // without a verified session, even if middleware config ever changes.
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar adminEmail={session.email} />
      <div className="flex-1 px-4 py-8 sm:px-8 lg:px-10">{children}</div>
    </div>
  );
}
