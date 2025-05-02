"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const age = formData.get("age")?.toString();


  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "El correo y la contraseña son requeridos"
    );
  }

  // Validar campos adicionales
  if (!age ) {
    return encodedRedirect("error", "/sign-up", "Todos los campos son requeridos");
  }

  // Validar edad
  const ageNum = parseInt(age);
  if (isNaN(ageNum) || ageNum < 18) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "La edad debe ser mayor o igual a 18 años"
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        age: ageNum,
      
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "¡Gracias por registrarte! Por favor revisa tu correo para el enlace de verificación."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect(`/${process.env.NEXT_PUBLIC_ROUTE_MAIN}`);
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "El correo es requerido");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/${process.env.NEXT_PUBLIC_ROUTE_MAIN}/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "No se pudo restablecer la contraseña"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Revisa tu correo para el enlace de restablecimiento de contraseña."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      `/${process.env.NEXT_PUBLIC_ROUTE_MAIN}/reset-password`,
      "La contraseña y su confirmación son requeridas"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      `/${process.env.NEXT_PUBLIC_ROUTE_MAIN}/reset-password`,
      "Las contraseñas no coinciden"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      `/${process.env.NEXT_PUBLIC_ROUTE_MAIN}/reset-password`,
      "La actualización de la contraseña falló"
    );
  }

  encodedRedirect("success", `/${process.env.NEXT_PUBLIC_ROUTE_MAIN}/reset-password`, "Contraseña actualizada");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const addNoteAction = async (formData: FormData) => {
  const supabase = await createClient();
  const title = formData.get("title")?.toString();

  if (!title) {
    return encodedRedirect("error", "/notes", "El título es requerido");
  }

  const { error } = await supabase.from("notes").insert({ title });

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/notes", "Error al agregar la nota");
  }

  return encodedRedirect("success", "/notes", "Nota agregada");
};

export const deleteNoteAction = async (id: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/notes", "Error al eliminar la nota");
  }

  return encodedRedirect("success", "/notes", "Nota eliminada");
};

export const updateNoteAction = async (formData: FormData) => {
  const supabase = await createClient();
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();

  if (!id || !title) {
    return encodedRedirect("error", "/notes", "El ID y título son requeridos");
  }

  const { error } = await supabase.from("notes").update({ title }).eq("id", id);

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/notes", "Error al actualizar la nota");
  }

  return encodedRedirect("success", "/notes", "Nota actualizada");
};

export const getUsersAction = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error(error.message);
    return encodedRedirect("error", "/users", "Error al obtener usuarios");
  }

  return data;
};

export const getAllUsersAction = async () => {
  const supabase = await createClient();

  try {
    const { data: users, error } = await supabase.from("profiles").select(`*`);

    if (error) {
      console.error("Error al obtener usuarios:", error.message);
      throw new Error("Error al obtener usuarios");
    }

    return users;
  } catch (error) {
    console.error("Error inesperado:", error);
    throw error;
  }
};

export const getUserByIdAction = async (userId: string) => {
  const supabase = await createClient();

  try {
    const { data: user, error } = await supabase
      .from("profiles")
      .select(`*`)
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error al obtener usuario:", error.message);
      throw new Error("Error al obtener usuario");
    }

    return user;
  } catch (error) {
    console.error("Error inesperado:", error);
    throw error;
  }
};
