import { Link } from '@inertiajs/react';
import Header from '@/Components/Header'
import Footer from '@/Components/Footer'
import ScrollToTop from '@/Components/ScrollToTop';

export default function HomeLayout({ children }) {
    return (
        <div className="min-h-screen overflow-hidden">
            <div className='container mx-auto'>
                <Header isHome={true}/>
            </div>
            <div className='min-h-screen'>
                {children}
            </div>
            <Footer/>
            <ScrollToTop />
        </div>
    );
}
