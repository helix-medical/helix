INSERT INTO
    patients(
        id,
        `lastName`,
        name,
        `birthDate`,
        sex,
        email,
        passif,
        city
    )
VALUES (
        '12345678',
        'Michel',
        'Jean',
        '12/12/1212',
        'M',
        'jeanmichel@gmail,com',
        '{"medicalIssues": "Asthme", "lastAppointments": ["12345678", "12345678"]}',
        'Rennes'
    ), (
        '1f3d4b5a',
        'Dupont',
        'Gérard',
        '11/12/1212',
        'M',
        'gerarddupont@gmail,com',
        '{"medicalIssues": "Covid", "lastAppointments": ["12345678"]}',
        'Rennes'
    ), (
        '4a5b1f0e',
        'Martin',
        'Jeanne',
        '10/12/1212',
        'F',
        'jeannemartin@gmail,com',
        '{"medicalIssues": "Diabete", "lastAppointments": ["12345678", "12345678"]}',
        'Rennes'
    ), (
        '564f8693',
        'Roux',
        'Marie',
        '09/12/1212',
        'F',
        'marierox@gmail,com',
        '{"medicalIssues": "Covid", "lastAppointments": ["12345678"]}',
        'Rennes'
    );

SELECT * FROM patients;