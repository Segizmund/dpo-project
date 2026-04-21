import { useRef } from 'react';
import { Link } from '@inertiajs/react';

export default function PartnerSlider() {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const card = container.querySelector('.slider-card');
            if (!card) return;

            const gap = 20;
            const scrollAmount = card.offsetWidth + gap;

            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className='relative overflow-hidden '>
            <div className='container mx-auto lg:ps-2.5'>
                <div className='grid lg:grid-cols-[30%_1fr] gap-10 items-start'>
                    
                    <div className='flex flex-col gap-5 px-2.5 lg:px-0'>
                        <h4 className='font-bold text-4xl leading-tight '>
                            Создаём программы с лидерами образования и бизнеса
                        </h4>
                        <p className='font-medium opacity-60'>
                            Мы объединяем академические знания и практический опыт лидеров рынка для вашего успеха.
                        </p>
                        <Link className='flex text-white bg-[#A621F3] py-4 px-12 rounded-xl w-fit hover:opacity-85 hover:scale-105 transition duration-300 ease-linear shadow-lg font-semibold'>
                            Выбрать курс
                        </Link>

                        <div className='flex justify-start lg:justify-end'>
                            <div className='flex items-center gap-1 w-fit bg-[#EFEFEF] p-1 rounded-full mt-10'>
                                <button 
                                    onClick={() => scroll('left')} 
                                    className='bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-sm active:scale-95'
                                >
                                    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                                        <path d="M18.75 22.5L11.25 15L18.75 7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => scroll('right')} 
                                    className='bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-sm active:scale-95'
                                >
                                    <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                                        <path d="M11.25 22.5L18.75 15L11.25 7.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className='min-w-0 relative'>
                        <div 
                            id='CoursesSlider'
                            ref={scrollRef}
                            className='flex gap-5 ms-2.5 2xl:ms-0 overflow-x-auto scrollbar-hide snap-x snap-mandatory w-fit lg:w-[calc(100vw-30%-100px)]  max-w-[1600px]'
                        >
                            <div className='slider-card min-w-[95vw] sm:min-w-[450px] snap-start px-10 py-12 bg-[#F0FFD3] rounded-[40px] flex flex-col gap-12'>
                                <div className='flex flex-col items-center gap-5'>
                                    <span className='font-medium'>Совместно с 1С</span>
                                    <div className='rounded-3xl overflow-hidden'>
                                        <img className='object-cover h-[300px] w-[300px] rounded-3xl' src="/img/slide-1.png" alt="Курс" />
                                    </div>
                                </div>
                                <h3 className='font-bold text-3xl text-center '>Бухгалтер</h3>
                                <div className='flex justify-center'>
                                    <span className='py-2.5 px-4 bg-white rounded-full'>6 месяцев</span>
                                </div>
                            </div>

                            <div className='slider-card min-w-[95vw] sm:min-w-[450px] snap-start px-10 py-12 bg-[#D3FFE9] rounded-[40px] flex flex-col gap-12'>
                                <div className='flex flex-col items-center gap-5'>
                                    <span className='font-medium'>Совместно с 1С</span>
                                    <div className='rounded-3xl overflow-hidden'>
                                        <img className='object-cover h-[300px] w-[300px] rounded-3xl' src="/img/slide-1.png" alt="Курс" />
                                    </div>
                                </div>
                                <h3 className='font-bold text-3xl text-center '>Бухгалтер</h3>
                                <div className='flex justify-center'>
                                    <span className='py-2.5 px-4 bg-white rounded-full'>6 месяцев</span>
                                </div>
                            </div>

                            <div className='slider-card min-w-[95vw] sm:min-w-[450px] snap-start px-10 py-12 bg-[#E8D3FF] rounded-[40px] flex flex-col gap-12'>
                                <div className='flex flex-col items-center gap-5'>
                                    <span className='font-medium'>Совместно с 1С</span>
                                    <div className='rounded-3xl overflow-hidden'>
                                        <img className='object-cover h-[300px] w-[300px] rounded-3xl' src="/img/slide-1.png" alt="Курс" />
                                    </div>
                                </div>
                                <h3 className='font-bold text-3xl text-center '>Бухгалтер</h3>
                                <div className='flex justify-center'>
                                    <span className='py-2.5 px-4 bg-white rounded-full'>6 месяцев</span>
                                </div>
                            </div>

                            <div className='min-w-[400vw] sm:min-w-[145vw] md:min-w-[110vw] lg:min-w-[100vw] shrink-0' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}