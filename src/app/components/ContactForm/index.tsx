"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';

import "./contactForm.css";

export default function ContactForm() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const handleChangeFullname = (e: ChangeEvent<HTMLInputElement>) => {
    setFullname(e.target.value);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://server-mauve-pi.vercel.app/contact",
        { fullname, email, message },
        { headers: { "Content-Type": "application/json" } }
      );
      const { msg, success } = response.data;
      setError(msg);
      setSuccess(success);
      if (success) {
        setFullname("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setError(["Unable to send message."]);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="py-4 mt-4 border-t flex flex-col gap-5"
      >
        <div>
          <label htmlFor="fullname">Full Name</label>
          <input
            onChange={handleChangeFullname}
            value={fullname}
            type="text"
            id="fullname"
            placeholder="enter your name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChangeEmail}
            value={email}
            type="text"
            id="email"
            placeholder="enter email"
          />
        </div>

        <div>
          <label htmlFor="message">Your Message</label>
          <textarea
            onChange={handleChangeMessage}
            value={message}
            className="h-32"
            id="message"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button className="bg-green-700 p-3 text-white font-bold" type="submit">
          Send
        </button>
      </form>

      <div className="bg-slate-100 flex flex-col">
        {error &&
          error.map((e, index) => (
            <div
              key={index}
              className={`${success ? "text-green-800" : "text-red-600"} px-5 py-2`}
            >
              {e}
            </div>
          ))}
      </div>
    </>
  );
}
