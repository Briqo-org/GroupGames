from fastapi import WebSocket

class SignalRManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, websocket: WebSocket, session_id: str):
        await websocket.accept()
        if session_id not in self.active_connections:
            self.active_connections[session_id] = []
        self.active_connections[session_id].append(websocket)

    def disconnect(self, websocket: WebSocket, session_id: str):
        if session_id in self.active_connections:
            self.active_connections[session_id].remove(websocket)

    async def broadcast(self, session_id: str, message: str):
        for connection in self.active_connections.get(session_id, []):
            await connection.send_text(message)

signalr_manager = SignalRManager()