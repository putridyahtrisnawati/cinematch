'use client'

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
};

export default function PasswordInput({ 
  label, 
  value, 
  onChange, 
  name, 
  placeholder = "••••••••", 
  required = false, 
  autoComplete 
}: Props) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-sm text-gray-400 ml-1">{label}</label>

      <div className="relative mt-1">

        {/* 🔒 ICON LOCK */}
        <Lock
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* 👁️ ICON TOGGLE */}
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 cursor-pointer text-gray-400 hover:text-yellow-400"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

      </div>
    </div>
  );
}