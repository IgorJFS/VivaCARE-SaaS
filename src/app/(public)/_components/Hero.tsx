import { Button } from '@/components/ui/button';
import Image from 'next/image';
import doctorImg from '../../../../public/doctor-hero.png';

export function Hero() {
  return (
    <section className='bg-white'>
      <div className='container mx-auto px-4 pt-23 sm:px-6 lg:px-8'>
        <main className='flex items-center justify-center'>
          <article className='flex-[2] space-y-8 max-w-2xl flex flex-col justify-center'>
            <h1 className='text-4xl lg:text-6xl font-bold max-w-2xl tracking-tight'>
              Find the Best Professionals in One Place
            </h1>
            <p className='text-base md:text-lg text-gray-600'>
              We are a platform for medical professionals, focused on making
              your appointments faster, simpler, and more organized.
            </p>
            <Button className='bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold'>
              Make an appointment
            </Button>
          </article>
          <div className='hidden lg:block'>
            <Image
              src={doctorImg}
              alt='illustrative photo of a healthcare professional'
              width={340}
              height={400}
              objectFit='objectFit'
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
