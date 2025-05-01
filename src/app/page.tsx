import React from "react";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <h2 className="font-medium text-xl mb-4">Siguientes pasos</h2>
        {hasEnvVars ? (
          <div className="flex flex-col gap-2">
            <p>Supabase está conectado</p>
            <Link href={`/${process.env.NEXT_PUBLIC_ROUTE_MAIN}`} className="text-blue-500 hover:text-blue-600">Panel de control</Link>
          </div>
        ) : (
          <>
            <p>Necesitas configurar las siguientes variables de entorno:</p>
            <ul>
              <li>NEXT_PUBLIC_SUPABASE_URL</li>
              <li>NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
