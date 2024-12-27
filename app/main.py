from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from app.api.routes import router
from app.api.signalr_handler import signalr_manager

app = FastAPI()

# Include API routes
app.include_router(router)

# WebSocket endpoint
@app.websocket("/ws/{session_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str):
    await signalr_manager.connect(websocket, session_id)
    try:
        while True:
            data = await websocket.receive_text()
            await signalr_manager.broadcast(session_id, data)
    except WebSocketDisconnect:
        signalr_manager.disconnect(websocket, session_id)