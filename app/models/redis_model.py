import redis
import json
from .base_model import BaseModel
from app.utils.config import Config

class RedisModel(BaseModel):
    def __init__(self):
        self.redis = redis.from_url(Config.REDIS_URI)
    
    def create(self, data):
        item_id = data.get('id', 'default_id')
        self.redis.hmset(f"item:{item_id}", data)
        return item_id
    
    def read(self, item_id=None):
        if item_id:
            return self.redis.hgetall(f"item:{item_id}")
        keys = self.redis.keys("item:*")
        return [self.redis.hgetall(key) for key in keys]
    
    def update(self, item_id, data):
        if self.redis.exists(f"item:{item_id}"):
            self.redis.hmset(f"item:{item_id}", data)
            return True
        return False
    
    def delete(self, item_id):
        return self.redis.delete(f"item:{item_id}") > 0