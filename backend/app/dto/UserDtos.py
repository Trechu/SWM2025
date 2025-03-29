from pydantic import BaseModel

class UserLoginDtoRequest(BaseModel):
    user_name: str
