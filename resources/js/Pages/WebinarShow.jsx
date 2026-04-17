import PageLayout from '@/Layouts/PageLayout';
import SeoTags from '@/Components/Seo/SeoTags';

const WebinarShow = ({seo}) => {
    return (
        <>
            <SeoTags seo={seo} />
            
            <div className='mt-10 mb-16'>
                <h1 className='text-4xl xl:text-6xl font-bold '>
                    Пример показа Вебинара
                </h1>
            </div>
            <div className='grid lg:grid-cols-[1fr_2fr] gap-8'>
                <div>
                    <div className='rounded-2xl overflow-hidden'>
                        <img className='object-cover w-full' src="/img/slide-1.png" alt="" />
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <div>
                        <h2 className='text-2xl font-bold'>Название Вебинара</h2>
                    </div>
                    <div>
                        <h3 className='text-lg font-semibold'>Спикер: Иванов Иван</h3>
                    </div>
                    <div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam tenetur dolorem aut officiis repellendus soluta animi pariatur error. Harum itaque consequatur vero possimus veritatis, libero quaerat magnam nisi ullam porro.
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sit libero labore corporis aliquam exercitationem molestiae. Voluptate ut animi recusandae quos cupiditate quo, quaerat aperiam dolore perspiciatis at, explicabo tempore!
                            Asperiores, dicta aliquam quisquam, minima commodi temporibus, ex non excepturi molestias perspiciatis est? Officia praesentium omnis excepturi nisi, commodi tempore dignissimos natus? Incidunt, sapiente quibusdam. Delectus laborum illum libero voluptates.
                            Minus reiciendis laborum distinctio aut error excepturi adipisci, illo amet voluptas nam libero possimus nobis autem temporibus quam facilis sed alias quasi quia doloribus. Totam aperiam repellat ut nostrum praesentium?
                            Enim impedit explicabo reprehenderit consectetur ullam odio quos possimus delectus, dicta laudantium recusandae id cumque, doloremque ratione! Quam soluta perspiciatis sapiente, quas hic unde minus. Magnam excepturi iure incidunt laudantium?
                            Omnis nostrum architecto sint dolorum placeat, temporibus alias, quaerat aliquid quae distinctio reprehenderit quam ex libero odit unde voluptates iusto fugit officiis vitae saepe. Fugiat in perferendis ea illum fugit.
                        </p>
                    </div>
                    <div>
                        <a href='#'
                            className={`flex w-fit py-4 px-12 rounded-xl font-bold text-white bg-[#A621F3] hover:opacity-85 hover:scale-105 transition duration-300 ease-linear`}
                        >
                            Узнать подробнее
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

WebinarShow.layout = page => <PageLayout children={page} />;

export default WebinarShow;