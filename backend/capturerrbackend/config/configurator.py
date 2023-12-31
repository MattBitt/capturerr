# BUILTIN modules
import os
import site
import sys
from typing import Tuple, Type, Union
from loguru import logger

# Third party modules
from pydantic import Field, field_validator
from pydantic_settings import (
    BaseSettings,
    PydanticBaseSettingsSource,
    SettingsConfigDict,
)
from yarl import URL

# Constants
CONFIG_DIR = "capturerrbackend/config"

MISSING_ENV = ">>> undefined ENV parameter <<<"
""" Error message for missing environment variables. """

MISSING_LOG_LEVEL = ">>> missing LOG_LEVEL setting <<<"
""" Error message for missing log_level setting. """

SECRETS_DIR = (
    "/run/secrets" if os.path.exists("/.dockerenv") else f"{CONFIG_DIR}/secrets"
)
""" This is where your secrets are stored (in Docker or locally). """

PLATFORM = {"linux": "Linux", "linux2": "Linux", "win32": "Windows", "darwin": "MacOS"}
""" Known platforms in my end of the world. """


ENVIRONMENT = os.getenv("ENVIRONMENT", MISSING_ENV)
""" Define environment. """



# --------------------------------------------------------------
# This needs to be done before the Base class gets evaluated, and
# to avoid getting five UserWarnings that the path does not exist.
#
# Create the directory if it does not already exist. When running
# inside Docker, skip it (Docker handles that just fine on its own).
#
if not os.path.exists("/.dockerenv"):
    os.makedirs(SECRETS_DIR, exist_ok=True)


# ------------------------------------------------------------------------
#
class Common(BaseSettings):
    """Common configuration parameters shared between all environments.

    Read configuration parameters defined in this class, and from
    ENVIRONMENT variables and from the .env file.

    The source priority is changed (from default) to the following
    order (from highest to lowest)::
      - init_settings
      - dotenv_settings
      - env_settings
      - file_secret_settings

    The following environment variables should already be defined::
      - HOSTNAME (on Linux servers only - set by OS)
      - COMPUTERNAME (on Windows servers only - set by OS)
      - ENVIRONMENT (on all servers - "dev" is default when missing)

    Path where your <environment>.env file should be placed::
      - linux: /home/<user>/.local
      - darwin: /home/<user>/.local
      - win32: C:\\Users\\<user>\\AppData\\Roaming\\Python'

    Path where your secret files should be placed::
      - linux: /home/<user>/.local/secrets
      - darwin: /home/<user>/.local/secrets
      - win32: C:\\Users\\<user>\\AppData\\Roaming\\Python\\secrets'

    You know you are running in Docker when the "/.dockerenv" file exists.
    """

    model_config = SettingsConfigDict(
        extra="ignore",
        secrets_dir=SECRETS_DIR,
        env_file_encoding="utf-8",
        env_file=f"{CONFIG_DIR}/.env",
    )

    # # secrets...
    # mongoPwd: str = MISSING_SECRET
    # mongo_url: str = MISSING_SECRET

    # postgres defaults
    db_host: str = "localhost"
    db_port: int = 5432
    db_user: str = "postgres"
    db_pass: str = "postgres"
    db_base: str = "postgres-db"
    db_echo: bool = False

    env: str = os.getenv("ENVIRONMENT", "dev")
    hdrData: dict[str, str] = {"Content-Type": "application/json"}
    platform: str = PLATFORM.get(sys.platform, "other")
    server: str = os.getenv("HOSTNAME", "hostname")

    users_secret: str = MISSING_ENV
    log_level: str = MISSING_LOG_LEVEL

    # to get a string like this run:
    # openssl rand -hex 32
    secret_key: str = MISSING_ENV
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    @field_validator("server")
    def remove_domain(cls, value: str) -> str:
        """Return server name stripped of possible domain part."""
        return value.upper().split(".")[0]

    @classmethod
    def settings_customise_sources(
        cls,
        settings_cls: Type[BaseSettings],
        init_settings: PydanticBaseSettingsSource,
        env_settings: PydanticBaseSettingsSource,
        dotenv_settings: PydanticBaseSettingsSource,
        file_secret_settings: PydanticBaseSettingsSource,
    ) -> Tuple[PydanticBaseSettingsSource, ...]:
        """Change source priority order (env trumps environment)."""
        return (init_settings, dotenv_settings, env_settings, file_secret_settings)


# ------------------------------------------------------------------------
#
class Dev(Common):
    """Configuration parameters for DEV environment.

    Values from dev.env supersedes previous values when the file exists.
    """

    env: str = "dev"
    db_url: str = "sqlite:///mydata.db"
    db_echo: bool = True
    log_level: str = "DEBUG"
    model_config = SettingsConfigDict(env_file=f"{CONFIG_DIR}/{env}.env")


# ------------------------------------------------------------------------
#
class Test(Common):
    """Configuration parameters for TEST environment.

    Values from test.env supersedes previous values when the file exists.
    """

    env: str = "test"
    db_url: str = "sqlite:///capturerr-testing-db.db"
    db_echo: bool = True
    log_level: str = "DEBUG"

    model_config = SettingsConfigDict(env_file=f"{CONFIG_DIR}/{env}.env")


# ------------------------------------------------------------------------
#
class Stage(Common):
    """Configuration parameters for STAGE environment.

    Values from stage.env supersedes previous values when the file exists.
    """

    env: str = "stage"
    db_url: str = "sqlite:///mydata-staging.db"
    log_level: str = "INFO"

    model_config = SettingsConfigDict(env_file=f"{CONFIG_DIR}/{env}.env")


# ------------------------------------------------------------------------
#
class Prod(Common):
    """Configuration parameters for PROD environment.

    Values from prod.env supersedes previous values when the file exists.
    """

    env: str = "prod"
    # Variables for the database
    db_host: str = "192.168.0.202"
    db_port: int = 5432
    db_user: str = "postgres"
    db_pass: str = "mblfjkrk81"
    db_base: str = "capturerr-prod"
    db_echo: bool = False

    @property
    def db_url(self) -> URL:
        """
        Assemble database URL from config.

        :return: database URL.
        """
        # return URL.build(
        #     scheme="postgresql+asyncpg",
        #     host=self.db_host,
        #     port=self.db_port,
        #     user=self.db_user,
        #     password=self.db_pass,
        #     path=f"/{self.db_base}",
        # )
        logger.debug(f"db_url: {self.db_base}")
        return f"sqlite:///{self.db_base}.db"

    # log_level: str = "DEBUG"
    model_config = SettingsConfigDict(env_file=f"{CONFIG_DIR}/{env}.env")


# ------------------------------------------------------------------------

# Translation table between ENVIRONMENT value and their classes.
_setup = dict(dev=Dev, test=Test, prod=Prod, stage=Stage)

# Validate and instantiate specified environment configuration.
config: Union[Dev, Test, Prod, Stage] = _setup[ENVIRONMENT]()
print("hello")

