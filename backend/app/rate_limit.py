import time
from collections import defaultdict
from threading import Lock

_window_s = 60.0
_max_hits = 30
_hits: dict[str, list[float]] = defaultdict(list)
_lock = Lock()


def allow_contact(ip: str) -> bool:
    now = time.time()
    with _lock:
        bucket = _hits[ip]
        bucket[:] = [stamp for stamp in bucket if now - stamp < _window_s]
        if len(bucket) >= _max_hits:
            return False
        bucket.append(now)
    return True