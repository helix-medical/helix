import React from "react";
import { Badge } from "@mantine/core";

interface IProps {
    id: number;
}

function Id({ id }: IProps): JSX.Element {
    return (
        <Badge color="gray" variant="outline">
            {id}
        </Badge>
    );
}

export default Id;
