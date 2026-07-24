export interface User {
  id: string;
  name: string;
  level: number;
  location: string;
  using_mic: boolean;
  beacon_expires_at?: string;
}
