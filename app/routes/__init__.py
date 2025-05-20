# Export routes for easier imports
from .base_routes import bp as base_bp
from .mongo_routes import bp as mongo_bp
from .redis_routes import bp as redis_bp
from .neo4j_routes import bp as neo4j_bp

__all__ = ['base_bp', 'mongo_bp', 'redis_bp', 'neo4j_bp']