import React from "react";
import { Alert, Title } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

const Home = () => {
    return (
        <>
            <Title order={1}>Welcome User</Title>
            <Alert
                icon={<IconHeart size="1rem" />}
                title="Important"
                color="yellow"
                radius="lg"
            >
                <Title order={2}>Je t'aime Maivy 💛</Title>
            </Alert>
        </>
    );
};

export default Home;
