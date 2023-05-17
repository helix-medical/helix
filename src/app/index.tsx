import React from 'react';
import Banner from '../sections/banner';
import Faq from '../sections/questions';
import Features from '../sections/features';
import Footer from '../components/footer';
import Hero from '../sections/hero';
import { Layout } from './layout';
import { ThemeProvider } from './theme-provider';
import UserReview from '../sections/user-review';
import AffixWebsite from '../components/affix';
import CarouselSection from '../sections/carousel';

const App = () => {
    return (
        <ThemeProvider>
            <Layout>
                <AffixWebsite />
                <Hero />
                <Features />
                <CarouselSection />
                <UserReview />
                <Faq />
                <Banner />
                <Footer />
            </Layout>
        </ThemeProvider>
    );
};

export default App;
