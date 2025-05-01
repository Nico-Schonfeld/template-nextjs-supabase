import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Autenticación y Base de Datos",
    description: "Aplicación web moderna construida con Next.js y Supabase para autenticación y base de datos en tiempo real",
  };
  

export default async function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex flex-col gap-12 items-start">{children}</div>
    );
  }