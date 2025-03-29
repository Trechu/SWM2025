
from sqlmodel import select
from app.dto.LeaderboardDtos import LeaderboardListResponse, LeaderboardEntryResponse
from app.common.enums import Time
from app.db.setup import SessionDep
from datetime import datetime, timedelta
from app.db.models import Route, User
from sqlalchemy import func

def leaderboard(
    user_id: int,
    time: Time,
    session: SessionDep
) -> LeaderboardListResponse:
    # Define the date filter
    now = datetime.utcnow()
    if time == Time.TODAY:
        start_date = now.replace(hour=0, minute=0, second=0, microsecond=0)
    elif time == Time.WEEK:
        start_date = now - timedelta(days=7)
    elif time == Time.MONTH:
        start_date = now - timedelta(days=30)
    else:  # Time.ALL_TIME
        start_date = now - timedelta(weeks=9999)


    # print(select(Route, User.user_name).where(Route.date_time >= start_date).group_by(Route.user_id, Route.transportation_type))

    # Build the query
    query = session.query(
        User.user_name,
        User.id,
        Route.transportation_type,
        func.sum(Route.distance).label("total_distance")
    ).where(
        User.id == Route.user_id
    ).group_by(Route.user_id, Route.transportation_type).order_by(func.sum(Route.distance).desc())

    # Apply time filter if needed
    # if start_date:
    #     query = query.filter(Route.date_time >= start_date)

    results = query.all()
    
    leaderboard_entries = []
    users = dict()
    co2_map = dict()
    co2_total_distance_map = dict()
    co2_per_km_map = dict()

    for user_name, user_id, transportation_type, distance in results:
        users[user_name] = user_id
        co2_total_distance_map[user_name] = co2_total_distance_map.get(user_name, 0) + distance
        co2_map[user_name] = co2_map.get(user_name, 0) + distance * transportation_type.get_emissions()

    for user_name, emissions in co2_map.items():
        co2_per_km_map[user_name] = emissions / co2_total_distance_map[user_name]

    for pos, user_name in enumerate(co2_map.keys()):
        leaderboard_entries.append(
            LeaderboardEntryResponse(
                position = -1,
                id = users[user_name],
                username = user_name,
                distance = co2_total_distance_map[user_name],
                co2=co2_map[user_name],
                co2PerKilometer=co2_per_km_map[user_name]
            )
        )
    
    leaderboard_entries.sort(key=lambda entry: entry.co2PerKilometer)

    for pos, entry in enumerate(leaderboard_entries):
        entry.position = pos + 1

    return LeaderboardListResponse(leaderboard=leaderboard_entries)