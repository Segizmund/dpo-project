import { useRef, useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function CourseBox({group})
{
    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 1);
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [group]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const card = container.querySelector('.slider-card');
            if (!card) return;

            const gap = 24;
            const scrollAmount = card.offsetWidth + gap;

            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return(
        <div className='relative'>
        
            <div 
                id='CoursesSlider'
                ref={scrollRef}
                onScroll={checkScroll}
                className='flex overflow-x-auto relative gap-6 scrollbar-hide snap-x snap-mandatory'>

                {group.courses.map(course => (
                    <Link href={route('course.show', course.id)}
                        key={course.id} 
                        className='slider-card relative snap-start flex-none w-[100%] sm:w-[48%] md:w-[31%] xl:w-[31.5%] 2xl:w-[32%] flex flex-col gap-4 group cursor-pointer'
                    >
                        <div className='flex flex-col px-4 py-2.5 rounded-2xl gap-2 z-10 absolute left-2.5 top-2.5 w-fit max-w-[calc(100%-20px)] bg-white'>
                            <span className='font-medium'>
                                {course.type}
                            </span>
                        </div>
                        <div className='relative rounded-2xl overflow-hidden bg-gray-100'>
                            <img 
                                src={course.image} 
                                alt={course.title} 
                                className='object-cover w-full h-full group-hover:scale-105 transition duration-500' 
                            />
                        </div>
                        <div className='flex flex-col px-4 py-2.5 rounded-2xl gap-2 absolute left-2.5 bottom-2.5 w-[calc(100%-20px)] bg-[#FFFFFF]/70'>
                            <p className='font-medium'>
                                {course.title}
                            </p>
                            <span className='font-medium'>
                                {course.duration}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='flex absolute -bottom-7 items-center justify-between w-full gap-1 p-1 rounded-full'>
                    <button 
                        onClick={() => scroll('left')} 
                        className={`bg-white rounded-full p-2.5 shadow-md transition duration-300 ease-linear
                        ${!canScrollLeft ? 'bg-[#EBEBEB] cursor-not-allowed scale-90' : 'bg-white hover:bg-gray-100 active:scale-95'}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                            <path d="M18.75 22.5L11.25 15L18.75 7.5" className={`${!canScrollLeft ? 'stroke-[#B8B8B8]' : 'stroke-black'}`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                    <button 
                        onClick={() => scroll('right')} 
                        className={`rounded-full p-2.5 shadow-md transition duration-300 ease-linear
                        ${!canScrollRight ? 'bg-[#EBEBEB] cursor-not-allowed scale-90' : 'bg-white hover:bg-gray-100 active:scale-95'}`}
                    >
                        <svg width="24" height="24" viewBox="0 0 30 30" fill="none">
                            <path d="M11.25 22.5L18.75 15L11.25 7.5" className={`${!canScrollRight ? 'stroke-[#B8B8B8]' : 'stroke-black'}`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
        </div>
    )
}