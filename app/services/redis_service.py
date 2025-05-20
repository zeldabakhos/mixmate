from app.models.redis_model import RedisModel
from app.services.base_service import BaseService

class RedisService(BaseService):
    def __init__(self):
        self.model = RedisModel()
    
    def create_item(self, data):
        return self.model.create(data)
    
    def get_item(self, item_id):
        return self.model.read(item_id)
    
    def get_all_items(self):
        return self.model.read()
    
    def update_item(self, item_id, data):
        return self.model.update(item_id, data)
    
    def delete_item(self, item_id):
        return self.model.delete(item_id)