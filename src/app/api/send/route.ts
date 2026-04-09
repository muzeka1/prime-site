// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { phone } = await req.json();

//     if (!phone) {
//       return Response.json(
//         { success: false, message: "Телефон не указан" },
//         { status: 400 }
//       );
//     }

//     const cleanedPhone = String(phone).replace(/\D/g, "");

//     if (!/^\d+$/.test(cleanedPhone)) {
//       return Response.json(
//         { success: false, message: "Телефон должен содержать только цифры" },
//         { status: 400 }
//       );
//     }

//     if (cleanedPhone.length < 10 || cleanedPhone.length > 15) {
//       return Response.json(
//         { success: false, message: "Телефон должен содержать от 10 до 15 цифр" },
//         { status: 400 }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       host: "mail.hosting.reg.ru",
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "skprime.mhk@mail.ru",
//       subject: "Новая заявка САЙТ СК ПРАЙМ",
//       text: `Телефон: ${cleanedPhone}`,
//     });

//     return Response.json({ success: true, message: "Письмо отправлено" });
//   } catch (error) {
//     console.error("Ошибка отправки письма:", error);

//     return Response.json(
//       { success: false, message: "Не удалось отправить заявку" },
//       { status: 500 }
//     );
//   }
// }

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      // Быстрый тест (потом замените на адрес на вашем домене)
      from: "СК ПРАЙМ <onboarding@resend.dev>",
      to: ["skprime.mhk@mail.ru"],
      subject: "Новая заявка САЙТ СК ПРАЙМ",
      text: `Телефон: ${cleanedPhone}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { success: false, message: "Не удалось отправить заявку" },
        { status: 500 }
      );
    }

    return Response.json({ success: true, message: "Письмо отправлено", id: data?.id });
  } catch (e) {
    console.error("Ошибка отправки письма:", e);
    return Response.json(
      { success: false, message: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}