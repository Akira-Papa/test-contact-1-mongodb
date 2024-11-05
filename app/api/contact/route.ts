import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Contact from "@/models/Contact";

export async function POST(request: Request) {
  console.log("📨 Received contact form submission");
  
  try {
    console.log("🔌 Attempting to connect to MongoDB...");
    await dbConnect();
    console.log("✅ MongoDB connection successful");

    console.log("📝 Parsing request body...");
    const body = await request.json();
    console.log("📋 Received data:", {
      name: body.name,
      email: body.email,
      message: body.message.substring(0, 20) + "..." // Log first 20 chars of message
    });

    console.log("💾 Creating new Contact document...");
    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      message: body.message,
    });
    console.log("✅ Contact document created successfully:", contact._id);

    return NextResponse.json({ 
      success: true,
      message: "お問い合わせを受け付けました",
      data: contact 
    });

  } catch (error: any) {
    console.error("❌ Error details:", {
      name: error.name,
      message: error.message,
      stack: error.stack
    });

    if (error.name === 'ValidationError') {
      console.log("⚠️ Validation error occurred:", error.errors);
      return NextResponse.json(
        { 
          success: false,
          message: "入力内容に問題があります",
          errors: Object.values(error.errors).map((err: any) => err.message)
        },
        { status: 400 }
      );
    }

    console.error("❌ Unexpected error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "サーバーエラーが発生しました",
        debug: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}