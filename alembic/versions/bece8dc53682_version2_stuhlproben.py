"""Version2 - stuhlproben

Revision ID: bece8dc53682
Revises: d4fcb40778b6
Create Date: 2025-12-01 13:10:51.903972

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'bece8dc53682'
down_revision: Union[str, None] = 'd4fcb40778b6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Create table differenzierungsmerkmal_stuhl
    op.create_table(
        'differenzierungsmerkmal_stuhl',
        sa.Column('id', mysql.TINYINT(), autoincrement=True, nullable=False),
        sa.Column('differenzierungsmerkmal_text', mysql.TEXT(), nullable=True),
        sa.PrimaryKeyConstraint('id'),
        mysql_engine='InnoDB',
        mysql_charset='latin1',
        mysql_collate='latin1_swedish_ci'
    )

    # Create table stuhlproben
    op.create_table(
        'stuhlproben',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('timestamp', sa.TIMESTAMP(timezone=True), server_default=sa.text('CURRENT_TIMESTAMP'), nullable=False),
        sa.Column('patient_Id_intern', mysql.VARCHAR(200), nullable=True),
        sa.Column('created_at', mysql.TEXT(), nullable=True),
        sa.Column('abholer', mysql.TEXT(), nullable=True),
        sa.Column('uhrzeit', mysql.TEXT(), nullable=True),
        sa.Column('probenart', mysql.TEXT(), nullable=True),
        sa.Column('differenzierungsmerkmal', mysql.TINYINT(), nullable=True),
        sa.Column('anmerkungen', mysql.TEXT(), nullable=True),
        sa.Column('status', mysql.TINYINT(), nullable=True),
        mysql_engine='InnoDB',
        mysql_charset='latin1',
        mysql_collate='latin1_swedish_ci'
    )


def downgrade() -> None:
    op.drop_table('stuhlproben')
    op.drop_table('differenzierungsmerkmal_stuhl')
