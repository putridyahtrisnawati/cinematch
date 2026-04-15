'use client'

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
};

export default function PasswordInput({ label }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder="••••••••"
          className="w-full mt-1 bg-[#0d1c32] rounded-xl p-3.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}