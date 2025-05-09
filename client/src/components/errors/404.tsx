import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core';
import image from '../../assets/404.png';
import { useNavigate } from 'react-router-dom';
import classes from './errors.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  // In SimpleGrid props:  breakpoints={[{ maxWidth: 'sm', cols: 1, spacing: 40 }]}>
  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={80} cols={2}>
        <Image src={image} className={classes.desktopImage} />
        <div>
          <Title className={classes.title}>Page not found...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to
            another URL. If you think this is an error contact support.
          </Text>
          <Button variant="outline" size="md" mt="xl" className={classes.control} onClick={() => navigate('/')}>
            Get back to home page
          </Button>
        </div>
        {/*<Image src={image} className={classes.mobileImage} />*/}
      </SimpleGrid>
    </Container>
  );
};

export default NotFound;
