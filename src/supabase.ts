import { createClient } from "@supabase/supabase-js";
import type { User } from "./types/User";
import { BEACON_DURATION_MS } from "./constants";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

let client = createClient(supabaseUrl, supabaseKey);

export async function lightBeacon(user: User) {
  user.beacon_expires_at = new Date(
    Date.now() + BEACON_DURATION_MS,
  ).toISOString();

  const { error } = await client
    .from("users")
    .upsert(user, { onConflict: "id" });

  if (error) {
    console.error(error);
  }

  return user;
}

export async function getActiveBeacons(): Promise<User[]> {
  const { data: users, error } = await client
    .from("users")
    .select("*")
    .gt("beacon_expires_at", new Date().toISOString());

  if (error) {
    console.error(error);
  }

  return users as User[];
}

export function subscribeToActiveBeacons(handler: () => void) {
  client
    .channel("public:users")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "users" },
      (payload) => {
        handler();
      },
    )
    .subscribe();
}
