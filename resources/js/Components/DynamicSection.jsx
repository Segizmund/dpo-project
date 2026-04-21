import React, { useState } from 'react';
import {Link } from '@inertiajs/react';
import { rangeDate } from '@/utils/rangeDate';

export default function DynamicSection({sectionContent = []}) {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(sectionContent)

    const dataToRender = Array.isArray(sectionContent) 
    ? sectionContent 
    : (sectionContent?.data || []);

    return (
        <div className=" animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-2.5">
                {sectionContent.length > 0 ? (
                        sectionContent?.map((item) => (
                            <Link key={item.id} className='bg-[#EFEFEF] p-6 rounded-3xl flex flex-col gap-12 hover:-translate-y-1 hover:opacity-90 transition duration-300 ease-linear'>
                                <div className='flex justify-between'>
                                    <div>
                                        <span>Курс</span>
                                    </div>
                                    <div className='rounded-3xl h-[170px] w-[170px]'>
                                        {
                                            item.preview === null ? 
                                            (
                                                <div className='h-full w-full bg-gray-400 rounded-3xl'></div>
                                            ) 
                                            :
                                            (
                                                <img className='rounded-3xl object-cover' src="/img/course.png" alt="" />
                                            )
                                        }
                                        
                                    </div>
                                </div>
                                <div className='flex flex-col gap-5 justify-between h-full'>
                                    <h4 className='font-bold text-2xl'>{item.name}</h4>
                                    <span className='opacity-60'>{rangeDate(item.start_date, item.end_date)}</span>
                                </div>
                            </Link>
                        ))
                    ) 
                    : 
                    (
                        <div className='flex justify-center col-span-full'>
                            <span className='font-bold text-2xl'>В данный момент ничего нет.</span>
                        </div>
                    )
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