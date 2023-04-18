import React from 'react';
import { Container, Title, Accordion, createStyles, rem } from '@mantine/core';
import { IconPassword } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    wrapper: {
        paddingTop: `calc(${theme.spacing.xl} * 2)`,
        paddingBottom: `calc(${theme.spacing.xl} * 2)`,
        minHeight: 650,
    },

    title: {
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },

    item: {
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

const placeholder =
    'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.';

const mockdata = [
    {
        question: 'How can I reset my password?',
        answer: placeholder,
        icon: IconPassword,
    },
    {
        question: 'Can I create more that one account?',
        answer: placeholder,
        icon: IconPassword,
    },
    {
        question: 'How can I subscribe to monthly newsletter?',
        answer: placeholder,
        icon: IconPassword,
    },
    {
        question: 'Do you store credit card information securely?',
        answer: placeholder,
        icon: IconPassword,
    },
];

const Faq = () => {
    const { classes } = useStyles();

    const questions = mockdata.map((item) => (
        <Accordion.Item className={classes.item} value={item.question} key={item.question}>
            <Accordion.Control icon={<item.icon size="1.2rem" />}>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Container size="sm" className={classes.wrapper} id="faq">
            <Title align="center" className={classes.title}>
                Frequently Asked Questions
            </Title>

            <Accordion variant="separated">{questions}</Accordion>
        </Container>
    );
};

export default Faq;
