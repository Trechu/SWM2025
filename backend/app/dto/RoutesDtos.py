from pydantic import BaseModel

from ..common.enums import SpecificTransportationType
from ..common.location import Location

class StartRouteDtoRequest(BaseModel):
    startLocation: Location
    transportationMode: SpecificTransportationType

class FinishRouteDtoRequest(BaseModel):
    endLocation: Location

class StartRouteDtoResponse(BaseModel):
    id: int
    userId: int
    startLocation: Location
    active: bool
    transportationMode: SpecificTransportationType

class FinishRouteDtoResponse(BaseModel):
    id: int
    userId: int
    startLocation: Location
    endLocation: Location
    active: bool
    distance: float
    transportationMode: SpecificTransportationType