import PageLayout from '@/Layouts/PageLayout';
import SeoTags from '@/Components/Seo/SeoTags';

const AboutUs = ({seo}) => {
    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold '>
                    О нас
                </h1>
            </div>
            <div className='flex flex-col gap-5 mb-6'>
                <div className='bg-purple-50 rounded-2xl p-5'>
                    <p className='font-medium'>
                        Центр дополнительного профессионального образования Мелитопольского университета — это современная образовательная площадка, созданная для тех, кто стремится к профессиональному росту, освоению новых компетенций и уверенному развитию карьеры в меняющемся мире.
                    </p>
                </div>
                <h2 className='font-bold text-2xl'>Наша миссия</h2>
                <div className='bg-purple-50 rounded-2xl p-5'>
                    <p className='font-medium'>
                        Делать качественное дополнительное образование доступным, практико-ориентированным и соответствующим реальным запросам рынка труда и профессиональных стандартов. Мы объединяем академические традиции университета с гибкими форматами обучения взрослых.
                    </p>
                </div>
                <h2 className='font-bold text-2xl'>Ключевые преимущества</h2>
                <div className='bg-purple-50 rounded-2xl p-5 flex flex-col gap-5'>
                    <div>
                        <div className='flex items-center gap-4'>
                            <div className='w-[30px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                                </svg>
                            </div>
                            <span className='font-medium text-lg'>Актуальные программы</span>
                        </div>
                        <p className='ml-12'>
                            Направления разрабатываются совместно с практикующими экспертами и соответствуют современным требованиям к специалистам.
                        </p>
                    </div>

                    <div>
                        <div className='flex items-center gap-4'>
                            <div className='w-[30px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                                </svg>
                            </div>
                            <span className='font-medium text-lg'>Официальные документы</span>
                        </div>
                        <p className='ml-12'>
                            По окончании выдаются удостоверения о повышении квалификации или дипломы о профессиональной переподготовке установленного образца.
                        </p>
                    </div>

                    <div>
                        <div className='flex items-center gap-4'>
                            <div className='w-[30px]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"/>
                                </svg>
                            </div>
                            <span className='font-medium text-lg'>Опытные преподаватели</span>
                        </div>
                        <p className='ml-12'>
                            Курсы ведут действующие учёные, методисты и практики с многолетним стажем.
                        </p>
                    </div>
                </div>
                <h2 className='font-bold text-2xl'>Для кого мы работаем</h2>
                <div className='bg-purple-50 rounded-2xl p-5 flex flex-col gap-5'>
                    <div className='flex items-center gap-5'>
                        <div className='w-[24px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                            </svg>
                        </div>
                        <span className='font-medium text-lg'>Педагоги и методисты, стремящиеся соответствовать обновлённым профессиональным стандартам</span>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='w-[24px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                            </svg>
                        </div>
                        <span className='font-medium text-lg'>Специалисты, желающие освоить смежную профессию или углубить экспертизу</span>
                    </div>

                     <div className='flex items-center gap-5'>
                        <div className='w-[24px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                            </svg>
                        </div>
                        <span className='font-medium text-lg'>Руководители и управленцы, развивающие soft- и hard-навыки</span>
                    </div>

                     <div className='flex items-center gap-5'>
                        <div className='w-[24px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                            </svg>
                        </div>
                        <span className='font-medium text-lg'>Выпускники вузов, повышающие конкурентоспособность на рынке труда</span>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='w-[24px]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="fill-[#A621F3]" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
                            </svg>
                        </div>
                        <span className='font-medium text-lg'>Все, кто придерживается принципов «обучение на протяжении всей жизни» и готов инвестировать в своё развитие</span>
                    </div>
                </div>
                <h2 className='font-bold text-2xl'>Присоединяйтесь к нам</h2>
                <div className='bg-purple-50 rounded-2xl p-5'>
                    <p className='font-medium'>
                        Выберите подходящую программу, подайте заявку и начните путь к новым профессиональным возможностям уже сегодня. Центр ДПО Мелитопольского университета — ваш надёжный партнёр в непрерывном образовании.
                    </p>
                </div>
            </div>
        </>
    );
};

AboutUs.layout = page => <PageLayout children={page} />;

export default AboutUs;