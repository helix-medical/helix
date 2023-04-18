import React from 'react';
import Features from './features';
import Hero from './hero';
import HeaderWebsite from './header';
import Faq from './questions';
import Footer from './footer';
import UserReview from './userReview';
import Banner from './banner';

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
