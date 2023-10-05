import { Anchor, Text } from '@mantine/core';
import {
    IconArrowBarToDown,
    IconAt,
    IconBug,
    IconCode,
    IconCurrencyEuroOff,
    IconShieldCheckFilled,
    IconUsersGroup,
} from '@tabler/icons-react';

const questionsData = [
    {
        question: 'Pourquoi Helix est-il gratuit ?',
        answer: (
            <Text>
                Helix est gratuit pour tout le monde. Nous croyons dans le concept d'
                <Text span fs="italic">
                    open source
                </Text>{' '}
                (code ouvert, accessible à tous) pour une plus grande transparence et une meilleure sécurité. Chaque
                professionnel de santé doit pouvoir utiliser un système de gestion de patient qui ne lui coûte pas un
                abonnement ou une grosse somme à l'achat
            </Text>
        ),
        icon: IconCurrencyEuroOff,
    },
    {
        question: 'Combien de personnes peuvent utiliser Helix ?',
        answer: (
            <Text>
                Nous avons créé Helix dans le but d'être utilisable par chaque personne travaillant dans un cabinet
                médical, et ce, quelqu'en soit son rôle. Vous pouvez utiliser Helix en temps qu'Ostéopathe, mais aussi
                en temps que secrétaire, tout en conservant le secret médical et en appliquant la loi de protection des
                données des patients.
            </Text>
        ),
        icon: IconUsersGroup,
    },
    {
        question: 'Comment Helix garantit-il la sécurité de mes données et de celles de mes patients ?',
        answer: (
            <Text>
                Nous pensons que les données des patients sont trop sensibles pour sortir de votre cabinet. C'est
                pourquoi Helix garantit que vos données restent chez vous. Elles sont hébergées sur l'appareil où est
                installé Helix, et personne d'autre que vous n'y a accès. Nous appliquons la loi en vigueur et les
                recommandations des autorités de santé pour garantir la sécurité de vos données.
            </Text>
        ),
        icon: IconShieldCheckFilled,
    },
    {
        question: 'Comment puis-je installer Helix ?',
        answer: (
            <Text>
                Helix est une application web, c'est-à-dire qu'il n'y a pas d'installation à effectuer sur votre
                appareil. La seule installation requise est celle du serveur. Vous trouverez plus d'informations dans la{' '}
                <span>
                    <Anchor href="https://helix-medical.github.io/docs/getting-started/index.html" target="_blank">
                        documentation d'Helix
                    </Anchor>
                </span>
                .
            </Text>
        ),
        icon: IconArrowBarToDown,
    },
    {
        question: "Comment puis-je contacter l'équipe d'Helix ?",
        answer: (
            <Text>
                Pour toute demande, informations, retour d'expérience, ou autre, n'hésitez pas à nous contacter par mail
                à l'adresse{' '}
                <span>
                    <Anchor href="mailto:contact.helix@skiff.com" target="_blank">
                        contact.helix@skiff.com
                    </Anchor>
                </span>
                . Nous serons ravis de vous répondre !
            </Text>
        ),
        icon: IconAt,
    },
    {
        question: 'Comment puis-je contribuer à Helix ?',
        answer: (
            <Text>
                Helix est un projet{' '}
                <Text span fs="italic">
                    open source
                </Text>
                . Cela signifie que vous pouvez contribuer au projet en proposant des améliorations, en corrigeant des
                bugs, ou en ajoutant des fonctionnalités. Vous pouvez trouver plus d'informations sur la{' '}
                <span>
                    <Anchor href="https://helix-medical.github.io/docs/contributing/index.html" target="_blank">
                        documentation d'Helix
                    </Anchor>
                </span>
                .
            </Text>
        ),
        icon: IconCode,
    },
    {
        question: 'Comment puis-je signaler un bug ?',
        answer: (
            <Text>
                Vous pouvez signaler un bug en créant une{' '}
                <span>
                    <Anchor href="https://github.com/helix-medical" target="_blank">
                        issue sur GitHub
                    </Anchor>
                </span>
                , ou encore en nous contactant par mail à l'adresse{' '}
                <span>
                    <Anchor href="mailto:contact.helix@skiff.com" target="_blank">
                        contact.helix@skiff.com
                    </Anchor>
                </span>
                . Nous vous remercions d'avance pour votre aide !
            </Text>
        ),
        icon: IconBug,
    },
];

export { questionsData };
