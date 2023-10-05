INSERT INTO
    users(
        uid,
        name,
        lastName,
        role,
        password,
        lastActive,
        state
    )
VALUES (
        "a34b32df",
        "Default",
        "Admin",
        "admin",
        "$2a$10$dTvg/.awCwvHO/KTbxqnceGMnKyG5PCD.5wNOLO1A2tHiy5GHEu/y",
        "1970-01-01 00:00:00",
        "first-time"
    );

SELECT * FROM users;