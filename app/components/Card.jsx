'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Card({ card, index, bingo, onItemClick }) {
  const [flip, setFlip] = useState(card.id === 12);
  const handleFlip = () => {
    onItemClick(index);

    if (card.id !== 12) {
      setFlip((prevValue) => !prevValue);
    }
  };

  return (
    <div className='flex justify-center items-center h-full w-full font-semibold text-xs md:text-sm text-center rounded-lg group perspective'>
      <div
        onClick={handleFlip}
        className={`h-full w-full flex justify-end ${
          card.id === 12 ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        <div
          className={`relative h-full w-full shadow-xl duration-500 preserve-3d ${
            flip && 'rotate-y-180'
          }`}
        >
          <div className='absolute inset-0 flex items-center justify-center border border-l-slate-200 border-r-slate-700 border-b-slate-900 text-white bg-purple-500 rounded-md p-1'>
            {card.textFront}
          </div>
          <div className='absolute inset-0 flex items-center justify-center border border-l-slate-200 z-40 border-r-slate-700 border-b-slate-900 bg-gradient-to-bl from-red-400 via-red-500 to-rose-800 rounded-md rotate-y-180 backface-hidden'>
            <div
              className={`flex items-center justify-center h-full w-full p-1 md:p-0`}
            >
              <Image
                src={card.imageBack}
                alt={card.player}
                height={65}
                width={65}
                className={`w-auto h-full ${bingo && 'animate-spin'}`}
              />
              {index === 12 && (
                <div className='absolute flex items-center text-3xl md:text-3xl font-bold text-amber-100 -rotate-45'>
                  {card.textFront}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
