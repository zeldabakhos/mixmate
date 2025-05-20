from app.models.mongo_model import MongoModel
from app.services.base_service import BaseService

class MongoService(BaseService):
    def __init__(self):
        self.model = MongoModel()
    
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