import RegisterForm from "@/components/register/register";

export default function AboutPage() {
  return (
    <main className="flex justify-center items-center min-h-screen py-16 relative z-30 text-black">
      <div className="w-full max-w-4xl px-4">
        <RegisterForm />
      </div>
    </main>
  );
}