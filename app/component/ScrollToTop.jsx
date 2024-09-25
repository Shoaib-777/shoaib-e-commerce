'use client'
import{ useState, useEffect } from 'react';
import { BiSolidRightTopArrowCircle } from "react-icons/bi";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      // Scrolling down
      setIsVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      {isVisible && (
        <BiSolidRightTopArrowCircle
          onClick={scrollToTop}
          className={`w-10 h-10 -rotate-45 fixed bottom-[10vw] right-4 md:right-2 cursor-pointer transition-opacity duration-2000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}        />
      )}
    </>
  );
};

export default ScrollToTop;

// import React from 'react'
// import { BiSolidRightTopArrowCircle } from "react-icons/bi";

// const ScrollToTop = () => {
//   return (
//     <>

//         <BiSolidRightTopArrowCircle className='w-10 h-10 -rotate-45 fixed bottom-[10vw] right-4'/>
//     </>
//   )
// }

// export default ScrollToTop