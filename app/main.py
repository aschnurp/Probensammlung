from fastapi import FastAPI
from .database import get_db, engine
from sqlalchemy.orm import Session
from .models import gewebeproben, serumproben, urinproben, patient, paraffinproben
from .config import settings
from .routers import tables, number_entrys, post_routers
from fastapi.middleware.cors import CORSMiddleware


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
gewebeproben.Base.metadata.create_all(bind=engine)
paraffinproben.Base.metadata.create_all(bind=engine)
serumproben.Base.metadata.create_all(bind=engine)
urinproben.Base.metadata.create_all(bind=engine)
patient.Base.metadata.create_all(bind=engine)

app.include_router(tables.router)
app.include_router(post_routers.router)
app.include_router(number_entrys.router)







