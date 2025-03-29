from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def routes() -> list[str]:
    return list(["Hello", "World"])