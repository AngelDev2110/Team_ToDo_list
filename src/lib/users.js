import { API_SERVICE } from "./supabaseClient";

export async function getAllUsers() {
  try {
    const { data, error } = await API_SERVICE.auth.admin.listUsers();
    if (error) throw error;
    return data?.users;
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
  }
}
