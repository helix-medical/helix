import React from 'react';
import Features from '../sections/features';
import Hero from '../sections/hero';
import HeaderWebsite from './header';
import Faq from '../sections/questions';
import Footer from './footer';
import UserReview from '../sections/user-review';
import Banner from '../sections/banner';

const App = () => {
    return (
        <>
            <HeaderWebsite />
            <Hero />
            <Features />
            <UserReview />
            <Faq />
            <Banner />
            <Footer />
        </>
    );
};

export default App;
