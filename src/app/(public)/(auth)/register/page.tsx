import RegisterForm from "@/features/auth/components/RegisterForm";


export default function RegisterPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-background overflow-hidden">
     
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 w-full flex justify-center items-center py-12">
        <RegisterForm />
      </div>
    </div>
  );
}
