# Imports
from app import db
from app.models.datatables import Transaction

#from app.utilities.build_sorted_risks import sort_risks
from flask import Blueprint, g, redirect, render_template, request, url_for, jsonify

'''
FRAMEWORK PAGES
'''

# Blueprint for the main application
lions_bp = Blueprint('lions', __name__)

# Framework Index Page
@lions_bp.route('/', methods=('GET',))
def home():

    # Get Database Objects
    #projects = Project.query.all()
    #projects_data = [project.to_json(True) for project in projects]

    # Render Page, Pass JSON Variables for Charting
    #return render_template('index.html', projects=projects_data)
    return render_template('index.html')

# Framework Roadmap page
@lions_bp.route('/roadmap', methods=('GET',))
def roadmap():
    return render_template('roadmap.html')

# Route to application pages
@lions_bp.route('/app', methods=('GET',))
def app():
    return render_template('app.html')
