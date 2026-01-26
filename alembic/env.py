from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from app.config import settings
from app.models.patient import Patient
from app.models.serumproben import Serumproben
from app.models.paraffinproben import Paraffinproben
from app.models.urinproben import Urinproben
from app.models.gewebeproben import Gewebeproben
from app.models.differenzierungsmerkmal_gewebe import Differenzierungsmerkmal_gewebe
from app.models.differenzierungsmerkmal_serum import Differenzierungsmerkmal_serum
from app.models.differenzierungsmerkmal_urin import Differenzierungsmerkmal_urin
from app.models.probenabholer import Probenabholer
from app.models.probeninformation import Probeninformation
from app.models.probenquelle_urin import Probenquelle_urin
from app.models.status import Status
from app.models.uebergeordnete_probenart_paraffin import Uebergeordnete_probenart_paraffin
from app.models.untergeordnete_probenart_paraffin import Untergeordnete_probenart_paraffin
from app.models.vorlaeufige_proben import VorlaeufigeProben
from app.models.differenzierungsmerkmal_stuhl import Differenzierungsmerkmal_stuhl
from app.models.stuhlproben import Stuhlproben
from app.models.galleproben import Galleproben
from app.models.probeninformation_ltx import Probeninformation_ltx
from app.models.edtaplasmaproben import Edtaplasmaproben
from app.models.differenzierungsmerkmal_edtaplasma import Differenzierungsmerkmal_edtaplasma
from app.models.ltx_fragebogen import Ltx_fragebogen
from app.models.ltx_fragebogen_ernaerung_lookup import Ltx_fragebogen_ernaerung_lookup

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
config.set_main_option("sqlalchemy.url", f"mariadb://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}")


# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
from app.database import Base
import app.models

print("DEBUG TABLES:", list(Base.metadata.tables.keys()))

target_metadata = Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
