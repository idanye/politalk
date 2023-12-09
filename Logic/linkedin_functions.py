# from linkedin_api import Linkedin
from uniLists import ivy_league_uni_expanded
import requests
import json
import datetime
import sqlite3

def is_ivy_student(profile):
    """
    Checks if the profile of the user is currently an ivy student
    """
    is_ivy_student = False
    is_curr_student = is_currently_student_new(profile) #with new function
    is_curr_researcher_student = is_currently_researcher_student(profile)
    schoolName = get_last_schoolname(profile)
    
    if (is_curr_student and is_ivy_school(schoolName)) or is_curr_researcher_student:
        is_ivy_student = True

    return is_ivy_student


def is_ivy_school(schoolName):
    """
    Checks if the school name of the user is an ivy league
    """
    for ivy_school in ivy_league_uni_expanded:
        if schoolName in ivy_school or schoolName == ivy_school:
            return True
        else:
            return False


def is_currently_student(profile):
    """
    Checks if the profile of the user is currently a student
    """
    is_curr_student = False
    education = profile.get("education", [])
    current_time = datetime.datetime.now()
    current_year = int(current_time.year)
    current_month = int(current_time.month)
    # schoolName = get_last_schoolname(profile)

    if education:
        last_education = education[0]
        time_period = last_education.get("timePeriod", {})
        
        if "endDate" in time_period:
            end_date = time_period["endDate"]
            end_month = end_date.get("month", None)
            end_year = end_date.get("year", None)

            if end_year is not None:
                end_year = int(end_year)

                if end_month is None:
                    if end_year >= current_year:
                        is_curr_student = True

                elif end_month is not None:
                    end_month = int(end_month)

                    if end_year > current_year or (end_year == current_year and end_month >= current_month):
                        is_curr_student = True

    return is_curr_student


def is_currently_student_new(profile):
    """
    Checks if the profile of the user is currently a student
    *For RapidApi
    """
    is_curr_student = False
    education = profile.get("educations", [])
    current_time = datetime.datetime.now()
    current_year = int(current_time.year)
    current_month = int(current_time.month)

    if education:
        last_education = education[0]
        
        if "end" in last_education:
            end_date = last_education["end"]
            end_month = end_date.get("month", None)
            end_year = end_date.get("year", None)

            if end_year is not None or end_year != 0:
                end_year = int(end_year)

                if end_month is None or end_month == 0:
                    if end_year >= current_year:
                        is_curr_student = True

                elif end_month is not None or end_month != 0:
                    end_month = int(end_month)

                    if end_year > current_year or (end_year == current_year and end_month >= current_month):
                        is_curr_student = True

    return is_curr_student


def is_currently_researcher_student(profile):
    """
    Checks if the profile of the user is currently a researcher student- meaning its written
    in their education
    *For RapidApi
    """
    is_curr_research_student = False
    is_curr_working = False
    position = profile.get("position", [])
    current_time = datetime.datetime.now()
    current_year = int(current_time.year)
    current_month = int(current_time.month)

    if position:
        last_position = position[0]
        companyName = get_companyname(last_position)
        title = get_position_title(last_position)
        
        if "end" in last_position:
            end_date = last_position["end"]
            end_month = end_date.get("month", None)
            end_year = end_date.get("year", None)

            if end_year is not None or end_year != 0:
                end_year = int(end_year)

                if end_month is None or end_month == 0:
                    if end_year >= current_year:
                        is_curr_working = True

                elif end_month is not None or end_month != 0:
                    end_month = int(end_month)

                    if end_year > current_year or (end_year == current_year and end_month >= current_month):
                        is_curr_working = True
            
            if end_year == 0:
                is_curr_working = True
        
        if is_ivy_school(companyName) and is_title_student(title) and is_curr_working:
            is_curr_research_student = True

    return is_curr_research_student


def get_last_schoolname(profile):
    """Returns the School Name of the Last School in the Education"""

    education = profile.get("education", [])
    schoolName = ""

    if education != []:
        last_education = education[0]

        try:
            schoolName = last_education["school"]["schoolName"]
        except KeyError:
            schoolName = last_education["schoolName"]

    return schoolName


def get_last_schoolname_new(profile):
    """Returns the School Name of the Last School in the Education
    *Relevant for RapidApi"""

    education = profile.get("educations", [])
    schoolName = ""

    if education != []:
        last_education = education[0]
        schoolName = last_education["schoolName"]

    return schoolName


def get_companyname(curr_position):
    """Returns the Company Name of the Last Company in the Positions
    *Relevant for RapidApi"""
    return curr_position["companyName"]


def get_position_title(curr_position):
    """Returns the position title of the position
    *Relevant for RapidApi"""
    return curr_position["title"]


def is_title_student(title):
    """Checks if the title matches a title of a student researcher/Phd student etc.
    *Relevant for RapidApi"""
    keywords_list = ["student researcher", "phd student", "researcher", "doctoral student", "student"]
    if any(keyword in title.lower() for keyword in keywords_list):
        return True
    else:
        return False


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

    study_at_ivy = False
    education_schools_names = get_uni_names(profile)
    common_schools = set(get_uni_names) & set(ivy_league_uni_expanded)

    if common_schools:
        study_at_ivy = True

    return study_at_ivy


def get_profile_first_name(profile):
    """Returns the first name of the profile user"""
    first_name = profile.get("firstName", "")
    return first_name


def get_profile_last_name(profile):
    """Returns the last name of the profile user"""
    last_name = profile.get("lastName", "")
    return last_name


# def get_profile_industry_name(profile):
#     """Returns the industry name of the profile user"""
#     industry_name = profile.get("industryName", "")
#     return industry_name


