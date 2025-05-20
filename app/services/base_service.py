from abc import ABC, abstractmethod

class BaseService(ABC):
    @abstractmethod
    def create_item(self, data):
        pass
    
    @abstractmethod
    def get_item(self, item_id):
        pass
    
    @abstractmethod
    def get_all_items(self):
        pass
    
    @abstractmethod
    def update_item(self, item_id, data):
        pass
    
    @abstractmethod
    def delete_item(self, item_id):
        pass