import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
export async function POST(req) {
  try {
    const {email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    await connectMongoDB();
    await User.create({email: email, password: hashedPassword, token: verificationToken, isVerified: false});
    
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
      },
    });

  const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by entering the verification token: ${verificationToken}`,
    };

  await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}