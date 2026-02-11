# Laboratory Sample Collection <img width="40" height="40" alt="leber_icon" src="https://github.com/user-attachments/assets/69bb7d95-247b-48ac-a6a0-85d231faea71" />


## Out Now - Version 1.1.3
- New option to add and view liver transplant samples

## Overview
The Laboratory Sample Collection is a locally deployable electronic laboratory system for structured documentation and management of laboratory samples.

## Main Features
- structured acquisition of laboratory samples
- biobank workflow support
- designed for clinical-adjacent environments
- fully local deployable docker setup
- electronic laboratory management system

## Get started - Docker
Modify the `.env` files according to your needs and then run docker compose.

## Docker Setup
Required environment file #1: `.env`
```bash
DATABASE_HOSTNAME=mysql
DATABASE_PORT=3456
DATABASE_NAME=test_db
DATABASE_USERNAME=test_db
DATABASE_PASSWORD=***********
FRONTEND_PATH=frontend/.env
```

Required environment file #2: `frontend/.env`
```bash
NEXT_PUBLIC_CONTACT_NAME_ONE=Your Name
NEXT_PUBLIC_CONTACT_MAIL_ONE=Your Email
NEXT_PUBLIC_CONTACT_NAME_TWO=Your Name
NEXT_PUBLIC_CONTACT_MAIL_TWO=Your Email
NEXT_PUBLIC_DELETE_PASSCODE=1111
```
## Get started - Database
Create a new MySql or MariaBD database within your the local environment. Match the credentials with the .env file.

## Get started - Run the Application
```bash
docker compose -f docker-compose.yaml up
```

If required
```bash
sudo docker compose -f docker-compose.yaml up
```


## License

Source code: LGPLv3  
http://opensource.org/licenses/LGPL-3.0

Documentation: CC BY-SA 4.0  
http://creativecommons.org/licenses/by-sa/4.0/

The source code is released under GPL v2+ or LGPL v2+ (your choice).  
This program is free software and provided without warranty.


## Funding

Supported by the Federal Ministry of Education and Research (BMBF, Germany)  
Systems Medicine of the Liver — Quantifying Liver Perfusion-Function Relationship in Complex Resection

Grant numbers: 465194077 (SPP 2311, Acronym: SimLivA), 031L0304C (BMFTR, Acronym: ATLAS)


© 2025 Anton Schnurpel
