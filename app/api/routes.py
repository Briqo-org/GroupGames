from fastapi import APIRouter, HTTPException
from app.api.game_logic import GameSessionManager

router = APIRouter()

session_manager = GameSessionManager()

@router.post("/start-session")
async def start_session(host_name: str):
    session_id = session_manager.create_session(host_name)
    return {"session_id": session_id}

@router.post("/join-session")
async def join_session(session_id: str, player_name: str):
    if not session_manager.session_exists(session_id):
        raise HTTPException(status_code=404, detail="Session not found")
    if not session_manager.add_player(session_id, player_name):
        raise HTTPException(status_code=400, detail="Player name already exists")
    return {"message": "Joined successfully"}

@router.post("/start-game")
async def start_game(session_id: str):
    if not session_manager.start_game(session_id):
        raise HTTPException(status_code=400, detail="Game already started or session not found")
    return {"message": "Game started"}