import { Badge } from '@mantine/core';

const ID = ({ id, color }: { id: string; color?: string }): JSX.Element => (
    <Badge color={color ?? 'gray'} variant="dot" size="md">
        {id}
    </Badge>
);

const KindAppointment = ({ kind }: { kind: string }): JSX.Element => {
    let color: string;
    switch (kind) {
        case 'follow-up':
            color = 'indigo';
            break;
        case 'first-visit':
            color = 'green';
            break;
        case 'emergency':
            color = 'red';
            break;
        case 'pediatrics':
            color = 'yellow';
            break;
        case 'maternity':
            color = 'cyan';
            break;
        default:
            color = 'blue';
            break;
    }

    return (
        <Badge color={color} radius="md" variant="outline">
            {kind}
        </Badge>
    );
};

const PaymentMethod = ({ method }: { method: string }): JSX.Element => {
    let color = 'blue';
    if (method === 'cash') color = 'green';
    else if (method === 'check') color = 'yellow';
    else if (method === 'card') color = 'cyan';

    return (
        <Badge color={color} radius="md" variant="outline">
            {method}
        </Badge>
    );
};

const Sex = ({ sex }: { sex: string }) => (
    <Badge variant="outline" color={sex === 'F' ? 'pink' : 'blue'}>
        {sex}
    </Badge>
);

const StateAppointment = ({ state }: { state: string }): JSX.Element => (
    <Badge color={state === 'pending' ? 'blue' : 'green'}>{state}</Badge>
);

const Role = ({ role }: { role: string }) => {
    let color = 'blue';
    if (role === 'admin') color = 'red';
    if (role === 'practitioner') color = 'green';
    if (role === 'secretary') color = 'yellow';

    return (
        <Badge variant="light" radius="md" color={color}>
            {role}
        </Badge>
    );
};

const UserStatus = ({ status }: { status: string }): JSX.Element => {
    let color: string;
    switch (status) {
        case 'disabled':
            color = 'gray';
            break;
        case 'first-time':
            color = 'green';
            break;
        default:
            color = 'cyan';
            break;
    }
    return (
        <Badge radius="md" variant="outline" color={color}>
            {status}
        </Badge>
    );
};

export { ID, KindAppointment, PaymentMethod, Sex, StateAppointment, Role, UserStatus };
