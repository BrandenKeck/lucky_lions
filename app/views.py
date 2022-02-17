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
    timeline = {
        "items": [
            {
                "name": "2022 Q1",
                "goals": [
                    {
                        "icon": "home",
                        "name": "Establish Website",
                        "content": "Create a landing site with all necessary information regarding the Lucky Lions project."
                    },
                    {
                        "icon": "twitter",
                        "name": "Launch Social Media",
                        "content": "Create social media compaigns to raise awareness of the project and begin to establish an open source community."
                    },
                    {
                        "icon": "wallet",
                        "name": "Community Incentives",
                        "content": "Begin to launch community incentives to decentralize the Lion Coin currency."
                    }
                ]
            },
            {
                "name": "2022 Q2",
                "goals": [
                    {
                        "icon": "mobile-alt",
                        "name": "Application Development",
                        "content": "Create a web application capable of user interaction and testing."
                    },
                    {
                        "icon": "file-contract",
                        "name": "Create Smart Contracts",
                        "content": "Complete development of initial dApp smart contracts required to run the lucky lions platform."
                    }
                ]
            },
            {
                "name": "2022 Q3",
                "goals": [
                    {
                        "icon": "code-branch",
                        "name": "V1.0 Release",
                        "content": "Launch the completed application for initial user interaction."
                    },
                    {
                        "icon": "code",
                        "name": "Launch Developer Incentives",
                        "content": "Create participation programs to further decentralization of the project and reward frequent contributers."
                    }
                ]
            },
            {
                "name": "2022 Q4",
                "goals": [
                    {
                        "icon": "paint-brush",
                        "name": "Lucky Lions NFT Contest",
                        "content": "Launch the promotional NFT contest and work on NFT creation for the platform."
                    },
                    {
                        "icon": "handshake",
                        "name": "Community Voting",
                        "content": "Launch governance program via Choice Coin partnership."
                    }
                ]
            }
        ]
    }
    return render_template('roadmap.html', tl=timeline)

# Route to application pages
@lions_bp.route('/app', methods=('GET',))
def app():
    data = "kathryn"
    return render_template('app.html', data=data)

# Route to application pages
@lions_bp.route('/info', methods=('GET',))
def info():
    return render_template('info.html')

# Route to application pages
@lions_bp.route('/wallet_connect', methods=['GET','POST'])
def wallet_connect():

    if request.method == "POST":
          print(request)

    return render_template('app.html', data="hello")
