"use client";

import AuthButton from "../auth/AuthButton";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow">
      <div className="text-xl font-bold">MyApp</div>

      <div className="flex items-center gap-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <AuthButton /> {/* sadece componenti çağırıyor */}
      </div>
    </nav>
  );
}
