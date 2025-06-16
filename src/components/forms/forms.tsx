"use client";
import { useState } from "react";
import emailjs from "emailjs-com";
import { showSuccessMessage, resetForm } from "./formsUtils";

export default function Forms() {
  const [formKey, setFormKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      );

      showSuccessMessage(setShowPopup); // Exibe a mensagem de sucesso
      resetForm(setFormKey); // Reseta o formulário
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
      alert("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="lg:w-[50vw] w-[80vw] flex items-center justify-center bg-white rounded-lg shadow-2xl relative z-30">
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="text-green-500 text-lg">Message sent successfully!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <form
        key={formKey}
        onSubmit={handleSubmit}
        className="w-[90%] p-6 bg-white flex flex-col justify-center items-center"
      >
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name or company name:
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="from_email"
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Phone number:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
            required
          />
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full p-2 border-2 border-slate-600 rounded h-64 text-black"
            placeholder="Type your message..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors disabled:bg-gray-400 cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
