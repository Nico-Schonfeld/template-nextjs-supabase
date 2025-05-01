import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Dashboard",
    description: "Aplicación web moderna construida con Next.js y Supabase para autenticación y base de datos en tiempo real",
  };
  

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <>{children}</>
    );
  }