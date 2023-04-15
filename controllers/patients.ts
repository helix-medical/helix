import { Response, Request } from 'express';
import queries from '../database/queries';

const readAll = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            *
        FROM
            patients
        ORDER BY
            name ASC
    `;
    await queries.pull(req, res, sqlQuery, [], { id: '', name: 'Patients', verb: 'returned' });
};

const readAllConnexion = async (req: Request, res: Response) => {
    const sqlQuery = `
        SELECT
            id,
            name,
            lastName
        FROM
            patients
        ORDER BY
            name ASC
    `;
    await queries.pull(req, res, sqlQuery, [], { id: '', name: 'Patients', verb: 'returned for appointment' });
};

export default module.exports = {
    readAll,
    readAllConnexion,
};
