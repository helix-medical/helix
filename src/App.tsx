import React from 'react';
import { FeaturesCards } from './features';
import { HeroBullets } from './hero';
import { HeaderAction } from './header';
import { FaqSimple } from './questions';
import { FooterSimple } from './footer';

function App() {
    return (
        <>
            <HeaderAction />
            <HeroBullets />
            <FeaturesCards />
            <FaqSimple />
            <FooterSimple />
        </>
    );
}

export default App;
