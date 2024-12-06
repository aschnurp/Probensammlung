## Overview

The final concept of this database solution is to provide the user with data in a secure yet convenient way. 
Research data will be made available to users through a web-based front-end using the latest high-security standards.

## Get started
_uvicorn app.main:app --host 0.0.0.0 --port 8000_

for the Frontend:

_npm run dev_ 

// do not forget to locate the correct frontend folder first //

## Docker setup
Create an environment file for docker `.env` with the following environment variables and set the password
```bash
DATABASE_HOSTNAME=mysql
DATABASE_PORT=3456
DATABASE_NAME=test_db
DATABASE_USERNAME=test_db
DATABASE_PASSWORD=***********
FRONTEND_PATH=path/to/frontend.dockerfile
```

Create an second environment file for docker `\frontend\.env` with the following environment variables 
```bash
NEXT_PUBLIC_CONTACT_NAME_ONE=Your Name
NEXT_PUBLIC_CONTACT_MAIL_ONE=Your EMail
NEXT_PUBLIC_CONTACT_NAME_TWO=Your Name
NEXT_PUBLIC_CONTACT_MAIL_TWO=Your EMail
NEXT_PUBLIC_ABHOLER_ONE=Your Name
NEXT_PUBLIC_ABHOLER_TWO=Your Name
NEXT_PUBLIC_ABHOLER_THREE=Your Name
NEXT_PUBLIC_ABHOLER_FOUR=Your Name
NEXT_PUBLIC_ABHOLER_FIVE=Your Name
NEXT_PUBLIC_ABHOLER_SIX=Your Name
```

Run the local test environment
```bash
sudo docker-compose -f docker-compose-develop.yml up
```

## License

* Source Code: `LGPLv3 <http://opensource.org/licenses/LGPL-3.0>`__
* Documentation: `CC BY-SA 4.0 <http://creativecommons.org/licenses/by-sa/4.0/>`__

The source code is released under both the GPL and LGPL licenses version 2 or
later. You may choose which license you choose to use the software under.

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License or the GNU Lesser General Public
License as published by the Free Software Foundation, either version 2 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU General Public License for more details.

## Funding

This project is supported by the Federal Ministry of Education and Research (BMBF, Germany)
within the research network Systems Medicine of the Liver (**LiSyM**, grant number 031L0054) 
and by the German Research Foundation (DFG) within the Research Unit Programme FOR 5151 
"`QuaLiPerF <https://qualiperf.de>`__ (Quantifying Liver Perfusion-Function Relationship in Complex Resection - A Systems Medicine Approach)" by grant number 436883643 by grant number 
465194077 (Priority Programme SPP 2311, Subproject SimLivA).

© 2024 Anton Schnurpel