from pydantic import BaseModel

from backend.common.enums import SpecificTransportationType
from backend.common.location import Location
from backend.db.models import User


class StartRouteDtoRequest(BaseModel):
    startLocation: Location
    transportationMode: SpecificTransportationType

class FinishRouteDtoRequest(BaseModel):
    endLocation: Location

class StartRouteDtoResponse(BaseModel):
    id: int
    username: str
    start_coordinates: Location
    active: bool
    transportation_type: SpecificTransportationType

class FinishRouteDtoResponse(BaseModel):
    id: int
    username: str
    start_coordinates: Location
    end_coordinates: Location
    active: bool
    distance: float
    transportation_type: SpecificTransportationType