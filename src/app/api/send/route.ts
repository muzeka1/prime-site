import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { phone } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "abdullahalitoff@gmail.com",
    subject: "Новая заявка",
    text: `Телефон: ${phone}`,
  });

  return Response.json({ success: true });
}