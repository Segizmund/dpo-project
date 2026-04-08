import { useState } from 'react';

export default function ModalHelps({ onClose }) {
    const [modalAccepted, setModalAccepted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!modalAccepted) return;

        console.log('Данные отправлены:', Object.fromEntries(new FormData(e.target)));

        e.target.reset();
        setModalAccepted(false);
        onClose?.();
    };

    return (
        <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <div
                        className="relative bg-white rounded-[40px] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 
                                       hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                            aria-label="Закрыть"
                        >
                            ✕
                        </button>

                        <div className="p-6 md:p-8 lg:p-12">
                            <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
                                <div className="flex flex-col gap-5 justify-center">
                                    <h5 className="font-bold text-2xl md:text-3xl">Поможем решить все вопросы</h5>
                                    <p className="opacity-60 leading-relaxed">
                                        Если вы хотите больше узнать о ДПО или не знаете, какую программу обучения выбрать, оставьте заявку — и мы перезвоним.
                                    </p>
                                </div>

                                <div>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                                        <div className="flex flex-col gap-5">
                                            <input
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Имя"
                                                className="w-full rounded-lg bg-[#EFEFEF] border border-black p-3 focus:ring-[#A621F3] focus:border-[#A621F3] outline-none transition"
                                            />
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <input
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    placeholder="Телефон"
                                                    className="w-full rounded-lg bg-[#EFEFEF] border border-black p-3 focus:ring-[#A621F3] focus:border-[#A621F3] outline-none transition"
                                                />
                                                <input
                                                    name="email"
                                                    type="email"
                                                    required
                                                    placeholder="Электронная почта"
                                                    className="w-full rounded-lg bg-[#EFEFEF] border border-black p-3 focus:ring-[#A621F3] focus:border-[#A621F3] outline-none transition"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    id="privacy"
                                                    name="privacy"
                                                    type="checkbox"
                                                    checked={modalAccepted}
                                                    onChange={(e) => setModalAccepted(e.target.checked)}
                                                    className="w-5 h-5 rounded border-black text-[#A621F3] focus:ring-[#A621F3] cursor-pointer"
                                                />
                                                <label htmlFor="privacy" className="text-sm leading-tight cursor-pointer select-none">
                                                    Я соглашаюсь на <span className="underline decoration-[#A621F3]">обработку персональных данных</span>
                                                </label>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={!modalAccepted}
                                                className={`w-fit py-3 px-10 rounded-xl font-bold text-white transition-all duration-300
                                                    ${modalAccepted
                                                        ? 'bg-[#A621F3] hover:opacity-85 hover:scale-105 shadow-lg'
                                                        : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                Отправить
                                            </button>

                                            <p className="text-xs opacity-60">
                                                Нажимая на кнопку, я соглашаюсь с правилами пользования Платформой
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <input
                                                    id="advertisement"
                                                    name="advertisement"
                                                    type="checkbox"
                                                    className="w-5 h-5 rounded border-black text-[#A621F3] focus:ring-[#A621F3] cursor-pointer"
                                                />
                                                <label htmlFor="advertisement" className="text-sm leading-tight cursor-pointer select-none">
                                                    Я согласен получать рекламу и звонки
                                                </label>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}