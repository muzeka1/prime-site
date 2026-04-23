"use client";

import { FormEvent, useState } from "react";
import styles from "./requestForm.module.css";

export default function RequestForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "");

    if (!cleaned) {
      return "Введите номер телефона";
    }

    if (!/^\d+$/.test(cleaned)) {
      return "Телефон должен содержать только цифры";
    }

    if (cleaned.length < 10 || cleaned.length > 15) {
      return "Телефон должен содержать от 10 до 15 цифр";
    }

    return "";
  };

  const handlePhoneChange = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    setPhone(cleaned);

    if (error) {
      setError("");
    }
    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Ошибка при отправке");
        return;
      }

      setSuccess(data.message);
      setPhone("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Произошла неизвестная ошибка"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        type="tel"
        placeholder="Ваш телефон"
        value={phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        required
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={styles.button}
      >
        {loading ? "Отправка..." : "Отправить"}
      </button>

      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <p className={styles.dataApprove}>
        Нажимая кнопку Отправить вы соглашаетесь на обработку ваших
        персональных данных
      </p>
    </form>
  );
}