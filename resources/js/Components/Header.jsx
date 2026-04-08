import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CustomSelect from './CustomSelect';

const helpLinks = [
    { label: 'Бесплатно', href: '/webinars-free' },
    { label: 'Платно', href: '/webinars-paid' }
];

export default function Header({isHome}) {
    const { url } = usePage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    

    return (
        <>
            <header className={`container px-2.5 2xl:px-0 py-7 ${isHome ? 'absolute' : ''}`}>
                <div className={`flex items-center justify-between ${isHome ? 'text-white' : ''}`}>
                    <div>
                        <Link href={'/'} className={`uppercase flex text-3xl font-medium hover:scale-105 transition duration-300 ease-linear`}>ДПО</Link>
                    </div>
                    
                    <div>
                        <Link href={'courses'} className={`${url === '/courses' ? 'bg-[#A621F3] border-[#A621F3] text-white' : ''} hidden lg:flex items-center gap-2 border rounded-full py-2.5 px-4 font-medium transition duration-300 ease-linear hover:opacity-60 ${isHome ? 'border-white' : ''}`}>
                            <div>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.5 4.16699H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.66667 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M9.16667 15.833H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M13.3333 14.1667C15.1743 14.1667 16.6667 12.6743 16.6667 10.8333C16.6667 8.99238 15.1743 7.5 13.3333 7.5C11.4924 7.5 10 8.99238 10 10.8333C10 12.6743 11.4924 14.1667 13.3333 14.1667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.5007 15.8337L15.834 14.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div>
                                <span>Каталог</span>
                            </div>
                        </Link>
                    </div>
                    
                    <div className='hidden lg:flex items-center gap-2'>
                        <Link href={route('about-us')} className={`${url === '/about-us' ? 'bg-[#A621F3] border-[#A621F3] text-white' : ''} py-2.5 px-4 rounded-full font-medium transition duration-300 ease-linear hover:opacity-60`}>
                            О нас
                        </Link>
                        <Link href={route('contacts')} className={`${url === '/contacts' ? 'bg-[#A621F3] border-[#A621F3] text-white' : ''} py-2.5 px-4 rounded-full font-medium transition duration-300 ease-linear hover:opacity-60`}>
                            Контакты
                        </Link>
                        <CustomSelect isHome={isHome} label="Вебинары" items={helpLinks} url={url}/>
                    </div>
                    
                    <div className='hidden lg:flex items-center gap-8 font-medium'>
                        <Link className='transition duration-300 ease-linear hover:opacity-60'>
                            Войти
                        </Link>
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2"
                        aria-label="Menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                <div className={`
                    fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50
                    transform transition-transform duration-300 ease-in-out
                    lg:hidden
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}>
                    <div className="flex flex-col h-full overflow-y-auto">
                        <div className="flex justify-end p-4">
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex flex-col px-6 gap-2">
                            <Link className={`flex items-center gap-2 border rounded-full py-2.5 px-4 font-medium ${isHome ? 'border-white' : ''}`}>
                                <div>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.5 4.16699H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6.66667 10H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M9.16667 15.833H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.3333 14.1667C15.1743 14.1667 16.6667 12.6743 16.6667 10.8333C16.6667 8.99238 15.1743 7.5 13.3333 7.5C11.4924 7.5 10 8.99238 10 10.8333C10 12.6743 11.4924 14.1667 13.3333 14.1667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M17.5007 15.8337L15.834 14.167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <div>
                                    <span>Каталог</span>
                                </div>
                            </Link>
                            
                            <Link className={`flex rounded-full py-2.5 px-4 font-medium`}>
                                О нас
                            </Link>

                            <Link className={`flex rounded-full py-2.5 px-4 font-medium`}>
                                Контакты
                            </Link>
                            
                            <div className="py-2">
                                <CustomSelect isHome={false} label="Вебинары" items={helpLinks} />
                            </div>

                            <div className="border-t border-gray-200 my-4"></div>

                            <Link className="font-medium">
                                Войти
                            </Link>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </header>
        </>
    );
}