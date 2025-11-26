# app/models/__init__.py
# import models for alembic

from .patient import Patient
from .serumproben import Serumproben
from .paraffinproben import Paraffinproben
from .urinproben import Urinproben
from .gewebeproben import Gewebeproben
from .differenzierungsmerkmal_gewebe import Differenzierungsmerkmal_gewebe
from .differenzierungsmerkmal_serum import Differenzierungsmerkmal_serum
from .differenzierungsmerkmal_urin import Differenzierungsmerkmal_urin
from .probenabholer import Probenabholer
from .probeninformation import Probeninformation
from .probenquelle_urin import Probenquelle_urin
from .status import Status
from .uebergeordnete_probenart_paraffin import Uebergeordnete_probenart_paraffin
from .untergeordnete_probenart_paraffin import Untergeordnete_probenart_paraffin
from .vorlaeufige_proben import VorlaeufigeProben
