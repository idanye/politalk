import json
import datetime

def is_student(profile):
    """
    Checks if the profile of the user is currently a student
    """
    is_curr_student = false
    education = profile.get("education", [])
    current_time = datetime.datetime.now()
    current_year = int(current_time.year)
    current_month = int(current_time.month)

    if education != {}:
        is_curr_student = true
        last_education = education[0]
        time_period = last_education.get("timePeriod", [])
        end_date = time_period.get("endDate", [])
        end_month = int(end_date.get("month", []))
        end_year = int(end_date.get("year", []))
        
        if end_year <= current_year and end_month <= current_month:
            is_curr_student = true

    # last_education_schoolName = last_education.get("schoolName", [])
    return is_curr_student

def get_last_schoolname(profile):
    return

def has_education (profile):
    return
