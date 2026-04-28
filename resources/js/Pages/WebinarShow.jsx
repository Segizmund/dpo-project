import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import PageLayout from '@/Layouts/PageLayout';
import SeoTags from '@/Components/Seo/SeoTags';
import { rangeDate } from '@/utils/rangeDate';

const WebinarShow = ({ seo, webinar }) => {
     console.log(webinar);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (webinar && Object.keys(webinar).length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [webinar]);

    const handleGoBack = () => {
        if (document.referrer && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/webinars';
        }
    };
    
    if (loading) {
        return (
            <>
                <SeoTags seo={seo} />
                <div className='mt-10 mb-16'>
                    <h1 className='text-4xl xl:text-6xl font-bold'>Загрузка...</h1>
                </div>
                <div className='py-20 text-center'>
                    <div className="inline-block w-12 h-12 border-4 border-[#A621F3] border-t-transparent rounded-full animate-spin"></div>
                    <p className='mt-4 text-gray-500'>Загружаем информацию о вебинаре</p>
                </div>
            </>
        );
    }
    
    if (!webinar || Object.keys(webinar).length === 0) {
        return (
            <>
                <SeoTags seo={seo} />
                <div className='my-10'>
                    <h1 className='text-4xl xl:text-6xl font-bold'>Вебинар не найден</h1>
                </div>
                <div>
                </div>
                <div className='py-20 text-center'>
                    <p className='text-gray-500 mb-4'>Вебинара с таким ID не существует</p>
                    <Link href={route('webinars')} className='inline-block px-6 py-2 bg-[#A621F3] text-white rounded-lg hover:opacity-85 transition'>
                        Вернуться к вебинарам
                    </Link>
                </div>
            </>
        );
    }

    
    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='my-10'>
                <h1 className='text-4xl xl:text-6xl font-bold'>
                    {webinar.name || 'Курс'}
                </h1>
            </div>
            <button onClick={handleGoBack}  className='flex items-center gap-2 mb-5 group hover:text-[#A621F3] w-fit transition duration-300 ease-linear'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="group-hover:scale-110 transition duration-300 ease-linear" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                </svg>
                Назад к вебинарам
            </button>
            <div className='grid lg:grid-cols-[1fr_2fr] gap-8 mb-6'>
                <div>
                    <div className='rounded-2xl overflow-hidden'>
                        {webinar.preview_url ? (
                            <img 
                                className='object-cover w-full' 
                                src={webinar.preview_url} 
                                alt={webinar.name} 
                            />
                        ) : (
                            <div className='w-full aspect-video bg-gray-200 flex items-center justify-center'>
                                <span className='text-gray-400'>Нет изображения</span>
                            </div>
                        )}
                    </div>
                </div>
                
                <div className='flex flex-col gap-5'>
                    <div>
                        <h2 className='text-2xl font-bold'>{webinar.name}</h2>
                    </div>

                    {webinar.description && (
                        <div className='flex flex-col gap-3'>
                            <h3 className='text-xl font-bold' >Описание:</h3>
                            <p className='text-gray-700 ps-2.5'>{webinar.description}</p>
                        </div>
                    )}

                    {webinar.speakers && (
                        <div className='flex flex-col gap-5'>
                            <h3 className='text-xl font-bold' >{webinar.speakers.length > 1 ? 'Спикеры:' : 'Спикер:'}</h3>
                            {webinar.speakers.map(speaker => (
                                <div key={speaker.id} className='flex flex-col gap-2 ps-2.5'>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-bold'>Имя спикера:</span>
                                        <span>{speaker.first_name} {speaker.last_name}</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-bold'>Почта:</span>
                                        <a href={`mailto:${speaker.email}`} className='hover:text-[#A621F3] transition duration-300 ease-linear hover:underline'>{speaker.email}</a>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-bold'>Должность:</span>
                                        <span>{speaker.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    
                    {webinar.start_date && webinar.end_date && (
                        <div>
                            <span className='font-medium'>Длительность: </span>
                            <span>{rangeDate(webinar.start_date, webinar.end_date)}</span>
                        </div>
                    )}
                    
                    {webinar.price !== undefined && webinar.price !== null && (
                        <div>
                            <span className='font-medium'>Стоимость: </span>
                            <span className='font-semibold'>{webinar.price} ₽</span>
                        </div>
                    )}
                    
                    {webinar.is_free && (
                        <div>
                            <span className='text-green-600 font-semibold'>Бесплатно</span>
                        </div>
                    )}
                    
                    <div className='mt-4'>
                        <button
                            className='flex w-fit py-4 px-12 rounded-xl font-bold text-white bg-[#A621F3] hover:opacity-85 hover:scale-105 transition duration-300 ease-linear'
                        >
                            Записаться на вебинар
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

WebinarShow.layout = page => <PageLayout children={page} />;

export default WebinarShow;