import json
import datetime
from uniLists import ivy_league_uni


def is_ivy_student(profile):
    """
    Checks if the profile of the user is currently a student
    """
    is_curr_student = false
    education = profile.get("education", [])
    current_time = datetime.datetime.now()
    current_year = int(current_time.year)
    current_month = int(current_time.month)
    schoolName = get_last_schoolname(profile)

    if education != []:
        last_education = education[0]
        time_period = last_education["timePeriod"]
        end_date = time_period["endDate"]
        end_month = int(end_date.get("month", []))
        end_year = int(end_date.get("year", []))
        
        if end_year <= current_year and end_month <= current_month and schoolName in ivy_league_uni:
            is_curr_student = true

    return is_curr_student


def get_last_schoolname(profile):
    """Returns the School Name of the Last School in the Education"""

    education = profile.get("education", [])
    schoolName = ""

    if education != []:
        last_education = education[0]
        schoolName = last_education["school"]["schoolName"]

    return schoolName


def get_education_names(profile):
    """Get the Univesity School Names where the person studied"""

    education_schools = {} #{schoolName : type of degree}
    education = profile.get("education", [])

    if education != []:
        for item in education:
            school = item.get("school", [])
            schoolName = school.get("schoolName", [])
            degree_type = item.get("degreeName", [])
            education_schools[schoolName] = degree_type

    return list(education_schools.keys())


def is_prev_ivy_student(profile):
    """Checks if the person used to study at an ivy league university"""

    study_at_ivy = false
    education_schools_names = get_uni_names(profile)
    common_schools = set(get_uni_names) & set(ivy_league_uni)

    if common_schools:
        study_at_ivy = true

    return study_at_ivy

