from fastapi import FastAPI
from .database import get_db, engine
from sqlalchemy.orm import Session
from .models import user, gewebeproben, serumproben, urinproben, patient
from .config import settings
from .routers import user, auth, password_reset, tables, custom_query
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
user.Base.metadata.create_all(bind=engine)
gewebeproben.Base.metadata.create_all(bind=engine)
serumproben.Base.metadata.create_all(bind=engine)
urinproben.Base.metadata.create_all(bind=engine)
patient.Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(password_reset.router)
app.include_router(tables.router)
app.include_router(custom_query.router)







