# Imports
import os
from pathlib import Path
from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy


# Database Setup
db = SQLAlchemy()
migrate = Migrate()


def create_app(test_config=None):

    # Init App
    app = Flask(__name__, instance_relative_config=True)

    # Setup the Database Instance Path
    BASEDIR = Path(app.instance_path)
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI=f"sqlite:///{str(BASEDIR / 'demo.sqlite')}",
        SQLALCHEMY_TRACK_MODIFICATIONS=False
    )

    # Test Config Option (Currently Unused)
    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    # Create Directories if Needed
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Establish Database Schema
    with app.app_context():

        db.init_app(app)
        # configure migrate to behave with sqlite3
        if db.engine.url.drivername == 'sqlite':
            migrate.init_app(app, db, render_as_batch=True)
        else:
            migrate.init_app(app, db)

        # Import database tables
        from app.models.datatables import Transaction

        #from app.utilities.build_purposes import purpose_cli
        #app.cli.add_command(purpose_cli)

    # Register Flask Blueprints
    from app.views import bp
    app.register_blueprint(bp)

    # SQL Alchemy Shell Commands Setup
    @app.shell_context_processor
    def make_shell_context():
        return {
            'app': app,
            'db': db,
            'Transaction': Transaction,
        }

    return app
