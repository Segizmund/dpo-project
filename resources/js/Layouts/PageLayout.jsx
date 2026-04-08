import { Link } from '@inertiajs/react';
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import ScrollToTop from '@/Components/ScrollToTop';

export default function PageLayout({ children }) {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className='container mx-auto'>
                <Header isHome={false}/>
            </div>
            <div className='min-h-screen container mx-auto px-2.5 2xl:px-0'>
                {children}
            </div>
            <Footer/>
            <ScrollToTop />
        </div>
    );
}
