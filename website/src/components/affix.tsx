import { IconArrowUp } from '@tabler/icons-react';
import { useWindowScroll } from '@mantine/hooks';
import { ActionIcon, Affix, Transition, rem } from '@mantine/core';

const AffixWebsite = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <Affix position={{ bottom: rem(30), right: rem(30) }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <ActionIcon
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                        size="xl"
                        color="blue"
                        variant="subtle"
                        radius="xl"
                    >
                        <IconArrowUp size="1.5rem" />
                    </ActionIcon>
                )}
            </Transition>
        </Affix>
    );
};

export default AffixWebsite;
