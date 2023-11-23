from linkedin_api import Linkedin
import json

# Authenticate using any Linkedin account credentials
api = Linkedin('phillipslola837@gmail.com', 'Lola3a4a77&')

# GET a profile
profile = api.get_profile('niv-doron-7188aa206')

# GET a profiles contact info
contact_info = api.get_profile_contact_info('idan-yehiel1')

# GET 1st degree connections of a given profile
connections = api.get_profile_connections('idan-yehiel1')

experience = profile.get("experience", [])

# Convert the dictionary to a JSON string
last_education_json = json.dumps(last_education, indent=2)  # 'indent' parameter adds indentation for readability

# Display the JSON string
print(last_education_json)
# print(contact_info)
# print(connections)