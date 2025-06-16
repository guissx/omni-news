"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import emailjs from "emailjs-com";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiErrorResponse = {
  message?: string;
};

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    try {
      setApiError("");
      // Corrigido: usando desestruturação sem criar variável não utilizada
      const { name, email, password } = data;
      const userData = { name, email, password };
      
      const response = await axios.post(
        "https://news-letter-backend.vercel.app/users/register",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
          await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
       process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2!,
      {
      from_name: name,
      to_email: email,
      },
    process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
  );
        alert("Cadastro realizado com sucesso! Redirecionando para login...");
        reset();
        router.push("/loginPage");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      
      if (axiosError.response) {
        setApiError(axiosError.response.data?.message || "Erro ao cadastrar usuário");
      } else if (axiosError.request) {
        setApiError("Sem resposta do servidor. Tente novamente mais tarde.");
      } else {
        setApiError("Erro ao configurar a requisição.");
      }
    }
  };

  return (
    <div className="lg:w-[50vw] w-[80vw] flex items-center justify-center bg-white rounded-lg shadow-2xl relative z-30">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[90%] p-6 bg-white flex flex-col justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Cadastre-se</h2>
        
        {apiError && (
          <div className="mb-4 w-full p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
            <p>{apiError}</p>
          </div>
        )}
        
        <div className="mb-4 w-full">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Nome completo:
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Nome é obrigatório" })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { 
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido"
              }
            })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4 w-full relative">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Senha:
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            {...register("password", { 
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter pelo menos 6 caracteres"
              }
            })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black pr-10"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-9 text-gray-600"
          >
            {passwordVisible ? "👁️" : "👁️‍🗨️"}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            Confirme sua senha:
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", { 
              required: "Confirmação de senha é obrigatória",
              validate: (value, formValues) => 
                value === formValues.password || "As senhas não coincidem"
            })}
            className="w-full p-2 border-2 border-slate-600 rounded text-black"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors disabled:bg-gray-400 cursor-pointer"
        >
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
        
        <p className="mt-4 text-gray-600">
          Já tem uma conta? <a href="/loginPage" className="text-red-600 hover:underline">Faça login</a>
        </p>
      </form>
    </div>
  );
}