from pydantic import BaseModel

from ..common.enums import SpecificTransportationType
from ..common.location import Location
from ..db.models import User


class StartRouteDtoRequest(BaseModel):
    startLocation: Location
    transportationMode: SpecificTransportationType

class FinishRouteDtoRequest(BaseModel):
    endLocation: Location

class StartRouteDtoResponse(BaseModel):
    id: int
    userId: int
    startCoordinates: Location
    active: bool
    transportationType: SpecificTransportationType

class FinishRouteDtoResponse(BaseModel):
    id: int
    userId: int
    startCoordinates: Location
    endCoordinates: Location
    active: bool
    distance: float
    transportationType: SpecificTransportationType