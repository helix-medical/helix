const roles = {
    admin: 2003,
    practitioner: 1998,
    secretary: 1515,
};

const getCode = (role: string) => {
    switch (role) {
        case 'admin':
            return 2003;
        case 'practitioner':
            return 1998;
        case 'secretary':
            return 1515;
    }
};

export default module.exports = {
    roles,
    getCode,
};
