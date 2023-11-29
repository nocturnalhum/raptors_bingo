'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Chakra_Petch } from 'next/font/google';
import Card from './Card';
import { cards } from '@/lib/cards';

const chakra_petch = Chakra_Petch({
  weight: ['700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export default function Bingo() {
  const [cardDeck, setCardDeck] = useState();
  const [markedItems, setMarkedItems] = useState(new Set([12]));
  const [bingo, setBingo] = useState(false);
  const [achievedCombos, setAchievedCombos] = useState([]);

  const markItem = (id) => {
    setMarkedItems((prevItems) => new Set([...prevItems, id]));
  };

  const handleItemClick = (id) => {
    markItem(id);
  };

  useEffect(() => {
    const cardsToShuffle = [...cards.slice(0, 12), ...cards.slice(13)];

    let shuffled = cardsToShuffle
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    shuffled.splice(12, 0, cards[12]);
    setCardDeck(shuffled);
  }, []);

  useEffect(() => {
    const checkForWin = () => {
      const winningCombinations = [
        // Horizontal wins:
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        // Vertical wins:
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        // Diagonal wins:
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
      ];

      let isNewBingo = false;

      for (const combination of winningCombinations) {
        if (
          combination.every((item) => markedItems.has(item)) &&
          !achievedCombos.includes(JSON.stringify(combination))
        ) {
          isNewBingo = true;
          setAchievedCombos((prevCombos) => [
            ...prevCombos,
            JSON.stringify(combination),
          ]);
          break;
        }
      }

      if (isNewBingo) {
        const timeoutId = setTimeout(() => {
          setBingo(true);
        }, 500);
        const timeoutSetFalse = setTimeout(() => {
          setBingo(false);
        }, 3500);
        setBingo;
        return () => {
          clearTimeout(timeoutId), clearTimeout(timeoutSetFalse);
        };
      }
    };

    // Check for a win
    checkForWin();
  }, [markedItems, achievedCombos]);

  return (
    <div className='flex h-[100svh] w-full bg-gradient-to-b from-red-500 via-purple-600 to-black select-none overflow-hidden'>
      <div className='flex portrait:flex-col landscape:flex-row h-full w-full max-w-7xl mx-auto'>
        <div className='flex justify-center items-center h-1/6 landscape:h-full landscape:w-1/5 landscape:px-10'>
          <div className='flex flex-col-reverse justify-center items-center landscape:-rotate-90'>
            <div
              className={`${chakra_petch.className} text-3xl text-yellow-200 md:text-4xl font-bold tracking-[0.2rem] uppercase whitespace-nowrap scale-y-[150%]`}
            >
              Toronto Raptors
            </div>
            <Image
              src='/img/Raptors_logo.png'
              alt='Toronto Raptors Logo'
              width={75}
              height={75}
              className='m-4 landscape:rotate-90'
            />
          </div>
        </div>
        <div className='flex items-center p-2 h-4/6 w-full max-h-[100svw] landscape:h-full landscape:w-3/5'>
          <div className='grid h-full w-full md:max-h-[700px] max-w-5xl grid-cols-5 grid-rows-5 gap-2'>
            {cardDeck?.map((card, index) => (
              <div key={card.id}>
                <Card
                  card={card}
                  index={index}
                  marked={markedItems.has(index)}
                  onItemClick={() => handleItemClick(index)}
                  bingo={bingo}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='flex justify-center items-center my-8 landscape:h-full landscape:w-1/6'>
          <div
            className={`${chakra_petch.className} text-4xl text-yellow-200 md:text-5xl font-bold tracking-widest uppercase whitespace-nowrap landscape:rotate-90`}
          >
            Bingo
          </div>
        </div>
      </div>
    </div>
  );
}
