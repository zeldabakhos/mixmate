from pymongo import MongoClient
from .base_model import BaseModel
from app.utils.config import Config

class MongoModel(BaseModel):
    def __init__(self):
        self.client = MongoClient(Config.MONGO_URI)
        self.db = self.client.get_database()
        self.collection = self.db['items']
    
    def create(self, data):
        result = self.collection.insert_one(data)
        return str(result.inserted_id)
    
    def read(self, item_id=None):
        if item_id:
            return self.collection.find_one({"_id": item_id})
        return list(self.collection.find())
    
    def update(self, item_id, data):
        result = self.collection.update_one(
            {"_id": item_id},
            {"$set": data}
        )
        return result.modified_count > 0
    
    def delete(self, item_id):
        result = self.collection.delete_one({"_id": item_id})
        return result.deleted_count > 0