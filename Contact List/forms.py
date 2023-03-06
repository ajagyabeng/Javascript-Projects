from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email, Length, email_validator


class ContactForm(FlaskForm):
    """Creates input fields for the form"""
    name = StringField("Name", validators=[DataRequired(), Length(max=35)])
    phone = IntegerField("Phone", validators=[DataRequired()])
    email = EmailField("Email")
    submit = SubmitField("ADD CONTACT")
