import crypto from 'crypto';

const uuid = () => {
    return crypto.randomBytes(4).toString('hex');
};

export default uuid;
