import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/providers/react-query";
import { ToastProvider } from "@/providers/toast-provider";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import { FormModal } from "@/components/shared/form-modal";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-pretendard-medium font-medium antialiased">
        <Providers>
          <ToastProvider />
          <ConfirmModal />
          <FormModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
