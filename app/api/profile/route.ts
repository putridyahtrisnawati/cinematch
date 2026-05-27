import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function GET(req: NextRequest) {
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

    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get profile error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil profil" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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
    const { username, email } = body;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Profil berhasil diperbarui",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update profile error:", error);

    return NextResponse.json(
      { message: "Gagal memperbarui profil" },
      { status: 500 }
    );
  }
}