from neo4j import GraphDatabase
from .base_model import BaseModel
from app.utils.config import Config

class Neo4jModel(BaseModel):
    def __init__(self):
        self.driver = GraphDatabase.driver(
            Config.NEO4J_URI,
            auth=(Config.NEO4J_USER, Config.NEO4J_PASSWORD))
            
    
    def create(self, data):
        with self.driver.session() as session:
            result = session.execute_write(
                self._create_node,
                data
            )
            return result
    
    def read(self, node_id=None):
        with self.driver.session() as session:
            if node_id:
                return session.execute_read(
                    self._get_node_by_id,
                    node_id
                )
            return session.execute_read(
                self._get_all_nodes
            )
    
    def update(self, node_id, data):
        with self.driver.session() as session:
            return session.execute_write(
                self._update_node,
                node_id,
                data
            )
    
    def delete(self, node_id):
        with self.driver.session() as session:
            return session.execute_write(
                self._delete_node,
                node_id
            )
    
    @staticmethod
    def _create_node(tx, data):
        query = (
            "CREATE (n:Item {name: $name, description: $description}) "
            "RETURN id(n) AS node_id"
        )
        result = tx.run(query, **data)
        return result.single()["node_id"]
    
    @staticmethod
    def _get_node_by_id(tx, node_id):
        query = (
            "MATCH (n:Item) "
            "WHERE id(n) = $node_id "
            "RETURN n"
        )
        result = tx.run(query, node_id=node_id)
        return result.single()[0]
    
    @staticmethod
    def _get_all_nodes(tx):
        query = "MATCH (n:Item) RETURN n"
        result = tx.run(query)
        return [record["n"] for record in result]
    
    @staticmethod
    def _update_node(tx, node_id, data):
        query = (
            "MATCH (n:Item) "
            "WHERE id(n) = $node_id "
            "SET n += $data "
            "RETURN count(n) > 0 AS updated"
        )
        result = tx.run(query, node_id=node_id, data=data)
        return result.single()["updated"]
    
    @staticmethod
    def _delete_node(tx, node_id):
        query = (
            "MATCH (n:Item) "
            "WHERE id(n) = $node_id "
            "DELETE n "
            "RETURN count(n) > 0 AS deleted"
        )
        result = tx.run(query, node_id=node_id)
        return result.single()["deleted"]