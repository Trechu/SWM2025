from typing import Annotated, Optional
from app.db.models import Route, User
from app.db.setup import SessionDep, create_db_and_tables
from fastapi import FastAPI, Query, HTTPException, status
from sqlmodel import select
from app.dto.RoutesDtos import FinishRouteDtoRequest
from app.service.route_service import handle_end_route
from dotenv import load_dotenv
import os
    
app = FastAPI()

load_dotenv()
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()
    

@app.get("/")
def routes() -> list[str]:
    return list(["Hello", "World"])

@app.post("/routes")
def add_route(route: Route, session: SessionDep) -> None:
    session.add(route)
    session.commit()
    session.refresh(route)
    return route

@app.get("/routes")
def list_all_routes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Route]:
    routes = session.exec(select(Route).offset(offset).limit(limit)).all()
    return routes

@app.put("/users/{user_id}/routes/{route_id}")
def end_route(user_id: int, route_id: int, request: FinishRouteDtoRequest, session: SessionDep):
    user = session.exec(select(User).where(User.id == user_id)).first()
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="user not found")
    
    route = session.exec(select(Route).where(Route.id == route_id and Route.user_id == user_id)).first()
    if route is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="route not found")
    
    response = handle_end_route(route, request, session, GOOGLE_MAPS_API_KEY)
    if response is None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return response
    
    

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