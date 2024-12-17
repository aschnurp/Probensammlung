import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import validator
from typing import List

class Settings(BaseSettings):
    database_hostname: str 
    database_port: str 
    database_password: str
    database_name: str
    database_username: str
    frontend_path: str
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()