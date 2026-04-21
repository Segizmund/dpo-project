import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className='bg-[#292929] py-10'>
            <div className='flex flex-col xl:flex-row gap-10 xl:gap-0 justify-between text-white container mx-auto px-2.5'>
                <div className='flex flex-col gap-3 order-2 xl:order-1'>
                    <h4 className='font-bold text-2xl'>Направление</h4>
                    <div className='grid sm:grid-cols-2 gap-2 sm:gap-10 border-t pt-3'>
                        <div className='flex flex-col gap-2'>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Программирование
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Аналитика
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Управление
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Игры
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Маркетплейсы
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Нейросети
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Все курсы
                            </Link>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Дизайн
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Маркетинг
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Финансы
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Кино и музыка
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Инженерия
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Английский язык
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='grid sm:grid-cols-3 gap-10 order-1 xl:order-2'>
                    <div className='flex flex-col gap-3'>
                        <h4 className='font-bold text-2xl'>О ДПО</h4>
                        <div className='flex flex-col gap-2 border-t pt-3'>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                О нас
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Студенты
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Центр карьеры
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Найти сотрудника
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Отзывы
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Контакты
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Вакансии
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Школа кураторов
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Сообщество Skillbox
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                О платформе
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Оплата
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Для бизнеса
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h4 className='font-bold text-2xl'>Проекты</h4>
                        <div className='flex flex-col gap-2 border-t pt-3'>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Вебинары
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Медиа
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Распродажа
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Бесплатные курсы
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Skillbox Kids
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Школа дизайна
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Школа менеджмента
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Школа программирования
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Школа маркетинга
                            </Link>
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h4 className='font-bold text-2xl'>Сотрудничество</h4>
                        <div className='flex flex-col gap-2 border-t pt-3'>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Скидки для друзей
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Партнерская программа
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Корпоративным клиентам
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Работодателям
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Материалы бренда
                            </Link>
                            <Link className='hover:opacity-80 transition duration-300 ease-linear font-medium'>
                                Социальные проекты
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
