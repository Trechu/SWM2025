from typing import Annotated, Optional
from db.models import Route, User
from db.setup import SessionDep, create_db_and_tables
from fastapi import FastAPI, Query
from dotenv import load_dotenv
from sqlmodel import select
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

@app.get("/user/{user_id}")
def get_user_by_id(
    session: SessionDep, 
    user_id: int,
    offset: int = 0,
) -> Optional[User]:
    user = session.exec(select(User).where(User.id == user_id).offset(offset)).first()
    return user 

@app.get("/user")
def list_all_users(
    session: SessionDep, 
    limit: Annotated[int, Query(le=100)] = 100,
    offset: int = 0,
) -> list[User]:
    
    return session.exec(select(User).offset(offset).limit(limit)).all()

@app.post("/user")
def add_user(user: User, session: SessionDep) -> None:
    session.add(user)
    session.commit()
    session.refresh(user)
    return user