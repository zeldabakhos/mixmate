from flask import Blueprint, request, redirect, url_for, flash, render_template
from app.services.mongo_service import MongoService

bp = Blueprint('mongo', __name__, url_prefix='/mongo')
service = MongoService()

@bp.route('/')
def index():
    items = service.get_all_items()
    return render_template('mongo.html', items=items)

@bp.route('/create', methods=['POST'])
def create():
    data = {
        'name': request.form['name'],
        'description': request.form['description']
    }
    service.create_item(data)
    flash('Item created successfully!', 'success')
    return redirect(url_for('mongo.index'))

@bp.route('/update/<item_id>', methods=['POST'])
def update(item_id):
    data = {
        'name': request.form['name'],
        'description': request.form['description']
    }
    if service.update_item(item_id, data):
        flash('Item updated successfully!', 'success')
    else:
        flash('Item not found!', 'error')
    return redirect(url_for('mongo.index'))

@bp.route('/delete/<item_id>')
def delete(item_id):
    if service.delete_item(item_id):
        flash('Item deleted successfully!', 'success')
    else:
        flash('Item not found!', 'error')
    return redirect(url_for('mongo.index'))