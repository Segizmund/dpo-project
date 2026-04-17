import { Head, Link } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import PageLayout from '@/Layouts/PageLayout';
import SubscribeBox from '@/Components/SubscribeBox';
import CourseBox from '@/Components/CourseBox';
import CustomSelect from '@/Components/CustomSelect';
import SeoTags from '@/Components/Seo/SeoTags';
import ModalHelps from '@/Components/ModalHelps';

const Courses = ({seo}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedType, setSelectedType] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedEmployment, setSelectedEmployment] = useState(null);

    const [showAllCats, setShowAllCats] = useState(false);
    const [limit, setLimit] = useState(5);

    const COURSES_PER_PAGE = 9
    const [coursesLimit, setCoursesLimit] = useState(COURSES_PER_PAGE);

    const [isCatsOpen, setIsCatsOpen] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const categories = [
        { id: 'dev', label: 'Программирование' },
        { id: 'design', label: 'Дизайн' },
        { id: 'marketing', label: 'Маркетинг' },
        { id: 'pedagogy', label: 'Педагогика' },
        { id: 'management', label: 'Менеджмент' },
        { id: 'spo', label: 'СПО' },
        { id: 'pre-courses', label: 'Подготовительные курсы' },
        { id: 'economy', label: 'Экономика' },
        { id: 'fpv', label: 'Разработка FPV' },
        { id: 'agriculture', label: 'Земледелие' },
    ];

    const testCourses = [
        { id: 1, category_id: 'dev', title: 'Как войти в IT в 2026 году', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'beginner', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 2, category_id: 'design', title: 'Основы UI/UX: от сетки до прототипа', duration: '3 месяца', duration_months: 3, type: 'Профессия', level: 'beginner', hasEmployment: true, image: '/img/slide-1.png' }, 
        { id: 3, category_id: 'marketing', title: 'Маркетинг в соцсетях без бюджета', duration: '4 месяца', duration_months: 4, type: 'Профессия', level: 'pro', hasEmployment: true, image: '/img/slide-1.png' }, 
        { id: 4, category_id: 'dev', title: 'React vs Vue: что учить новичку?', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'beginner', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 5, category_id: 'pedagogy', title: 'Цифровые инструменты в образовании', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'beginner', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 6, category_id: 'dev', title: 'Node.js для начинающих', duration: '3 месяца', duration_months: 3, type: 'Профессия', level: 'pro', hasEmployment: true, image: '/img/slide-1.png' }, 
        { id: 7, category_id: 'design', title: 'Типографика и сетки в вебе', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'pro', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 8, category_id: 'marketing', title: 'SEO продвижение для малого бизнеса', duration: '2 месяца', duration_months: 2, type: 'Профессия', level: 'beginner', hasEmployment: true, image: '/img/slide-1.png' }, 
        { id: 9, category_id: 'dev', title: 'TypeScript: полное руководство', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'pro', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 10, category_id: 'pedagogy', title: 'Инклюзивное образование в школах', duration: '3 месяца', duration_months: 3, type: 'Курс', level: 'beginner', hasEmployment: false, image: '/img/slide-1.png' }, 
        { id: 11, category_id: 'design', title: '3D моделирование в Blender', duration: '2 месяца', duration_months: 2, type: 'Профессия', level: 'pro', hasEmployment: true, image: '/img/slide-1.png' }, 
        { id: 12, category_id: 'dev', title: 'Laravel 11: что нового?', duration: '4 месяца', duration_months: 4, type: 'Курс', level: 'pro', hasEmployment: false, image: '/img/slide-1.png' }
    ];

    const levels = [
        { id: 'beginner', label: 'Легкий' },
        { id: 'pro', label: 'Тяжелый' }
    ];

    const durations = [
        { id: 'short', label: 'До 3 месяцев' },
        { id: 'long', label: 'Более 3 месяцев' }
    ];

    const employmentOptions = [
        { id: 'yes', label: 'С трудоустройством' },
        { id: 'no', label: 'Без трудоустройства' }
    ];

    const toggleCategory = (id, label) => {
        setSelectedCategories(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const activeCategoryObjects = useMemo(() => {
        return categories.filter(cat => selectedCategories.includes(cat.id));
    }, [selectedCategories, categories]);

    const toggleType = (type) => {
        setSelectedType(prev => prev === type ? null : type);
    };

    const filteredCourses = useMemo(() => {
        setCoursesLimit(COURSES_PER_PAGE);

        return testCourses.filter(course => {
            const matchesCategory = selectedCategories.length === 0 || 
                                    selectedCategories.includes(course.category_id);
            
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType = !selectedType || course.type === selectedType;

            const matchesLevel = !selectedLevel || course.level === selectedLevel.id;

            const matchesEmployment = !selectedEmployment || 
                                    (selectedEmployment.id === 'yes' ? course.hasEmployment : !course.hasEmployment);

            const matchesDuration = !selectedDuration || 
                                    (selectedDuration.id === 'short' ? parseInt(course.duration_months) <= 3 : parseInt(course.duration_months) > 3);

            return matchesCategory && matchesSearch && matchesType && matchesLevel && matchesEmployment && matchesDuration;
        });
    }, [selectedCategories, searchQuery, selectedType, selectedLevel, selectedDuration, selectedEmployment]);

    const groupedCourses = useMemo(() => {
        if (selectedCategories.length > 0) return null;

        return categories.reduce((acc, cat) => {
            const categoryCourses = filteredCourses.filter(w => w.category_id === cat.id);
            if (categoryCourses.length > 0) {
                acc.push({
                    ...cat,
                    courses: categoryCourses
                });
            }
            return acc;
        }, []);
    }, [filteredCourses, selectedCategories]);

    const visibleWebinars = filteredCourses.slice(0, coursesLimit);

    useEffect(() => {
        const handleLayout = () => {
            const isMobile = window.innerWidth <= 1023;
            
            if (isMobile) {
                if (searchQuery.length > 0) {
                    setIsCatsOpen(false);
                } else {
                    setIsCatsOpen(false);
                }
            } else {
                setIsCatsOpen(true);
            }
        };

        handleLayout();

        window.addEventListener('resize', handleLayout);
        return () => window.removeEventListener('resize', handleLayout);
        
    }, [searchQuery]);

    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold '>
                    Все курсы
                </h1>
            </div>

            {/* Поиск */}
            <div className="relative w-full my-16">
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
            {/* Кнопки фильтрации */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 flex-wrap">
                <button 
                    onClick={() => toggleType('Профессия')}
                    className={`px-6 py-2.5 rounded-full transition duration-300 font-medium border whitespace-nowrap
                        ${selectedType === 'Профессия' ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:border-[#A621F3]'} 
                    `}
                >
                    Профессии
                </button>
                <button 
                    onClick={() => toggleType('Курс')}
                    className={`px-6 py-2.5 rounded-full transition duration-300 font-medium border whitespace-nowrap
                        ${selectedType === 'Курс' ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:border-[#A621F3]'}
                    `}
                >
                    Курсы
                </button>

                <CustomSelect 
                    label="Уровень сложности" 
                    items={levels} 
                    value={selectedLevel}
                    className={'w-full justify-center'}
                    onSelect={setSelectedLevel}
                />

                <button 
                    onClick={() => setSelectedEmployment(prev => prev?.id === 'yes' ? null : {id: 'yes'})}
                    className={`px-6 py-2.5 rounded-full transition duration-300 font-medium border whitespace-nowrap
                        ${selectedEmployment?.id === 'yes' ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:border-[#A621F3]'}
                    `}
                >
                    Трудоустройство
                </button>

                <CustomSelect 
                    label="Длительность" 
                    items={durations} 
                    value={selectedDuration}
                    className={'w-full justify-center'}
                    onSelect={setSelectedDuration}
                />
            </div>

            <div className='grid lg:grid-cols-[20%_auto] xl:grid-cols-[300px_1fr] gap-12 border-t border-black py-6'>
                {/* Боковая панель */}
                <aside className='flex flex-col gap-8'>
                    {/* Блок с категориями */}
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

                        {/* Аккордеон */}
                        <div className={`grid transition-all duration-300 ease-in-out ${isCatsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className='flex flex-col gap-4'>
                                    <button 
                                        onClick={() => setSelectedCategories([])}
                                        className={`px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] ${selectedCategories.length === 0 ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black'}`}
                                    >
                                        Все направления
                                    </button>
                                    {categories.slice(0, limit).map(cat => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] ${selectedCategories.includes(cat.id) ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                    <div className={`grid transition-all duration-300 ease-linear ${showAllCats ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className='flex flex-col gap-4'>
                                                {categories.slice(limit).map(cat => (
                                                    <button 
                                                        key={cat.id}
                                                        onClick={() => toggleCategory(cat.id, cat.label)}
                                                        className={`px-4 py-2.5 rounded-full transition duration-300 ease-linear font-medium border hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] ${selectedCategories.includes(cat.id) ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black'}`}
                                                    >
                                                        {cat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    {categories.length > limit && (
                                        <button onClick={() => setShowAllCats(!showAllCats)} className="mt-2 font-bold hover:text-[#A621F3] flex items-center gap-2 text-sm">
                                            {showAllCats ? 'Скрыть' : `Еще ${categories.length - limit}`}
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
                </aside>

                {/* Карточки */}
                <main className='overflow-hidden pb-6'>
                    {selectedCategories.length === 0 ? (
                        <div className='flex flex-col gap-12'>
                            {groupedCourses.map((group, index) => (
                                <div key={group.id}>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex justify-between items-end'>
                                            <h3 className='text-2xl font-bold'>{group.label}</h3>
                                            <Link className='hover:text-[#A621F3] transition duration-300 ease-linear'>
                                                Все программы
                                            </Link>
                                        </div>
                                        <CourseBox group={group}/>
                                    </div>

                                    {index === 0 && (
                                        <div className='bg-[#F5F5F5] py-6 px-4 rounded-2xl flex gap-8 flex-col md:flex-row justify-between items-center col-span-full mt-12'>
                                            <div className='flex flex-col gap-3'>
                                                <span className='font-medium text-center md:text-start'>
                                                    Не знаете что выбрать ?
                                                </span>
                                                <span className='font-medium text-center md:text-start'>
                                                    Перезвоним и поможем найти подходящий курс
                                                </span>
                                            </div>
                                            <div>
                                                <button onClick={() => setIsModalOpen(true)}
                                                 className='flex py-2.5 px-4 rounded-lg transition duration-300 ease-linear font-medium border border-black hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3]'>
                                                    Нужна помощь
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className='flex items-center gap-2 mb-6 flex-wrap'>
                                {activeCategoryObjects.map(cat => (
                                    <>
                                        <div key={cat.id}>
                                            <h4 className='font-bold text-2xl'>{cat.label}</h4>
                                        </div>
                                        <span>/1</span>
                                    </>
                                ))}
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {visibleWebinars.map(webinar => (
                                    <Link href={route('course.show', webinar.id)} key={webinar.id} className='flex flex-col justify-between gap-2 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                        <div className='flex flex-col gap-4 '>
                                            <div className='relative rounded-2xl overflow-hidden aspect-video bg-gray-100'>
                                                <img src={webinar.image} alt={webinar.title} className='object-cover w-full h-full group-hover:scale-105 transition duration-500' />
                                            </div>
                                            <h4 className='font-medium leading-tight group-hover:text-[#A621F3] transition'>{webinar.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Кнопка подгрузки */}
                            {filteredCourses.length > coursesLimit && (
                                <div className='flex justify-center mt-12'>
                                    <button 
                                        onClick={() => setCoursesLimit(prev => prev + COURSES_PER_PAGE)}
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
                        </>
                    )}
                </main>
                <SubscribeBox/>
            </div>
            {isModalOpen && (
                <ModalHelps onClose={handleCloseModal} />
            )}
        </>
    );
};

Courses.layout = page => <PageLayout children={page} />;

export default Courses;