from fastapi import FastAPI
from .database import get_db, engine, SessionLocal, Base
from sqlalchemy.orm import Session
from .models import status, gewebeproben, serumproben, urinproben, patient, paraffinproben
from .config import settings
from .routers import tables, number_entrys, post_routers, put_routers
from fastapi.middleware.cors import CORSMiddleware
from app.seed import seed_status_data


app = FastAPI()

#origin list for websites
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#initalize database !order!
status.Base.metadata.create_all(bind=engine)
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
app.include_router(post_routers.router)
app.include_router(number_entrys.router)
app.include_router(put_routers.router)







