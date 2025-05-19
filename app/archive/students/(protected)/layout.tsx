import StudentProtectedLayout from "@/components/student-protected/StudentProtectionLayout";
import { ReactNode } from "react";

export default function ProtectedLayout({ children }:{ children: ReactNode }) {
  return (
    <StudentProtectedLayout>
      {children}
    </StudentProtectedLayout>
  )
}