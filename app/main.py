from sqlalchemy.sql import text

from fastapi import Depends, FastAPI
from .database import get_db, engine, SessionLocal, Base
from sqlalchemy.orm import Session
from .models import differenzierungsmerkmal_gewebe, differenzierungsmerkmal_urin, differenzierungsmerkmal_serum , probeninformation, status, gewebeproben, probenabholer, serumproben, urinproben, patient, paraffinproben, probenquelle_urin, vorlaeufige_proben, uebergeordnete_probenart_paraffin, untergeordnete_probenart_paraffin
from .config import settings
from .routers import post_new_data, put_tabledata, tables, number_entrys, patch_ausschleusen, patch_wiedereinschleusen, delete_tabledata
from fastapi.middleware.cors import CORSMiddleware
from app.seed import seed_status_data


app = FastAPI()

#origin list for websites
origins = ["http://localhost:3000", "http://api:8000", "http://api:3000", "http://localhost:8000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#initalize database !order! Child-Tables first
status.Base.metadata.create_all(bind=engine)
differenzierungsmerkmal_gewebe.Base.metadata.create_all(bind=engine)
differenzierungsmerkmal_urin.Base.metadata.create_all(bind=engine)
differenzierungsmerkmal_serum.Base.metadata.create_all(bind=engine)
untergeordnete_probenart_paraffin.Base.metadata.create_all(bind=engine)
uebergeordnete_probenart_paraffin.Base.metadata.create_all(bind=engine)
probeninformation.Base.metadata.create_all(bind=engine)

probenquelle_urin.Base.metadata.create_all(bind=engine)
probenabholer.Base.metadata.create_all(bind=engine)
vorlaeufige_proben.Base.metadata.create_all(bind=engine)

gewebeproben.Base.metadata.create_all(bind=engine)
paraffinproben.Base.metadata.create_all(bind=engine)
serumproben.Base.metadata.create_all(bind=engine)
urinproben.Base.metadata.create_all(bind=engine)
patient.Base.metadata.create_all(bind=engine)

try:
    db = SessionLocal()
    seed_status_data(db)
finally:
    db.close()


app.include_router(tables.router)
app.include_router(post_new_data.router)
app.include_router(number_entrys.router)
app.include_router(put_tabledata.router)
app.include_router(patch_wiedereinschleusen.router)
app.include_router(patch_ausschleusen.router)
app.include_router(delete_tabledata.router)


@app.get("/")
def test_db_connection(db: Session = Depends(get_db)):
    try:
        # Use text() to wrap raw SQL
        result = db.execute(text("SELECT 1")).fetchone()
        
        # Extract the value from the result tuple
        return {"status": "success", "result": result[0]}
    except Exception as e:
        return {"status": "error", "error": str(e)}