import LoginForm from "@/components/auth/login-form";
import { User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className='grid place-items-center py-5 md:py-10 bg-primary/10 w-full max-w-sm mx-auto mt-14 mb-10 rounded-4xl relative px-5'>
      <div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-primary/20 rounded-full flex overflow-hidden'>
        <User size={80} fill='white' className='text-white' />
      </div>
      <div className='my-5 space-y-1 text-center'>
        <h2 className='font-medium text-xl'>Login</h2>
        <p className='text-sm text-gray-500'>Apply for all kinds of Jobs</p>
      </div>

      <LoginForm />

      <div className='mt-3'>
        <p className='text-sm'>
          Don&#39;t have an account?{" "}
          <Link href={"/signup"} className='text-primary font-bold'>
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
