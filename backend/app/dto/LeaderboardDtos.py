from pydantic import BaseModel

class LeaderboardEntryResponse(BaseModel):
    position: int
    id: int
    username: str
    distance: float
    co2: float
    co2PerKilometer: float

class LeaderboardListResponse(BaseModel):
    leaderboard: list[LeaderboardEntryResponse]