import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { signOutAction } from "@/actions/actions";

const DashboardPage = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirigir a la ruta de login
    return redirect(`/${process.env.NEXT_PUBLIC_ROUTE_SIGN_IN}`);
  }

  return (
    <div className="h-screen">
      <header className="flex justify-between items-center p-4">
        <h1>Dashboard</h1>

        <ThemeSwitcher />

        <form action={signOutAction}>
          <Button type="submit" variant={"outline"}>
            Sign out
          </Button>
        </form>
      </header>

      <section className="h-full flex justify-center items-center p-4">
        <div className="p-6 rounded-lg shadow-md max-w-2xl bg-card text-card-foreground border">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Información Personal
                </h2>
                <p className="text-sm text-muted-foreground">
                  Email: {user.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  Edad: {user.user_metadata.age} años
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Estado de la Cuenta
                </h2>
                <p className="text-sm text-muted-foreground">
                  Email verificado:{" "}
                  {user.user_metadata.email_verified ? "Sí" : "No"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Teléfono verificado:{" "}
                  {user.user_metadata.phone_verified ? "Sí" : "No"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Detalles de Sesión
                </h2>
                <p className="text-sm text-muted-foreground">
                  Último ingreso:{" "}
                  {typeof user.last_sign_in_at === "string"
                    ? new Date(user.last_sign_in_at).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cuenta creada:{" "}
                  {typeof user.created_at === "string"
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-primary">
                  Autenticación
                </h2>
                <p className="text-sm text-muted-foreground">
                  Proveedor: {user.app_metadata.provider}
                </p>
                <p className="text-sm text-muted-foreground">
                  Rol: {user.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
