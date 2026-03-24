"use client";
import { FormEvent, useState } from "react";
import styles from "./requestForm.module.css"

export default function RequestForm() {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        await fetch("/api/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
        });

        setLoading(false);
        setPhone("");
        alert("Отправлено!");
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                className={styles.input}
                type="tel"
                placeholder="Ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            

            <button type="submit" disabled={loading} className={styles.button}>
                {loading ? "Отправка" : "Отправить"}
            </button>
            <p> Нажимая кнопку Отправить вы соглашаетесь на обработку ваших персональных данных</p>
        </form>
    );
}