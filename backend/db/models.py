from sqlmodel import Field, SQLModel

class Route(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    start_longitude: float = Field(default=0, index=False)
    start_altitude: float = Field(default=0, index=False)
    end_longitude: float = Field(default=0, index=False)
    end_altitude: float = Field(default=0, index=False)