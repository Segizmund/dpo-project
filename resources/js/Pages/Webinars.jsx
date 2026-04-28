import {Link} from '@inertiajs/react';
import axios from 'axios';
import { useState, useMemo, useEffect } from 'react';
import PageLayout from '@/Layouts/PageLayout';
import CategoryItem from '@/Components/CategoryItem';
import SpeakerItem from '@/Components/SpeakerItem';
import SubscribeBox from '@/Components/SubscribeBox';
import SeoTags from '@/Components/Seo/SeoTags';
import WebinarSkeleton from '@/Components/WebinarSkeleton';

const Webinars = ({seo, webinars, nextCursor, type}) => {
    const [list, setList] = useState(webinars);
    const [loading, setLoading] = useState(false);
    const [currentCursor, setCurrentCursor] = useState(nextCursor);
    
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSpeakers, setSelectedSpeakers] = useState([]);

    const [showAllCats, setShowAllCats] = useState(false);
    const [showAllSpeak, setShowAllSpeak] = useState(false);
    const [limit, setLimit] = useState(5);

    const [isCatsOpen, setIsCatsOpen] = useState(true);
    const [isSpeakersOpen, setIsSpeakersOpen] = useState(true);

    const toggleCategory = (id) => {
        setSelectedCategories(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const toggleSpeaker = (id) => {
        setSelectedSpeakers(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const dynamicCategories = useMemo(() => {
        const categoriesMap = new Map();
        
        list.forEach(webinar => {
            if (webinar.tag) {
                const categoryId = webinar.tag.toLowerCase().replace(/\s+/g, '-');
                if (!categoriesMap.has(categoryId)) {
                    categoriesMap.set(categoryId, {
                        id: categoryId,
                        label: webinar.tag,
                        originalTag: webinar.tag
                    });
                }
            }
        });
        
        return Array.from(categoriesMap.values());
    }, [list]);

    const dynamicSpeakers = useMemo(() => {
        const speakersMap = new Map();
        
        list.forEach(webinar => {
            if (webinar.speakers && Array.isArray(webinar.speakers)) {
                webinar.speakers.forEach(s => {
                    if (!speakersMap.has(s.id)) {
                        speakersMap.set(s.id, {
                            id: s.id,
                            name: `${s.first_name} ${s.last_name}`
                        });
                    }
                });
            }
        });
        
        return Array.from(speakersMap.values());
    }, [list]);

    const filteredWebinars = useMemo(() => {
        return list.filter(webinar => {
            const matchesCategory = selectedCategories.length === 0 || 
                                    selectedCategories.some(catId => {
                                        const webinarCategoryId = webinar.tag?.toLowerCase().replace(/\s+/g, '-');
                                        return catId === webinarCategoryId;
                                    });

            const matchesSpeaker = selectedSpeakers.length === 0 || 
                               webinar.speakers?.some(s => selectedSpeakers.includes(s.id));
            
            const name = webinar.name || '';
            const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSpeaker && matchesSearch;
        });
    }, [list, selectedCategories, selectedSpeakers, searchQuery]);

    const handleLoadMore = async () => {
        if (!currentCursor || loading) return;
        
        console.log('Loading more with cursor:', currentCursor);
        setLoading(true);

        try {
            const response = await axios.get('/webinars/load-more', {
                params: { 
                    cursor: currentCursor,
                    limit: 3 
                },
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            console.log('Response data:', response.data);
            
            const { webinars: newWebinars, next_cursor: newCursor } = response.data;

            if (newWebinars && newWebinars.length > 0) {
                setList(prev => {
                    const existingIds = new Set(prev.map(item => item.id));
                    const uniqueNew = newWebinars.filter(item => !existingIds.has(item.id));
                    return [...prev, ...uniqueNew];
                });
            }
            
            setCurrentCursor(newCursor);
        } catch (error) {
            console.error("Ошибка загрузки вебинаров:", error);
        } finally {
            setLoading(false);
        }
    };

    const visibleCategories = showAllCats ? dynamicCategories : dynamicCategories.slice(0, limit);
    const visibleWebinars = filteredWebinars;

    useEffect(() => {
        const handleLayout = () => {
            const isMobile = window.innerWidth <= 1023;
            
            if (isMobile) {
                setIsCatsOpen(false);
                setIsSpeakersOpen(false);
            } else {
                setIsCatsOpen(true);
                setIsSpeakersOpen(true);
            }
        };

        handleLayout();
        window.addEventListener('resize', handleLayout);
        return () => window.removeEventListener('resize', handleLayout);
    }, []);

    useEffect(() => {
        setList(webinars);
        setCurrentCursor(nextCursor);
    }, [webinars]);

    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold '>
                    {type === 'free' ? 'Бесплатные' : 'Платные'} вебинары
                </h1>
            </div>

            {/* ВЕРХНИЕ КНОПКИ */}
            <div className='flex items-center gap-2 flex-wrap xl:w-[60%]'>
                <button 
                    onClick={() => setSelectedCategories([])}
                    className={`px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] ${selectedCategories.length === 0 ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black'}`}
                >
                    Все направления
                </button>
                
                {visibleCategories.map((cat) => (
                    <button 
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] ${selectedCategories.includes(cat.id) ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black'}`}
                    >
                        {cat.label}
                    </button>
                ))}

                {dynamicCategories.length > limit && (
                    <button 
                        onClick={() => setShowAllCats(!showAllCats)}
                        className="px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border border-black hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3]"
                    >
                        {showAllCats ? 'Свернуть' : `Еще`}
                    </button>
                )}
            </div>

            {/* ПОИСК */}
            <div className="relative w-full lg:max-w-[300px] my-16">
                <input 
                    type="text"
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 ps-10 pe-4 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg focus:ring-1 focus:border-[#A621F3] focus:ring-[#A621F3] transition-all"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.0008 13.9998L11.1074 11.1064" stroke="#9C9C9C" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9C9C9C" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className='grid lg:grid-cols-[20%_auto] xl:grid-cols-[300px_1fr] gap-12 border-t border-black py-6'>
                {/* ЛЕВАЯ ПАНЕЛЬ */}
                <aside className='flex flex-col gap-8'>
                    {/* БЛОК КАТЕГОРИЙ */}
                    {dynamicCategories.length > 0 && (
                        <div className='border-b border-black pb-8'>
                            <button 
                                onClick={() => setIsCatsOpen(!isCatsOpen)}
                                className='flex items-center justify-between w-full text-left mb-4 group'
                            >
                                <h3 className='text-xl font-bold tracking-wider'>Тематика</h3>
                                <svg 
                                    className={`transform transition-transform duration-300 ${isCatsOpen ? 'rotate-180' : ''}`} 
                                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                >
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            <div className={`grid transition-all duration-300 ease-in-out ${isCatsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className='flex flex-col gap-4'>
                                        {dynamicCategories.slice(0, limit).map(cat => (
                                            <CategoryItem key={cat.id} item={cat} selected={selectedCategories} toggle={toggleCategory} />
                                        ))}
                                        <div className={`grid transition-all duration-300 ease-linear ${showAllCats ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                            <div className="overflow-hidden">
                                                <div className='flex flex-col gap-4 pt-4'>
                                                    {dynamicCategories.slice(limit).map(cat => (
                                                        <CategoryItem key={cat.id} item={cat} selected={selectedCategories} toggle={toggleCategory} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {dynamicCategories.length > limit && (
                                            <button onClick={() => setShowAllCats(!showAllCats)} className="mt-2 font-bold hover:text-[#A621F3] flex items-center gap-2 text-sm">
                                                {showAllCats ? 'Скрыть' : `Еще ${dynamicCategories.length - limit}`}
                                                <span className={`transform transition-transform duration-300 ${showAllCats ? '-rotate-180' : ''}`}>
                                                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* БЛОК СПИКЕРОВ */}
                    {dynamicSpeakers.length > 0 && (
                        <div className='border-b border-black pb-8'>
                            <button 
                                onClick={() => setIsSpeakersOpen(!isSpeakersOpen)}
                                className='flex items-center justify-between w-full text-left mb-4 group'
                            >
                                <h3 className='text-xl font-bold tracking-wider'>Спикеры</h3>
                                <svg 
                                    className={`transform transition-transform duration-300 ${isSpeakersOpen ? 'rotate-180' : ''}`} 
                                    width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                >
                                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            <div className={`grid transition-all duration-300 ${isSpeakersOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className='flex flex-col gap-4'>
                                        {dynamicSpeakers.slice(0, limit).map(speaker => (
                                            <SpeakerItem key={speaker.id} item={speaker} selected={selectedSpeakers} toggle={toggleSpeaker} />
                                        ))}

                                        {dynamicSpeakers.length > limit && (
                                            <>
                                                <div className={`grid transition-all duration-300 ${showAllSpeak ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <div className='flex flex-col gap-4 pt-4'>
                                                            {dynamicSpeakers.slice(limit).map(speaker => (
                                                                <SpeakerItem key={speaker.id} item={speaker} selected={selectedSpeakers} toggle={toggleSpeaker} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <button onClick={() => setShowAllSpeak(!showAllSpeak)} className="mt-2 font-bold hover:text-[#A621F3] flex items-center gap-2 text-sm">
                                                    {showAllSpeak ? 'Скрыть' : `Еще ${dynamicSpeakers.length - limit}`}
                                                    <span className={`transform transition-transform duration-300 ${showAllSpeak ? '-rotate-180' : ''}`}>
                                                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </aside>

                {/* МЕЙН С КАРТОЧКАМИ */}
                <main>
                    <div className='flex justify-between items-center mb-10'>
                        <h2 className='text-3xl font-bold '>
                            {filteredWebinars.length} {getDeclension(filteredWebinars.length, 'Вебинар', 'Вебинара', 'Вебинаров')}
                        </h2>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {visibleWebinars.map(webinar => {
                            return (
                                <Link href={route('webinar.show', webinar.id)} key={webinar.id} className='flex flex-col justify-between gap-2 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                    <div className='flex flex-col gap-4 '>
                                        <div className='relative rounded-2xl overflow-hidden aspect-video bg-gray-100 md:h-[300px] lg:h-[200px] xl:h-[250px]'>
                                            {webinar.tag !== null ? (
                                                <div className='flex flex-col px-2 py-1 rounded-2xl gap-2 z-10 absolute right-2.5 top-2.5 w-fit max-w-[calc(100%-20px)] bg-white/90 backdrop-blur-sm'>
                                                    <span className='font-medium line-clamp-1'>{webinar.tag}</span>
                                                </div>
                                                ) : (
                                                    null
                                                )
                                            }
                                            {webinar.preview_url === null ? (
                                                <div className='absolute h-full w-full bg-gray-400'></div>
                                            ) : (
                                                <img src={webinar.preview_url} alt={webinar.name} className='object-cover w-full h-full group-hover:scale-105 transition duration-500' />
                                            )}
                                            
                                            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5'>
                                                <div className='absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500/20 backdrop-blur-sm'></div>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 relative ps-1 z-20 text-white" viewBox="0 0 16 16">
                                                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <h4 className='font-medium leading-tight group-hover:text-[#A621F3] transition'>{webinar.name}</h4>
                                    </div>

                                    {webinar.speakers && (
                                        <>
                                            {webinar.speakers.map((speaker) => (
                                                <div key={speaker.id} className='flex items-center gap-2 text-sm'>
                                                    <span className='opacity-60'>Спикер</span>
                                                    <span className='font-semibold'>{speaker.first_name} {speaker.last_name}</span>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </Link>
                            );
                        })}
                        {loading && (
                            <>
                                <WebinarSkeleton />
                                <WebinarSkeleton />
                                <WebinarSkeleton />
                            </>
                        )}
                    </div>

                    {/* Кнопка подгрузки */}
                    {currentCursor && (
                        <div className='flex justify-center mt-12'>
                            <button 
                                onClick={handleLoadMore}
                                disabled={loading}
                                className='flex items-center gap-2 px-4 py-2.5 border border-black rounded-full font-bold hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] transition duration-300 ease-linear group'
                            >
                                <svg className='group-hover:rotate-90 transition duration-300 ease-linear' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.48395 3.00947 7.06897 3.99122 5.26 5.74L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 3V8H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C14.516 20.9905 16.931 20.0088 18.74 18.26L21 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M16 16H21V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Показать еще
                            </button>
                        </div>
                    )}
                </main>
                <SubscribeBox/>
            </div>
        </>
    );
};

function getDeclension(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return five;
    }
    n %= 10;
    if (n === 1) {
        return one;
    }
    if (n >= 2 && n <= 4) {
        return two;
    }
    return five;
}

Webinars.layout = page => <PageLayout children={page} />;

export default Webinars;