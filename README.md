# Laboratory Sample Collection <img width="40" height="40" alt="leber_icon" src="https://github.com/user-attachments/assets/69bb7d95-247b-48ac-a6a0-85d231faea71" />

## Out Now - Version 1.1.8
- New options tracking sample categories are more efficient
- Bug fixes, where it can happen that changed text is not saved

## Overview
The Laboratory Sample Collection is a locally deployable electronic laboratory system for structured documentation and management of laboratory samples. It was initially created due to a lack of alternatives, especially since similar LIMS systems cannot offer comparable functionality. The application has been in active use at a research institution since 2024 and is constantly being expanded.

### Main Features
- structured acquisition of laboratory samples
- biobank workflow support
- designed for clinical-adjacent environments
- fully local deployable docker setup
- electronic laboratory management system

### Arcitecture
The sample collection is based on four main components, which are run via a Docker 🐳 setup.
  > API (backend) - default port 8000:8000

  > User-Interface (frontend) - default port 3000:3000 
  
  > mariadb:11.3 (sql-database) - default port 3306:3306
  
  > phpmyadmin (database management) - default port 8080:80
  

## Get started
To start the application, Docker must be installed.  Modify both `.env` files according to your needs, and then run Docker Compose.

### Docker Setup
Install Docker 

### Environment Variables
#1: Create a .env file in the ~ route with the Environment Variables Below. `.env`
```bash
DATABASE_HOSTNAME=mysql
DATABASE_PORT=3456
DATABASE_NAME=test_db
DATABASE_USERNAME=test_db
DATABASE_PASSWORD=***********
FRONTEND_PATH=frontend/.env
```

#2: Create a .env file in the frontend/ route with the Environment Variables Below: `frontend/.env`
```bash
NEXT_PUBLIC_CONTACT_NAME_ONE=Your Name
NEXT_PUBLIC_CONTACT_MAIL_ONE=Your Email
NEXT_PUBLIC_CONTACT_NAME_TWO=Your Name
NEXT_PUBLIC_CONTACT_MAIL_TWO=Your Email
NEXT_PUBLIC_DELETE_PASSCODE=1111
```
## Get started - Database
Create a new MySql or MariaDB database within your the local environment. Match the credentials with the .env file.

## Get started - Run the Application
```bash
docker compose -f docker-compose.yaml up
```

If required
```bash
sudo docker compose -f docker-compose.yaml up
```

The application will athomaticly fill your database with data from app\seed.py. After initalisation the system is ready to use.

### Additional Informations - Servers  
The application is ready for server deployment. Therefore, it is strongly recommended that the necessary security-related adjustments be made in the following areas. Using the default ports is not recommended; instead, they should be changed. No warranty of completeness is provided.
- \app\main.py
- \app\schemas.py
- Dockerfile
- docker-compose.yaml


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
