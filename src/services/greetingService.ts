export const GREETINGS = [
  "Hail",
  "Greetings",
  "Good morrow",
  "Well met",
  "Peace be upon thee",
  "Godspeed to thee",
  "Blessings upon thee",
  "Bright tidings",
  "A fine day to thee",
  "Honour to thee",
];

export function getRandomGreeting(): string {
  return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
}

export function formatRandomGreeting(name: string): string {
  const greeting = getRandomGreeting();

  return `${greeting}${name ? `, ${name}` : ""}!`;
}
