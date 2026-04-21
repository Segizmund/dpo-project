import { Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import HomeLayout from '@/Layouts/HomeLayout';
import { useSliderAnimation } from '@/utils/sliderAnimation';
import DynamicSection from '@/Components/DynamicSection';
import CoursesSlider from '@/Components/CoursesSlider';
import SeoTags from '@/Components/Seo/SeoTags';
import ModalHelps from '@/Components/ModalHelps';

const Welcome = ({seo, entry, helpChoose, learnSkill}) => {
    const [sectionVision, setSectionVision] = useState('btn-first');
    const [activeButtonId, setActiveButtonId] = useState('btn-first');
    const [sectionContent, setSectionContent] = useState(entry);
    const [accepted, setAccepted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const parentRef = useRef(null);

    const { slideBackground, resetBackground } = useSliderAnimation(parentRef, activeButtonId);

    const handleClick = (id) => {
        const contentMap = {
            'btn-first': entry,
            'btn-second': helpChoose,
            'btn-third': learnSkill,
        };
        setActiveButtonId(id);
        setSectionVision(id);
        setSectionContent(contentMap[id]);
    };

    const loadMore = () => {
        setIsLoading(true);
        router.reload({
            data: { limit: currentLimit + 9 },
            only: ['webinars', 'currentLimit'],
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    useEffect(() => {
        if (helpChoose) {
            console.log('Данные из API обновились:', helpChoose);
        }
    }, [helpChoose]);

    return (
        <>
            <SeoTags seo={seo} />

            <div className='bg-[linear-gradient(180deg,_#833ED8_28.85%,_#FDA8F4_100%)] min-h-screen'>
                <div className='container px-2.5  mx-auto flex flex-col items-center pt-40 gap-16'>
                    <div>
                        <h1 className='text-white text-4xl md:text-6xl font-bold text-center'>Найди новую <br /> профессию в ДПО</h1>
                    </div>
                    <div className='grid sm:grid-cols-3 gap-8'>
                        <div className='flex flex-col gap-4 text-center'>
                            <h2 className='text-white text-2xl font-bold'>ДПО #1</h2>
                            <span className='text-white font-medium'>по качеству обучения</span>
                        </div>
                        <div className='flex flex-col gap-4 text-center'>
                            <h2 className='text-white text-2xl font-bold'>150 000+</h2>
                            <span className='text-white font-medium'>выпускников уже нашли <br /> работу мечты</span>
                        </div>
                        <div className='flex flex-col gap-4 text-center'>
                            <h2 className='text-white text-2xl font-bold'>1 000+</h2>
                            <span className='text-white font-medium'>компаний доверяют <br /> выпускникам ДПО</span>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap justify-center lg:w-[68%] mb-5'>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Популярное</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1 '>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Программирование</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Дизайн</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Маркетинг</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Нейросети</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Управление</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Финансы</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Создание игр</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Кино и музыка</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Маркетплейсы</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Инженерия</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Английский язык</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Для детей</span>
                        </Link>
                        <Link className='flex items-center gap-2 bg-white py-2.5 px-4 rounded-full hover:bg-black hover:text-white transition duration-300 ease-linear hover:-translate-y-1'>
                            <div>
                                <img className='w-5 h-5' src="/img/icon.png" alt="" />
                            </div>
                            <span className='font-medium'>Карьера</span>
                        </Link>
                        <button className='flex items-center gap-2 bg-black text-white py-2.5 px-4 rounded-full hover:bg-white hover:text-black transition duration-300 ease-linear hover:-translate-y-1 font-medium'
                        onClick={() => setIsModalOpen(true)}>Помогите выбрать</button>
                    </div>
                </div>
            </div>
            <div className='container px-2.5  mx-auto pt-10 md:pt-36'>
                <h3 className='text-4xl md:text-6xl font-bold text-center mb-16'>Более 1000 программ <br /> для карьеры и жизни</h3>
                <div ref={parentRef} className='relative bg-[#EFEFEF] rounded-3xl lg:rounded-full flex flex-col lg:flex-row items-center mb-12 w-full px-6 lg:px-12'>
                    <span
                        id="sliding-bg"
                        className='absolute pointer-events-none top-0 left-0 bg-black rounded-full transition-all duration-300 ease-in-out hidden lg:flex h-full z-0'
                        style={{
                            willChange: 'transform, width'
                        }}
                    />

                    <button
                        id="btn-first"
                        className='relative flex justify-center py-4 px-12 rounded-3xl lg:rounded-full z-10 transition duration-300 ease-linear w-full'
                        onClick={() => {
                            handleClick('btn-first');
                        }}
                        onMouseEnter={() => slideBackground('btn-first')}
                        onMouseLeave={resetBackground}
                    >
                        <span className='font-semibold text-lg 2xl:text-xl transition-colors duration-300'>Часто выбирают</span>
                    </button>

                    <button
                        id="btn-second"
                        className='relative flex justify-center py-4 px-12 rounded-3xl lg:rounded-full z-10 transition duration-300 ease-linear  w-full'
                        onClick={() => {
                            handleClick('btn-second');
                        }}
                        onMouseEnter={() => slideBackground('btn-second')}
                        onMouseLeave={resetBackground}
                    >
                        <span className='font-semibold text-lg 2xl:text-xl transition-colors duration-300'>Войти в IT с нуля</span>
                    </button>

                    <button
                        id="btn-third"
                        className='relative flex justify-center py-4 px-12 rounded-3xl lg:rounded-full z-10 transition duration-300 ease-linear  w-full'
                        onClick={() => {
                            handleClick('btn-third');
                        }}
                        onMouseEnter={() => slideBackground('btn-third')}
                        onMouseLeave={resetBackground}
                    >
                        <span className='font-semibold text-lg 2xl:text-xl transition-colors duration-300'>Освоить навык</span>
                    </button>

                    <button
                        id="btn-fourth"
                        className='relative flex justify-center py-4 px-12 rounded-3xl lg:rounded-full z-10 transition duration-300 ease-linear  w-full'
                        onClick={() => {
                            handleClick('btn-fourth');
                            setIsModalOpen(true);
                        }}
                        onMouseEnter={() => slideBackground('btn-fourth')}
                        onMouseLeave={resetBackground}
                    >
                        <span className='font-semibold text-lg 2xl:text-xl transition-colors duration-300'>Помогите выбрать</span>
                    </button>
                </div>
                <div className='mb-12 lg:mb-28'>
                    {
                        activeButtonId !== 'btn-fourth' ? 
                        (<DynamicSection sectionContent={sectionContent} currentSection={sectionVision}/>)
                        :
                        (null)
                    }
                </div>
            </div>
            <div className='mb-12 lg:mb-28'>
                <CoursesSlider/>
            </div>
            <div className='container px-2.5  mx-auto mb-32'>
                <div className='grid lg:grid-cols-2 gap-5'>
                    <div className='flex flex-col gap-8'>
                        <h4 className='text-4xl sm:text-5xl xl:text-6xl font-bold'>Выдаём дипломы и сертификаты</h4>
                        <p className='opacity-60 text-xl font-medium'>
                            После окончания курса вы получите диплом о профессиональной переподготовке или сертификат установленного образца — тип документа можно уточнить у консультанта. Мы обучаем по государственной лицензии №Л035−1 298−77/179 609.
                        </p>
                    </div>
                    <div className='rounded-[40px] bg-[linear-gradient(180deg,_#833ED8_28.85%,_#FDA8F4_100%)]'>
                        <img className='w-full h-[250px] sm:h-full sm:object-cover' src="/img/certificate.png" alt="Сертификат" />
                    </div>
                </div>
            </div>
            <div className='container px-2.5  mx-auto mb-24 flex justify-center'>
                <div className='flex flex-col items-center gap-8 lg:w-[80%] relative'>
                    <img className='w-40 sm:w-auto absolute z-10 top-[-100px] sm:top-[-140px] 2xl:top-[-160px] left-[27%] 2xl:left-[30%]' src="/img/shape-1.png" alt="" />
                    <img className='w-28 sm:w-auto absolute z-10 top-[-30px] sm:top-[-55px] right-[-5%] 2xl:right-[5%]' src="/img/shape-2.png" alt="" />
                    <img className='w-20 sm:w-auto absolute z-10 bottom-[30px] sm:bottom-[-10px] left-0 sm:left-[10%] 2xl:left-[15%]' src="/img/shape-3.png" alt="" />
                    <h4 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-center relative z-20'>Сделайте первый шаг к жизни, которую хотите</h4>
                    <Link className='flex text-white bg-[#A621F3] py-4 px-12 rounded-xl w-fit hover:opacity-85 hover:scale-105 transition duration-300 ease-linear shadow-lg font-semibold'>
                        Выбрать курс
                    </Link>
                </div>
            </div>
            <div className='bg-[#250022] py-24'>
                <div className='container px-2.5  mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-5 bg-white p-12 rounded-[40px]'>
                        <div className='flex flex-col gap-5 lg:w-[60%]'>
                            <h5 className='font-bold text-3xl'>Поможем решить все вопросы</h5>
                            <p className='opacity-60'>
                                Если вы хотите больше узнать о ДПО или не знаете, какую программу обучения выбрать, оставьте заявку — и мы перезвоним
                            </p>
                        </div>
                        <div>
                            <form action="">
                                <div className='flex flex-col gap-12'>
                                    <div className='flex flex-col gap-5'>
                                        <div className='flex flex-col gap-2.5'>
                                            <div>
                                                <input name='name' type="text" required placeholder='Имя' className='w-full rounded-lg bg-[#EFEFEF] border border-black focus:ring-[#A621F3] focus:border-[#A621F3]'/>
                                            </div>
                                            <div className='grid sm:grid-cols-2 gap-2.5'>
                                                <div>
                                                    <input name='phone' type="text" required placeholder='Телефон' className='w-full rounded-lg bg-[#EFEFEF] border border-black focus:ring-[#A621F3] focus:border-[#A621F3]'/>
                                                </div>
                                                <div>
                                                    <input name='email' type="email" required placeholder='Электронная почта' className='w-full rounded-lg bg-[#EFEFEF] border border-black focus:ring-[#A621F3] focus:border-[#A621F3]'/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex items-center gap-3 cursor-pointer'>
                                            <input
                                                id="privacy"
                                                name='privacy'
                                                type="checkbox"
                                                checked={accepted}
                                                onChange={(e) => setAccepted(e.target.checked)}
                                                className='w-5 h-5 rounded border-black text-[#A621F3] focus:ring-[#A621F3] cursor-pointer'
                                            />
                                            <label htmlFor="privacy" className='leading-tight cursor-pointer font-medium select-none'>
                                                Я соглашаюсь на <span className='underline decoration-[#A621F3]'>обработку персональных данных</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <button
                                            type="submit"
                                            disabled={!accepted}
                                            className={`w-fit py-4 px-12 rounded-xl font-bold text-white transition-all duration-300
                                                ${accepted
                                                    ? 'bg-[#A621F3] hover:opacity-85 hover:scale-105 transition duration-300 ease-linear'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                        >
                                            Отправить
                                        </button>
                                        <p className='opacity-60'>
                                            Нажимая на кнопку, я соглашаюсь с правилами пользования Платформой
                                        </p>
                                        <div className='flex items-center gap-3 cursor-pointer'>
                                            <input
                                                id="advertisement"
                                                name='advertisement'
                                                type="checkbox"
                                                className='w-5 h-5 rounded border-black text-[#A621F3] focus:ring-[#A621F3] cursor-pointer'
                                            />
                                            <label htmlFor="advertisement" className='leading-tight cursor-pointer font-medium select-none'>
                                                Я согласен получать рекламу и звонки
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalHelps onClose={handleCloseModal} />
            )}
        </>
    );
};

Welcome.layout = page => <HomeLayout children={page} />;

export default Welcome;
