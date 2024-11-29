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
#    secret_key: str
#    algorithm: str
#    access_token_expire_minutes: int
#    forget_password_link_expire_minutes: int
#    mail_username: str
#    mail_password: str
#    mail_from: str
#    mail_port: int
#    mail_server: str
#    mail_from_name: str
#    mail_starttls: bool
#    mail_ssl_tls: bool
#    use_credentials: bool
#    validate_certs: bool
    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()