from linkedin_api import Linkedin
import json

import functions

# Authenticate using any Linkedin account credentials
api = Linkedin('phillipslola837@gmail.com', 'Lola3a4a77&')
# GET a profile
profile = api.get_profile('idan-yehiel1')
# GET a profiles contact info
contact_info = api.get_profile_contact_info('idan-yehiel1')
# GET 1st degree connections of a given profile
connections = api.get_profile_connections('idan-yehiel1')

experience = profile.get("experience", [])

school_names = functions.get_education_names(profile)


