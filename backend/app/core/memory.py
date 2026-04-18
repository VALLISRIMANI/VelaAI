from collections import defaultdict

_MEMORY_STORE = defaultdict(list)

def get_history(session_id: str):
    return _MEMORY_STORE[session_id]

def save_message(session_id: str, role: str, content: str):
    _MEMORY_STORE[session_id].append((role, content))