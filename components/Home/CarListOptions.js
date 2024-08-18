"use client"
import React, { useState } from 'react';
import { CarListData } from '../../utils/CarListData';
import CarListItem from '../Home/CarListItem';
import { useRouter } from 'next/navigation';

function CarListOptions({distance}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar,setSelectedCar] = useState(null);
  const router=useRouter();
  const handleBooking = () => {
    if (selectedCar) {
      const totalAmount = (selectedCar.amount * distance).toFixed(2);
      const query = new URLSearchParams({
        car: JSON.stringify(selectedCar),
        amount: totalAmount,
      }).toString();
      router.push(`/payment?${query}`);
    }
  };
  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer p-2 px-4 rounded-md border-black 
            ${activeIndex === index ? 'border-[3px]' : null}`}
          onClick={() => {setActiveIndex(index);
            setSelectedCar(item)}
          }
        >
          <CarListItem car={item} distance={distance}/>
        </div>
      ))}

      {selectedCar?.name? <div className='flex justify-between fixed bottom-5
      bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center'>
        <h2>Make Payment For</h2>
        <button className='p-3 bg-black text-white
        rounded-lg text-center'
        onClick={handleBooking}
          >
            Request {selectedCar.name}</button>
      </div>:null}
    </div>
  );
}

export default CarListOptions;

