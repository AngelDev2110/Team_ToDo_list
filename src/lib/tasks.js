import { API } from "./supabaseClient";

export const createTask = async (task) => {
  try {
    const { error } = await API.from("tasks").insert([task]);
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
};

export const getTasks = async (param) => {
  try {
    const { name, value } = param;
    if (name && value) {
      const { data: tasks, error } = await API.from("tasks")
        .select("*")
        .eq(name, value);
      if (error) throw error;
      return tasks;
    } else {
      const { data: tasks, error } = await API.from("tasks").select("*");
      if (error) throw error;
      return tasks;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
