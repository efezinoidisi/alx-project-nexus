import Link from "next/link";

export default function NotFound() {
  return (
    <main className='grid place-items-center min-h-screen'>
      <h2 className='text-4xl font-bold'>Not Found</h2>
      <p className='text-center'>Could not find requested resource</p>
      <Link href='/' className='bg-black py-2 px-5 rounded-full text-white'>
        Return Home
      </Link>
    </main>
  );
}