def get_profile_headline(profile):
    """Returns the industry name of the profile user"""
    headline = profile.get("headline", "")
    return headline


def get_binary_value(true_false_value):
    """Returns the binary value of the value"""
    return 1 if true_false_value else 0


def get_smallest_linkedin_photo_url(profile):
    """ Gets the smallest linkedin photo (100*100) of the given profile
    """
    smallest_img_url = ""
    display_pic_url = profile.get("displayPictureUrl", "")
    display_size = profile.get("img_100_100", "")
    smallest_img_url = display_pic_url + display_size
    return smallest_img_url


def get_linkedin_photo_url(profile):
    """ Gets the linkedin photo available (800*800) of the given profile
    *Only relevant for the RapidApi
    """
    return profile.get("profilePicture", "")

# cursor.execute('''
    #     CREATE TABLE UsersInfo (
    #     IndexID INTEGER PRIMARY KEY AUTOINCREMENT,
    #     ProfileID TEXT UNIQUE,
    #     FirstName TEXT,
    #     LastName TEXT,
    #     Education TEXT,
    #     IsCurrentlyStudent INTEGER,
    #     WhereCurrentlyStudent TEXT,
    #     IsIvyStudent INTEGER
    # );
    # ''')

def add_profile_to_database(profile_id, profile_url):
    """ Adds a given profile_id to the data base according to the requried columns values
    """
    # Connect to a database (or create a new one if it doesn't exist)
    connection = sqlite3.connect('usersinfo.db')
    cursor = connection.cursor()

    # GitHub API for Linkedin
    # api = Linkedin('phillipslola837@gmail.com', 'Lola3a4a77&')
    # # # GET a profile
    # profile = api.get_profile(profile_id)

    #Rapid API for Linkedin
    url = "https://linkedin-api8.p.rapidapi.com/"
    querystring = {"username":profile_id}
    headers = {
        "X-RapidAPI-Key": "191e432bb6mshddc5b2894664670p1b5143jsn4e664d04e498",
        "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com"
    }
    response = requests.get(url, headers=headers, params=querystring)
    profile = response.json()
    print("-------------------------------------------")
    # print(json.dumps(profile, indent=2))
    first_name = get_profile_first_name(profile)
    print(f"First name: {first_name}")
    last_name = get_profile_last_name(profile)
    print(f"Last name: {last_name}")
    where_curr_student = get_last_schoolname_new(profile)
    # print(f"Where is currently a student: {where_curr_student}")
    education = get_last_schoolname_new(profile)
    print(f"Education: {education}")
    is_curr_ivy_student = get_binary_value(is_ivy_student(profile))
    print(f"Is an ivy student now: {is_curr_ivy_student}")
    is_curr_student = get_binary_value(is_currently_student_new(profile))
    print(f"Is a student now: {is_curr_student}")
    pic_url = get_linkedin_photo_url(profile)
    # print(f"Picture url: {pic_url}")
    headline = get_profile_headline(profile)
    print(f"Headline: {headline}")

    if is_curr_ivy_student:
        current_user_data = (profile_id, first_name, last_name, education, is_curr_student, where_curr_student, is_curr_ivy_student, profile_url, pic_url, headline)
        
        try:
            cursor.execute("""
                INSERT INTO UsersInfo 
                (ProfileID, FirstName, LastName, Education, IsCurrentlyStudent,
                WhereCurrentlyStudent, IsIvyStudent, ProfileURL, PictureURL, Headline)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                current_user_data)
            print(f"Printing: {current_user_data}")
            connection.commit()

        except sqlite3.IntegrityError:
            # Handle the case where the unique constraint is violated (ProfileID already exists)
            print(f"ProfileID '{profile_id}' already exists. Skipping insertion.")
            connection.rollback()
    else:
        print(f"------ProfileID '{profile_id}' isn't a current ivy student. Skipping insertion.")

    cursor.close()
    connection.close()

# print(json.dumps(contact_info, indent=2))

def is_profile_id_in_database(profile_id):
    try:
        # Connect to the SQLite database
        connection = sqlite3.connect('usersinfo.db')
        cursor = connection.cursor()

        # Execute a SELECT query to check if the profile_id is in the database
        cursor.execute("SELECT ProfileID FROM UsersInfo WHERE ProfileID = ?", (profile_id,))
        result = cursor.fetchone()  # Fetch the first result

        # If result is not None, the profile_id is in the database
        if result is None:
            return False
        else:
            return True

    except sqlite3.Error as e:
        print(f"SQLite error: {e}")

    finally:
        cursor.close()
        connection.close()


def generate_war_discussion_message(sender_firstname, recipient_firstname, recipient_studytile, recipient_schoolname):
    """Generates a message for a student to initiate a discussion about the war in Israel."""
    message = f"Hi {recipient_firstname},\n\n"
    message += f"I hope this message finds you well. My name is {sender_firstname}, and I'm a {recipient_studytile} at {recipient_schoolname} interested in discussing current events, particularly the situation in Israel."
    message += "\n\nI understand that this is a sensitive and complex topic, and I want to approach it with respect and empathy. If you're comfortable, I'd appreciate the opportunity to share perspectives and thoughts on the matter."
    message += "\n\nOf course, if you prefer not to engage in such discussions or if now is not the right time, I completely understand. Feel free to let me know your comfort level, and I respect your boundaries."
    message += "\n\nThank you for considering this, and I'm here if you'd like to chat about it or any other topic regarding this matter as well."
    
    return message


# add_profile_to_database("luming-jason-chen-96763619b", "")