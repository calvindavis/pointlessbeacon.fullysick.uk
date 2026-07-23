import type { User } from "@/types/User";

const USER_KEY = "pointlessBeacon:user";

export function generateUserId(): string {
  return crypto.randomUUID();
}

export function createUser(): User {
  const user: User = {
    id: generateUserId(),
    level: 1,
    name: "",
  };

  saveUser(user);

  return user;
}

export function loadUser(): User {
  try {
    const text = localStorage.getItem(USER_KEY);

    if (text == null) {
      throw new Error();
    }

    return JSON.parse(text);
  } catch (error) {
    return createUser();
  }
}

export function saveUser(user: User): void {
  const text = JSON.stringify(user);
  localStorage.setItem(USER_KEY, text);
}
