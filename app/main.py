from flask import Flask
from app.routes import base_routes, mongo_routes, redis_routes, neo4j_routes

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your_secret_key_here'
    
    # Register blueprints
    app.register_blueprint(base_routes.bp)
    app.register_blueprint(mongo_routes.bp)
    app.register_blueprint(redis_routes.bp)
    app.register_blueprint(neo4j_routes.bp)
    
    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)