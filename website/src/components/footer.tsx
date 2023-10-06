import { Container, Group, Anchor, Text } from '@mantine/core';
import HelixLogo from './logo';
import { useComponentsStyles } from './styles';

const links = [
    { label: 'Docs', link: 'https://github.com/Xavier2p/helix/wiki' },
    { label: 'GitHub', link: 'https://github.com/Xavier2p/helix' },
];

const Footer = () => {
    const { classes } = useComponentsStyles().footer();
    const items = links.map((link) => (
        <Anchor<'a'> color="dimmed" key={link.label} href={link.link} size="sm">
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <HelixLogo />
                <Text size="sm" color="dimmed">
                    © 2023 Helix Medical
                </Text>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};

export default Footer;
