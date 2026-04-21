import React, { useState, useEffect } from 'react';
import {Link } from '@inertiajs/react';

export default function DynamicSection({activeSection, sectionContent}) {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(sectionContent)

    /*const fetchContent = async (sectionId) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch(`/api/sections/${sectionId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
            });
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки данных');
            }
            
            const data = await response.json();
            setContent(data);
        } catch (err) {
            setError(err.message);
            console.error('Ошибка при загрузке:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeSection) {
            fetchContent(activeSection);
        }
    }, [activeSection]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <span className="ml-3 text-gray-600">Загрузка...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-600">Ошибка: {error}</p>
                <button 
                    onClick={() => fetchContent(activeSection)}
                    className="mt-2 text-purple-600 hover:text-purple-800"
                >
                    Попробовать снова
                </button>
            </div>
        );
    }

    if (!content) {
        return null;
    }*/

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
                                <h4 className='font-bold text-2xl'>Exel + Google Таблицы с нуля до PRO</h4>
                                <span className='opacity-60'>4 месяца</span>
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