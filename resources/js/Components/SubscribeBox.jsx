import { Link } from '@inertiajs/react';

export default function SubscribeBox()
{
    return (
        <div className='bg-[#F5F5F5] py-6 px-4 rounded-2xl flex gap-8 flex-col md:flex-row justify-between items-center col-span-full'>
            <div className='flex flex-col md:flex-row items-center gap-8'>
                <span>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_6544_20722)">
                        <path d="M37.5159 0H12.484C5.5893 0 0 5.5893 0 12.484V37.5159C0 44.4107 5.5893 50 12.484 50H37.5159C44.4107 50 50 44.4107 50 37.5159V12.484C50 5.5893 44.4107 0 37.5159 0Z" fill="url(#paint0_linear_6544_20722)"/>
                        <path d="M37.5159 0H12.484C5.5893 0 0 5.5893 0 12.484V37.5159C0 44.4107 5.5893 50 12.484 50H37.5159C44.4107 50 50 44.4107 50 37.5159V12.484C50 5.5893 44.4107 0 37.5159 0Z" fill="url(#paint1_radial_6544_20722)"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M25.4108 43.916C21.6604 43.916 19.9176 43.3685 16.8881 41.1785C14.9719 43.6423 8.90383 45.5677 8.63918 42.2735C8.63918 39.8007 8.09168 37.7111 7.47118 35.4299C6.73208 32.6194 5.89258 29.4895 5.89258 24.9545C5.89258 14.1232 14.7803 5.97461 25.3104 5.97461C35.8497 5.97461 44.1078 14.5247 44.1078 25.0548C44.1431 35.4221 35.778 43.8607 25.4108 43.916ZM25.5659 15.3368C20.4377 15.0722 16.441 18.6218 15.5559 24.188C14.8259 28.7961 16.1216 34.4079 17.2257 34.6999C17.755 34.8276 19.0872 33.7509 19.9176 32.9205C21.2906 33.8691 22.8896 34.4387 24.5531 34.5721C29.8667 34.8277 34.4071 30.7824 34.7638 25.4746C34.9715 20.1555 30.8803 15.6503 25.5659 15.3459V15.3368Z" fill="white"/>
                        </g>
                        <defs>
                        <linearGradient id="paint0_linear_6544_20722" x1="5.89235" y1="38.0268" x2="50" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#44CCFF"/>
                        <stop offset="0.662" stopColor="#5533EE"/>
                        <stop offset="1" stopColor="#9933DD"/>
                        </linearGradient>
                        <radialGradient id="paint1_radial_6544_20722" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(-1.18954 -21.9593) rotate(51.356) scale(60.6759 25)">
                        <stop stopColor="#0000FF"/>
                        <stop offset="1" stopOpacity="0"/>
                        </radialGradient>
                        <clipPath id="clip0_6544_20722">
                        <rect width="50" height="50" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </span>
                <span className='lg:w-[80%] xl:w-[55%] text-center md:text-start'>
                    Собрали эфиры по всем направлениям, бесплатные мини-курсы, новости о новых вебинарах и скидки, которых больше нигде нет
                </span>
            </div>
            <div>
                <Link className='flex py-2.5 px-4 rounded-lg transition duration-300 ease-linear font-medium border border-black hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3]'>
                    Подписаться
                </Link>
            </div>
        </div>
    )
}