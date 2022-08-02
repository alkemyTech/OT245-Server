# Server Base - Proyecto ONG

## Envinroment setup

1. Create database
2. Copy .env.example to .env and fill with database credentials.

To install dependencies, run

```bash
npm install
```

3. Migrations:

```bash
npx sequelize-cli db:migrate
```

4. Seeders:

```bash
npx sequelize-cli db:seed:all
```

## Start local server

```bash
npm start
```

## Test Users

Password: Camaro66.

```
# Users with roleId = 1

    - punblo@gmail.com
    - erica@gmail.com
    - Jsp@gmail.com
    - hans@gmail.com
    - qvos@gmail.com
    - ren@gmail.com
    - hutt@gmail.com
    - atano@gmail.com
    - macewin@gmail.com
    - fett@gmail.com
```

```
# Users with roleId = 2

    - piter@gmail.com
    - sb@gmail.com
    - fwalkerb@gmail.com
    - padmedala@gmail.com
    - assajven@gmail.com
    - lando@gmail.com
    - jynso@gmail.com
    - jqui@gmail.com
    - caradune@gmail.com
    - badyoda@gmail.com
```
