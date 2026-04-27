import { Link } from '@inertiajs/react';
import { useState, useMemo, useEffect } from 'react';
import PageLayout from '@/Layouts/PageLayout';
import SubscribeBox from '@/Components/SubscribeBox';
import CourseBox from '@/Components/CourseBox';
import CustomSelect from '@/Components/CustomSelect';
import SeoTags from '@/Components/Seo/SeoTags';
import ModalHelps from '@/Components/ModalHelps';
import { rangeDate } from '@/utils/rangeDate';
import WebinarSkeleton from '@/Components/WebinarSkeleton';
import axios from 'axios';

const Courses = ({ seo, tags }) => {
    const [groupsData, setGroupsData] = useState(() => {
        if (!tags) return [];
        return Object.entries(tags).map(([groupName, items]) => ({
            id: groupName,
            label: groupName,
            courses: Array.isArray(items) ? items : [],
            allCoursesLoaded: false,
            isLoading: false
        }));
    });

    const [loadedGroupCourses, setLoadedGroupCourses] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [selectedEmployment, setSelectedEmployment] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [isCatsOpen, setIsCatsOpen] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const limit = 5;
    const levels = [
        { id: 'beginner', label: 'Легкий' },
        { id: 'pro', label: 'Тяжелый' }
    ];

    // Все курсы
    const allCourses = useMemo(() => {
        return groupsData.flatMap(group => 
            group.courses.map(course => ({
                ...course,
                parent_group_id: group.id
            }))
        );
    }, [groupsData]);

    // Уникальные длительности
    const uniqueDurations = useMemo(() => {
        const durations = allCourses.map(course => 
            rangeDate(course.start_date, course.end_date)
        );
        return [...new Set(durations)].filter(Boolean).map(d => ({
            id: d,
            label: d
        }));
    }, [allCourses]);

    // Загрузка всех курсов для тега
    const loadAllCoursesForGroup = async (groupId, groupLabel) => {
        if (loadedGroupCourses[groupId] || groupsData.find(g => g.id === groupId)?.isLoading) {
            return;
        }

        setGroupsData(prev => prev.map(group => 
            group.id === groupId ? { ...group, isLoading: true } : group
        ));
        
        try {
            const response = await axios.get('/courses/by-tag', {
                params: { tag: groupLabel }
            });
            
            if (response.data && Array.isArray(response.data)) {
                setLoadedGroupCourses(prev => ({
                    ...prev,
                    [groupId]: response.data
                }));
                console.log(`Загружено ${response.data.length} курсов для "${groupLabel}"`);
            }
        } catch (error) {
            console.error('Error loading courses:', error);
        } finally {
            setGroupsData(prev => prev.map(group => 
                group.id === groupId ? { ...group, isLoading: false, allCoursesLoaded: true } : group
            ));
        }
    };

    // Переключение категории
    const toggleCategory = async (groupId) => {
        const isSelected = selectedCategories.includes(groupId);
        const group = groupsData.find(g => g.id === groupId);
        
        if (!isSelected && group && !loadedGroupCourses[groupId]) {
            await loadAllCoursesForGroup(groupId, group.label);
        }
        
        setSelectedCategories(prev => 
            prev.includes(groupId) ? prev.filter(item => item !== groupId) : [...prev, groupId]
        );
    };

    // Получение курсов для отображения в группе
    const getDisplayCoursesForGroup = (groupId) => {
        if (loadedGroupCourses[groupId]) {
            return loadedGroupCourses[groupId];
        }
        const group = groupsData.find(g => g.id === groupId);
        return group ? group.courses : [];
    };

    // Активные объекты категорий
    const activeCategoryObjects = useMemo(() => {
        return groupsData.filter(cat => selectedCategories.includes(cat.id));
    }, [selectedCategories, groupsData]);

    // Все курсы для фильтрации
    const allAvailableCourses = useMemo(() => {
        let courses = [];
        
        if (selectedCategories.length === 0) {
            courses = [...allCourses];
        } else {
            selectedCategories.forEach(catId => {
                const group = groupsData.find(g => g.id === catId);
                if (loadedGroupCourses[catId]) {
                    courses.push(...loadedGroupCourses[catId].map(course => ({
                        ...course,
                        parent_group_id: catId
                    })));
                } else if (group) {
                    courses.push(...group.courses.map(course => ({
                        ...course,
                        parent_group_id: catId
                    })));
                }
            });
        }
        
        return courses;
    }, [selectedCategories, groupsData, loadedGroupCourses, allCourses]);

    // Фильтрация курсов
    const filteredCourses = useMemo(() => {
        return allAvailableCourses.filter(course => {
            const matchesCategory = selectedCategories.length === 0 || 
                                    selectedCategories.includes(course.parent_group_id);
            
            const matchesSearch = (course.name || '').toLowerCase().includes(searchQuery.toLowerCase());
            
            const currentCourseDuration = rangeDate(course.start_date, course.end_date);
            const matchesDuration = !selectedDuration || currentCourseDuration === selectedDuration.id;

            const matchesLevel = !selectedLevel || course.level === selectedLevel.id;
            
            const matchesEmployment = !selectedEmployment || 
                (selectedEmployment.id === 'yes' ? course.hasEmployment : !course.hasEmployment);
            
            return matchesCategory && matchesSearch && matchesDuration && matchesLevel && matchesEmployment;
        });
    }, [allAvailableCourses, selectedCategories, searchQuery, selectedDuration, selectedLevel, selectedEmployment]);
    console.log(filteredCourses)
    // Проверка наличия фильтров
    const isFiltered = useMemo(() => {
        return searchQuery !== '' || selectedDuration !== null || selectedLevel !== null || selectedEmployment !== null;
    }, [searchQuery, selectedDuration, selectedLevel, selectedEmployment]);

    // Обработчик клика на "Все программы"
    const handleShowAllPrograms = async (groupId, groupLabel) => {
        await loadAllCoursesForGroup(groupId, groupLabel);
        setSelectedCategories([groupId]);
    };

    // Сброс фильтров
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedDuration(null);
        setSelectedLevel(null);
        setSelectedEmployment(null);
        setSelectedCategories([]);
    };

    useEffect(() => {
        const handleLayout = () => setIsCatsOpen(window.innerWidth > 1023);
        handleLayout();
        window.addEventListener('resize', handleLayout);
        return () => window.removeEventListener('resize', handleLayout);
    }, []);

    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold'>Все курсы</h1>
            </div>

            {/* Поиск */}
            <div className="relative w-full my-16">
                <input 
                    type="text"
                    placeholder="Поиск курсов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2.5 ps-10 pe-4 bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg focus:ring-1 focus:border-[#A621F3] focus:ring-[#A621F3] transition-all"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M14.0008 13.9998L11.1074 11.1064" stroke="#9C9C9C" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#9C9C9C" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            {/* Фильтры */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10 flex-wrap">
                <CustomSelect 
                    label="Длительность" 
                    items={uniqueDurations} 
                    value={selectedDuration} 
                    onSelect={setSelectedDuration} 
                    className={'w-full justify-center min-w-[200px]'} 
                />
                
                <CustomSelect 
                    label="Уровень сложности" 
                    items={levels} 
                    value={selectedLevel} 
                    onSelect={setSelectedLevel} 
                    className={'w-full justify-center min-w-[200px]'} 
                />
                
                <button 
                    onClick={() => setSelectedEmployment(prev => prev?.id === 'yes' ? null : {id: 'yes'})}
                    className={`px-6 py-2.5 rounded-full transition duration-300 font-medium border whitespace-nowrap ${selectedEmployment?.id === 'yes' ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:border-[#A621F3]'}`}
                >
                    Трудоустройство
                </button>

                {isFiltered && (
                    <button 
                        onClick={resetFilters}
                        className="px-6 py-2.5 rounded-full transition duration-300 font-medium border border-gray-300 hover:bg-gray-100"
                    >
                        Сбросить фильтры
                    </button>
                )}
            </div>

            <div className='grid lg:grid-cols-[20%_auto] xl:grid-cols-[300px_1fr] gap-12 border-t border-black py-6'>
                {/* Сайдбар */}
                <aside className='flex flex-col gap-8'>
                    <div className='border-b border-black pb-8'>
                        <button onClick={() => setIsCatsOpen(!isCatsOpen)} className='flex items-center justify-between w-full text-left mb-4 group'>
                            <h3 className='text-xl font-bold tracking-wider'>Тематика</h3>
                            <svg className={`transform transition-transform duration-300 ${isCatsOpen ? 'rotate-180' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out ${isCatsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className='flex flex-col gap-4'>
                                    <button 
                                        onClick={() => setSelectedCategories([])}
                                        className={`px-4 py-2.5 rounded-full transition duration-300 font-medium border ${selectedCategories.length === 0 ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:bg-[#A621F3] hover:text-white'}`}
                                    >
                                        Все направления
                                    </button>
                                    
                                    {groupsData.slice(0, limit).map(cat => (
                                        <button 
                                            key={cat.id}
                                            onClick={() => toggleCategory(cat.id)}
                                            className={`px-4 py-2.5 rounded-full transition duration-300 font-medium border text-left ${selectedCategories.includes(cat.id) ? 'bg-[#A621F3] text-white border-[#A621F3]' : 'bg-white border-black hover:bg-[#A621F3] hover:text-white'}`}
                                            disabled={cat.isLoading}
                                        >
                                            {cat.isLoading ? 'Загрузка...' : cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Основной контент */}
                <main className='overflow-hidden pb-6'>
                    {
                        groupsData.length === 0 ? (
                            <div className='grid grid-cols-3 gap-5'>
                                <WebinarSkeleton />
                                <WebinarSkeleton />
                                <WebinarSkeleton />
                            </div>
                        ) : (null)
                    }
                    {selectedCategories.length === 0 && !isFiltered ? (
                        <div className='flex flex-col gap-12'>
                            {groupsData.filter(g => g.courses.length > 0).map((group, index) => (
                                <div key={group.id}>
                                    <div className='flex flex-col gap-8'>
                                        <div className='flex justify-between items-end'>
                                            <h3 className='text-2xl font-bold'>{group.label}</h3>
                                            <button 
                                                onClick={() => handleShowAllPrograms(group.id, group.label)}
                                                className='hover:text-[#A621F3] transition font-medium'
                                                disabled={group.isLoading}
                                            >
                                                {group.isLoading ? 'Загрузка...' : 'Все программы'}
                                            </button>
                                        </div>
                                        <CourseBox group={{
                                            ...group, 
                                            courses: getDisplayCoursesForGroup(group.id)
                                        }}/>
                                    </div>
                                    {index === 0 && (
                                        <div className='bg-[#ededed] py-6 px-4 rounded-2xl flex gap-8 flex-col md:flex-row justify-between items-center mt-12'>
                                            <div className='flex flex-col gap-3'>
                                                <span className='font-medium'>Не знаете что выбрать?</span>
                                                <span className='font-medium text-gray-500'>Перезвоним и поможем найти подходящий курс</span>
                                            </div>
                                            <button onClick={() => setIsModalOpen(true)} className='py-2.5 px-4 rounded-lg font-medium border border-black hover:bg-[#A621F3] hover:text-white hover:border-[#A621F3] transition'>
                                                Нужна помощь
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className='flex items-center gap-2 mb-6 flex-wrap'>
                                {activeCategoryObjects.length > 0 ? (
                                    activeCategoryObjects.map((cat, i) => (
                                        <div key={cat.id} className='flex items-center gap-2'>
                                            <h4 className='font-bold text-2xl'>{cat.label}</h4>
                                            {i < activeCategoryObjects.length - 1 && <span className='text-2xl'>/</span>}
                                        </div>
                                    ))
                                ) : (
                                    <h4 className='font-bold text-2xl'>Результаты поиска</h4>
                                )}
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map(course => (
                                        <Link href={route('course.show', course.id)} key={course.id} className='flex relative flex-col gap-4 group animate-in fade-in slide-in-from-bottom-4 duration-500'>
                                            <div className='flex flex-col px-4 py-2.5 rounded-2xl gap-2 z-10 absolute left-2.5 top-2.5 w-fit max-w-[calc(100%-20px)] bg-white/90 backdrop-blur-sm'>
                                                <span className='font-medium'>{course.price} ₽</span>
                                            </div>
                                            <div className='flex flex-col px-4 py-2.5 rounded-2xl gap-2 z-10 absolute right-2.5 top-2.5 w-fit max-w-[calc(100%-20px)] bg-white/90 backdrop-blur-sm'>
                                                <span className='font-medium'>{course.parent_group_id}</span>
                                            </div>
                                            <div className='relative rounded-2xl overflow-hidden aspect-video bg-gray-100 h-[350px]'>
                                                {course.preview_url ? (
                                                    <img 
                                                        src={course.preview_url} 
                                                        alt={course.name} 
                                                        className='object-cover w-full h-full group-hover:scale-105 transition duration-500' 
                                                    />
                                                ) : (
                                                    <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                                                        <span className='text-gray-400'>Нет изображения</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <h4 className='font-medium leading-tight group-hover:text-[#A621F3] transition'>{course.name}</h4>
                                                <span className='text-sm text-gray-500 font-medium'>
                                                    {rangeDate(course.start_date, course.end_date)}
                                                </span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className='col-span-full py-20 text-center'>
                                        <p className='text-gray-500'>По вашему запросу ничего не найдено</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </main>
                <SubscribeBox/>
            </div>
            {isModalOpen && <ModalHelps onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

Courses.layout = page => <PageLayout children={page} />;

export default Courses;