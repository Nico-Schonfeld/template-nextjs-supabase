import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Este bloque `try/catch` solo está aquí para el tutorial interactivo.
  // Siéntete libre de eliminarlo una vez que tengas Supabase conectado.
  try {
    // Crear una respuesta sin modificar
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Esto refrescará la sesión si está expirada - requerido para Componentes del Servidor
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    // rutas protegidas
    const protectedRoutes = [`/${process.env.NEXT_PUBLIC_ROUTE_MAIN}`];
    if (
      protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      ) &&
      user.error
    ) {
      // Redirigir a la ruta de login
      return NextResponse.redirect(
        new URL(`/${process.env.NEXT_PUBLIC_ROUTE_SIGN_IN}`, request.url)
      );
    }

    // Si el usuario está autenticado e intenta acceder a la página principal, redirigir a ruta protegida
    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(
        new URL(`/${process.env.NEXT_PUBLIC_ROUTE_MAIN}`, request.url)
      );
    }

    return response;
  } catch (e) {
    console.error(e);
    // Si estás aquí, ¡no se pudo crear un cliente Supabase!
    // Esto probablemente se debe a que no has configurado las variables de entorno.
    // Revisa http://localhost:3000 para los Siguientes Pasos.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
