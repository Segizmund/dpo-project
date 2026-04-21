import React, { useState, useEffect } from 'react';
import {Link } from '@inertiajs/react';

export default function DynamicSection({activeSection, sectionContent}) {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(sectionContent)

    function rangeDate(startDate, endDate){
       startDate = startDate.split('T').slice(0);
       startDate = startDate[0].split('-');
       endDate = endDate.split('T').slice(0);
       endDate = endDate[0].split('-');
       
       console.log(startDate);
       console.log('-');
       console.log(endDate);
    }

    return (
        <div className=" animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5">
                {sectionContent.map((item) => (
                        <Link key={item.id} className='bg-[#EFEFEF] p-6 rounded-3xl flex flex-col gap-12 hover:-translate-y-1 hover:opacity-90 transition duration-300 ease-linear'>
                            <div className='flex justify-between'>
                                <div>
                                    <span>Курс</span>
                                </div>
                                <div className='rounded-3xl'>
                                    <img className='rounded-3xl object-cover h-[170px] w-[170px]' src="/img/course.png" alt="" />
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <h4 className='font-bold text-2xl'>{item.name}</h4>
                                <span className='opacity-60'>{rangeDate(item.start_date, item.end_date)}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className='flex justify-center mt-12'>
                <Link className='flex items-center gap-2 text-white bg-[#A621F3] py-4 px-12 rounded-full hover:opacity-85 hover:scale-105 transition duration-300 ease-linear'>
                    <span>
                        Смотреть все
                    </span>
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </Link>
            </div>
        </div>
    );
}