
from app.common.enums import SpecificTransportationType
from app.common.location import Location
from app.db.models import Route
from app.db.setup import SessionDep
from app.dto.RoutesDtos import StartRouteDtoResponse


def create_route(
    user_id: int,
    latitude: float,
    longitude: float,
    transportationMode: SpecificTransportationType,
    session: SessionDep
) -> StartRouteDtoResponse:
    route = Route(
        user_id=user_id,
        start_longitude=longitude,
        start_latitude=latitude,
        transportation_type=transportationMode
    )

    session.add(route)
    session.commit()
    session.refresh(route)

    location = Location(
        latitude=latitude,
        longitude=longitude
    )

    return StartRouteDtoResponse(
        id=route.id,
        userId=user_id,
        startLocation=location,
        active=True,
        transportationMode=transportationMode
    )