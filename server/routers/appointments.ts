import { Router, Response, Request, NextFunction } from "express";
const router: Router = Router();
import db from "../db";
import validate from "../validation/validator";

router.get("/", (req: Request, res: Response) => {
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.status, patients.name, patients.lastName, patients.sex 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    `;
    db.query(sqlQuery, (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get("/:id/read", (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT *
    FROM appointments
    WHERE id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.get("/:id/appointment", (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery = `
    SELECT appointments.id, appointments.date, appointments.reasons, appointments.anamnesis, appointments.conclusion, appointments.patientId, appointments.status, patients.name, patients.lastName, patients.email, patients.birthDate, patients.city, patients.sex, patients.passif 
    FROM appointments INNER JOIN patients ON appointments.patientId = patients.id
    WHERE appointments.id = ?
    `;
    db.query(sqlQuery, appointmentId, (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

router.use("/new", (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.appointmentCreate(req.body);
    if (!isValid) {
        return res.json(validate.appointmentCreate.errors);
    }
    next();
});

router.post("/new", (req: Request, res: Response) => {
    const sqlQuery =
        "INSERT INTO appointments " +
        "(`patientId`, `date`, `reasons`, `anamnesis`, `conclusion`, `status`) VALUES (?)";
    const values = [
        req.body.patientId,
        req.body.date,
        req.body.reasons,
        req.body.anamnesis,
        req.body.conclusion,
        "pending",
    ];

    db.query(sqlQuery, [values], (err: any, data: { insertId: any }) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data.insertId);
    });
});

router.use("/:id/update", (req: Request, res: Response, next: NextFunction) => {
    const isValid = validate.appointmentUpdate(req.body);
    if (!isValid) {
        return res.json(validate.appointmentUpdate.errors);
    }
    next();
});

router.put("/:id/update", (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const sqlQuery =
        "UPDATE appointments " +
        "SET `anamnesis` = ?, `conclusion` = ?, `status` = ? " +
        "WHERE id = ?";
    const values = [req.body.anamnesis, req.body.conclusion, "finished"];

    db.query(sqlQuery, [...values, appointmentId], (err: any, data: any) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(`Appointment ${appointmentId} updated`);
    });
});

export default router;
