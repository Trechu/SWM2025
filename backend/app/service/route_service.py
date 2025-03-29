import httpx

from app.common.enums import SpecificTransportationType, GenericTransportationType
from app.common.location import Location
from app.common.consts import ROUTE_API_URL
from app.db.models import Route
from app.db.setup import SessionDep
from app.dto.RoutesDtos import StartRouteDtoResponse, FinishRouteDtoRequest, FinishRouteDtoResponse


def get_distance_from_api(
    route: Route, route_data: FinishRouteDtoRequest, api_key: str
) -> int | None:

    transportation_mode = GenericTransportationType.from_specific_type(
        route.transportation_type
    )

    match transportation_mode:
        case GenericTransportationType.BUS:
            travelMode = "TRANSIT"
            transitPreferences = {"allowedTravelModes": ["BUS"]}

        case GenericTransportationType.RAIL:
            travelMode = "TRANSIT"
            transitPreferences = {"allowedTravelModes": ["BUS"]}

        case _:
            travelMode = transportation_mode.value[0]
            transitPreferences = None

    headers = {
        "X-Goog-Api-Key": api_key,
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "routes.distanceMeters",
    }
    
    data = {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": route.start_latitude,
                    "longitude": route.start_longitude,
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": route_data.endLocation.latitude,
                    "longitude": route_data.endLocation.longitude,
                }
            }
        },
        "travelMode": travelMode,
    }

    if transitPreferences:
        data["transitPreferences"] = transitPreferences

    response = httpx.post(
        ROUTE_API_URL,
        headers=headers,
        json=data,
    )
    
    print(data)
    print(response.json())
    if response.is_error:
        return None

    return response.json()["routes"][0]["distanceMeters"]


def handle_end_route(
    route: Route, route_data: FinishRouteDtoRequest, session: SessionDep, api_key: str
) -> FinishRouteDtoResponse | None:
    distance = get_distance_from_api(route, route_data, api_key)
    if distance is None:
        return None

    route.active = False
    route.end_latitude = route_data.endLocation.latitude
    route.end_longitude = route_data.endLocation.longitude
    route.distance = distance
    
    session.add(route)
    session.commit()
    session.refresh(route)
    
    return FinishRouteDtoResponse(
        id=route.id,
        userId=route.user_id,
        startLocation=Location(
            latitude=route.start_latitude, longitude=route.start_longitude
        ),
        endLocation=Location(
            latitude=route.end_latitude, longitude=route.end_longitude
        ),
        active=route.active,
        distance=route.distance,
        transportationMode=route.transportation_type,
    )


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
