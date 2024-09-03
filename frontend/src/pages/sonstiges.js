'use client'; // Ensure this directive is at the top

import Image from 'next/image';
import { FaBeer, FaCoffee, FaApple } from 'react-icons/fa';
import { useRouter } from 'next/navigation'; // Ensure correct import for router

export default function Sonstiges() {
  const router = useRouter();

  const handleIconClick = (path) => {
    router.push(path);
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      <Image
        src="/map.jfif"
        alt="whole Image"
        fill
        style={{ objectFit: 'cover' }}
      />

      {/* Icons positioned absolutely on the image */}
      <FaBeer
        className="absolute text-white transform transition-transform hover:scale-125 cursor-pointer"
        style={{ top: '20%', left: '30%' }}
        size={30}
        onClick={() => handleIconClick('/beer')}
      />
      <FaCoffee
        className="absolute text-white transform transition-transform hover:scale-125 cursor-pointer"
        style={{ top: '50%', left: '50%' }}
        size={30}
        onClick={() => handleIconClick('/coffee')}
      />
      <FaApple
        className="absolute text-white transform transition-transform hover:scale-125 cursor-pointer"
        style={{ top: '70%', left: '80%' }}
        size={30}
        onClick={() => handleIconClick('/apple')}
      />
    </div>
  );
}
