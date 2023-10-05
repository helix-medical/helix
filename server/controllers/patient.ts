import { Response, Request } from 'express';
import uuid from '../tools/uuid';
import queries from '../database/queries';

const create = async (req: Request, res: Response) => {
    let id = uuid();
    while (await queries.checkId(id, 'patients', 'id')) id = uuid();
    const sqlQuery = `
        INSERT INTO
            patients (
                id,
                name,
                lastName,
                birthDate,
                sex,
                email,
                phone,
                address,
                city,
                job,
                doctor,
                passif
            )
        VALUES
            (?)
    `;
    const values = [
        id,
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.phone,
        req.body.address,
        req.body.city,
        req.body.job,
        req.body.doctor,
        req.body.passif,
    ];

    await queries.push(req, res, sqlQuery, [values], { id, name: 'Patient', verb: 'created' });
};

const read = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        SELECT
            *
        FROM
            patients
        WHERE
            id = ?
    `;

    await queries.pull(req, res, sqlQuery, [patientId], { id: patientId, name: 'Patient', verb: 'returned' });
};

const update = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        UPDATE
            patients
        SET
            name = ?,
            lastName = ?,
            birthDate = ?,
            sex = ?,
            email = ?,
            city = ?,
            passif = ?,
            address = ?,
            phone = ?,
            job = ?,
            doctor = ?
        WHERE
            id = ?
    `;
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.birthDate,
        req.body.sex,
        req.body.email,
        req.body.city,
        req.body.passif,
        req.body.address,
        req.body.phone,
        req.body.job,
        req.body.doctor,
    ];

    await queries.push(req, res, sqlQuery, [...values, patientId], { id: patientId, name: 'Patient', verb: 'updated' });
};

const delete_ = async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const sqlQuery = `
        DELETE 
        FROM
            patients
        WHERE
            id = ?
    `;
    await queries.push(req, res, sqlQuery, [patientId], { id: patientId, name: 'Patient', verb: 'deleted' });
};

export default module.exports = {
    create,
    read,
    update,
    delete: delete_,
};
