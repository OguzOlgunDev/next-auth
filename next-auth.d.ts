// types/next-auth.d.ts
import type { DefaultSession, DefaultUser } from "next-auth";

/**
 * Bilinen rolleri union olarak veriyoruz; (string & {}) hilesiyle
 * ileride yeni string roller de kabul edilecek (autocomplete korunur).
 */
export type Role =
  | "admin"
  | "user"
  | "editor"
  | "moderator"
  | "owner"
  | (string & {});

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      /** Tekil rol – en sık kullanılan alan */
      role?: Role;
      /** İstersen çoklu rol de taşıyabilirsin */
      roles?: Role[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: Role;
    roles?: Role[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    roles?: Role[];
    email?: string | null;
    name?: string | null;
    picture?: string | null;
  }
}
