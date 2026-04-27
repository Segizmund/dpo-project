import { useEffect, useState } from 'react';
import PageLayout from '@/Layouts/PageLayout';
import SeoTags from '@/Components/Seo/SeoTags';
import { rangeDate } from '@/utils/rangeDate';

const CourseShow = ({ seo, course: apiCourse }) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (apiCourse && Object.keys(apiCourse).length > 0) {
            setCourse(apiCourse);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [apiCourse]);
    
    if (loading) {
        return (
            <>
                <SeoTags seo={seo} />
                <div className='mt-10 mb-16'>
                    <h1 className='text-4xl xl:text-6xl font-bold'>Загрузка...</h1>
                </div>
                <div className='py-20 text-center'>
                    <div className="inline-block w-12 h-12 border-4 border-[#A621F3] border-t-transparent rounded-full animate-spin"></div>
                    <p className='mt-4 text-gray-500'>Загружаем информацию о курсе</p>
                </div>
            </>
        );
    }
    
    if (!course || Object.keys(course).length === 0) {
        return (
            <>
                <SeoTags seo={seo} />
                <div className='mt-10 mb-16'>
                    <h1 className='text-4xl xl:text-6xl font-bold'>Курс не найден</h1>
                </div>
                <div className='py-20 text-center'>
                    <p className='text-gray-500 mb-4'>Курс с таким ID не существует</p>
                    <a href={route('courses')} className='inline-block px-6 py-2 bg-[#A621F3] text-white rounded-lg hover:opacity-85 transition'>
                        Вернуться к курсам
                    </a>
                </div>
            </>
        );
    }
    
    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold'>
                    {course.name || 'Курс'}
                </h1>
            </div>
            
            <div className='grid lg:grid-cols-[1fr_2fr] gap-8 mb-6'>
                <div>
                    <div className='rounded-2xl overflow-hidden'>
                        {course.preview_url ? (
                            <img 
                                className='object-cover w-full' 
                                src={course.preview_url} 
                                alt={course.name} 
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
                        <h2 className='text-2xl font-bold'>{course.name}</h2>
                    </div>
                    
                    {course.description && (
                        <div>
                            <p className='text-gray-700'>{course.description}</p>
                        </div>
                    )}
                    
                    <div className='flex flex-col gap-2'>
                        {course.start_date && course.end_date && (
                            <div>
                                <span className='font-medium'>Длительность: </span>
                                <span>{rangeDate(course.start_date, course.end_date)}</span>
                            </div>
                        )}
                        
                        {course.price !== undefined && course.price !== null && (
                            <div>
                                <span className='font-medium'>Стоимость: </span>
                                <span className='font-semibold'>{course.price} ₽</span>
                            </div>
                        )}
                        
                        {course.is_free && (
                            <div>
                                <span className='text-green-600 font-semibold'>Бесплатно</span>
                            </div>
                        )}
                        
                        {course.format_name && (
                            <div>
                                <span className='font-medium'>Формат: </span>
                                <span>{course.format_name}</span>
                            </div>
                        )}
                        
                        {course.certificate_type_name && (
                            <div>
                                <span className='font-medium'>Сертификат: </span>
                                <span>{course.certificate_type_name}</span>
                            </div>
                        )}
                    </div>
                    
                    {course.modules && course.modules.length > 0 && (
                        <div className='mt-4'>
                            <h3 className='text-xl font-bold mb-3'>Программа курса</h3>
                            <div className='flex flex-col gap-2'>
                                {course.modules.map((module, index) => (
                                    <div key={module.id} className='p-3 bg-gray-50 rounded-lg'>
                                        <span className='font-medium'>{index + 1}. {module.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className='mt-4'>
                        <button
                            className='flex w-fit py-4 px-12 rounded-xl font-bold text-white bg-[#A621F3] hover:opacity-85 hover:scale-105 transition duration-300 ease-linear'
                        >
                            Записаться на курс
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

CourseShow.layout = page => <PageLayout children={page} />;

export default CourseShow;