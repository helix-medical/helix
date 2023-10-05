import React from 'react';
import { Container, Title, Accordion, Text } from '@mantine/core';
import { useQuestionsStyles } from './styles';
import { questionsData } from './data';

const Faq = () => {
    const { classes } = useQuestionsStyles();

    const questions = questionsData.map((item) => (
        <Accordion.Item className={classes.item} value={item.question} key={item.question}>
            <Accordion.Control icon={<item.icon size="1.5rem" />}>{item.question}</Accordion.Control>
            <Accordion.Panel>{item.answer}</Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Container size="sm" className={classes.wrapper} id="faq">
            <Title align="center" className={classes.title}>
                Questions / Réponses
            </Title>
            <Text align="center">Vous avez des questions ? Nous avons les réponses !</Text>
            <Text align="center" mb="lg">
                Si vous ne trouvez pas votre réponse, n'hésitez pas à nous contacter.
            </Text>

            <Accordion variant="separated">{questions}</Accordion>
        </Container>
    );
};

export default Faq;
