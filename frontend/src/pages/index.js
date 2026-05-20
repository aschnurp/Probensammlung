import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <figure className="flex flex-col items-center">
        
        <div className="relative w-80 h-80 overflow-hidden rounded-full">
          <Image
            src="/leber.jpg"
            alt="Circular image"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <figcaption className="mt-6 text-xl text-gray-600">
          Version 1.1.6
        </figcaption>
      </figure>
    </div>
  );
}