import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-80 h-80 overflow-hidden rounded-full">
        <Image
          src="/leber.jpg"
          alt="Circular image"
          fill
          style={{ objectFit: 'cover' }} // Use inline style for object-fit
        />
      </div>
    </div>
  );
}
