from typing import Annotated, Optional
from app.db.models import Route, User
from app.db.setup import SessionDep, create_db_and_tables
from app.dto.UserDtos import UserLoginDtoRequest
from fastapi import FastAPI, HTTPException, Query
from dotenv import load_dotenv
from sqlmodel import select
import os

from app.dto.RoutesDtos import StartRouteDtoRequest
from app.service.route_service import create_route

app = FastAPI()

load_dotenv()
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()
    

@app.get("/")
def routes() -> list[str]:
    return list(["Hello", "World"])

@app.post("/users/:id/routes")
def add_route(user_id: int, startRouteDto: StartRouteDtoRequest, session: SessionDep) -> None:
    if not session.exec(select(User).where(User.id == user_id)).first():
        raise HTTPException(status_code=404, detail="User not found")
    return create_route(
        user_id=user_id,
        latitude=startRouteDto.startLocation.latitude,
        longitude=startRouteDto.startLocation.longitude,
        transportationMode=startRouteDto.transportationMode,
        session=session
    )

@app.get("/routes")
def list_all_routes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Route]:
    routes = session.exec(select(Route).offset(offset).limit(limit)).all()
    return routes

@app.get("/users/{user_id}")
def get_user_by_id(
    session: SessionDep, 
    user_id: int,
    offset: int = 0,
) -> Optional[User]:
    user = session.exec(select(User).where(User.id == user_id).offset(offset)).first()
    return user 

@app.get("/users")
def list_all_users(
    session: SessionDep, 
    limit: Annotated[int, Query(le=100)] = 100,
    offset: int = 0,
) -> list[User]:
    
    return session.exec(select(User).offset(offset).limit(limit)).all()

@app.post("/users")
def add_user(user: User, session: SessionDep) -> None:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

@app.post("/login")
def login_user(
    session: SessionDep, 
    user_login: UserLoginDtoRequest,
    offset: int = 0,
):
    user = session.exec(select(User).where(User.user_name == user_login.user_name)).first()
    if user is None:
         raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/{id}/active_route")
def get_active_route(
    session: SessionDep, 
    user_id: int,
    offset: int = 0,
) -> Optional[Route]:
    user = session.exec(select(User).where(User.id == user_id).offset(offset)).first() 
    if user is None:
        raise HTTPException(status_code=400, detail="Bad request. User not found")
    active_route = session.exec(select(Route).where(Route.user_id == user_id).where(Route.active == True)).first()
    if active_route is None:
        raise HTTPException(status_code=404, detail="Route not found")
    return active_route 