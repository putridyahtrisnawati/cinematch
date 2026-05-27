import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function DELETE(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID user wajib dikirim" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { message: "Password wajib diisi" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Password salah" },
        { status: 400 }
      );
    }

    await User.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Akun berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete account error:", error);

    return NextResponse.json(
      { message: "Gagal menghapus akun" },
      { status: 500 }
    );
  }
}