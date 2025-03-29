from sqlmodel import Field, SQLModel, Relationship
from ..common.enums import SpecificTransportationType

class Route(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(index=True, foreign_key="user.id")
    start_longitude: float = Field(default=0, index=False)
    start_latitude: float = Field(default=0, index=False)
    end_longitude: float = Field(default=0, index=False)
    end_latitude: float = Field(default=0, index=False)
    active: bool = Field(default=True)
    distance: float = Field(default=0, index=False)
    transportation_type: SpecificTransportationType | None = Field(default= None,index=False) 



class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    user_name: str = Field(index=True)
    
    #user_friends: list["User"] = Relationship(back_populates="friends")  

'''
class UserFriendLink(SQLModel, table=True):
    user_id: int = Field(foreign_key="user.id", primary_key=True)
    friend_id: int = Field(foreign_key="user.id",  primary_key=True)
'''
    