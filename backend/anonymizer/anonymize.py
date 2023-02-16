import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

bp = Blueprint('anonymize', __name__, url_prefix='/anonymize')
