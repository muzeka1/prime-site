import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return Response.json(
        { success: false, message: "Телефон не указан" },
        { status: 400 }
      );
    }

    const cleanedPhone = String(phone).replace(/\D/g, "");

    if (!/^\d+$/.test(cleanedPhone)) {
      return Response.json(
        { success: false, message: "Телефон должен содержать только цифры" },
        { status: 400 }
      );
    }

    if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
      return Response.json(
        { success: false, message: "Телефон должен содержать от 10 до 15 цифр" },
        { status: 400 }
      );
    }

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
      text: `Телефон: ${cleanedPhone}`,
    });

    return Response.json({ success: true, message: "Письмо отправлено" });
  } catch (error) {
    console.error("Ошибка отправки письма:", error);

    return Response.json(
      { success: false, message: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}