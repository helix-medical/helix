import React from "react";
import { Badge } from "@mantine/core";

interface IProps {
    sex: string;
}

const SexBadge = ({sex}: IProps) => {
    return (
        <Badge
        variant='outline'
         color={
            sex === 'F' ? 'pink' : 'blue'
         }
        >
            {sex}
        </Badge>
    );
};

export default SexBadge;