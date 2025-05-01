import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // La ruta `/auth/callback` es requerida para el flujo de autenticación del lado del servidor
  // implementado por el paquete SSR. Intercambia un código de autenticación por la sesión del usuario.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // URL a la que redirigir después de que se complete el proceso de registro
  return NextResponse.redirect(`${origin}/${process.env.NEXT_PUBLIC_ROUTE_MAIN}`); 
}