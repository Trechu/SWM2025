from __future__ import annotations
from enum import Enum

class SpecificTransportationType(Enum):
    WALK = "WALK"
    BIKE = "BICYCLE"
    BUS = "BUS"
    TRAM = "TRAM"
    SUBWAY = "SUBWAY"
    COACH = "COACH"
    RAIL = "RAIL"
    DIESEL_CAR = "DIESEL_CAR"
    HYBRID_CAR = "HYBRID_CAR"
    ELECTRIC_CAR = "ELECTRIC_CAR"
    MOTORBIKE = "MOTORBIKE"

    def get_emissions(self):
        """
        Return emission multiplier for given transportation type.
        """
        _EMISSIONS[self]

"""
Emissions per transportation type in [g/km].
"""
_EMISSIONS = {
    SpecificTransportationType.WALK: 1,
    SpecificTransportationType.BIKE: 5,
    SpecificTransportationType.BUS: 96.5,
    SpecificTransportationType.COACH: 27.33,
    SpecificTransportationType.TRAM: 28.61,
    SpecificTransportationType.SUBWAY: 27.81,
    SpecificTransportationType.RAIL: 35.49,
    SpecificTransportationType.DIESEL_CAR: 170.82,
    SpecificTransportationType.HYBRID_CAR: 68.4,
    SpecificTransportationType.ELECTRIC_CAR: 47.09,
    SpecificTransportationType.MOTORBIKE: 113.55
}

class GenericTransportationType(Enum):
    """
    Transportation type used for sending requests to google maps API.
    """
    DRIVE = "DRIVE",
    BICYCLE = "BICYCLE",
    WALK = "WALK",
    BUS = "BUS"
    RAIL = "RAIL"

    @staticmethod
    def from_specific_type(specific: SpecificTransportationType) -> GenericTransportationType:
        return _GENERALIZATION[specific]
    

"""
Map generalizing transportation type.
"""
_GENERALIZATION = {
    SpecificTransportationType.WALK: GenericTransportationType.WALK,
    SpecificTransportationType.BIKE: GenericTransportationType.BICYCLE,
    SpecificTransportationType.BUS: GenericTransportationType.BUS,
    SpecificTransportationType.TRAM: GenericTransportationType.RAIL,
    SpecificTransportationType.SUBWAY: GenericTransportationType.RAIL,
    SpecificTransportationType.COACH: GenericTransportationType.DRIVE,
    SpecificTransportationType.RAIL: GenericTransportationType.RAIL,
    SpecificTransportationType.DIESEL_CAR: GenericTransportationType.DRIVE,
    SpecificTransportationType.HYBRID_CAR: GenericTransportationType.DRIVE,
    SpecificTransportationType.ELECTRIC_CAR: GenericTransportationType.DRIVE,
    SpecificTransportationType.MOTORBIKE: GenericTransportationType.DRIVE
}