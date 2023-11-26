from linkedin_api import Linkedin
import json
import functions
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup

URL = "https://www.linkedin.com/in/idan-yehiel1/"
driver = webdriver.Chrome()
driver.get(URL)

element = driver.find_element(By.CSS_SELECTOR, "span.link-without-visited-state")
# Perform the click action
element.click()

print(element)

# Close the browser window
driver.quit()


# # Authenticate using any Linkedin account credentials
# api = Linkedin('phillipslola837@gmail.com', 'Lola3a4a77&')
# # GET a profile
# profile = api.get_profile('idan-yehiel1')
# # GET a profiles contact info
# contact_info = api.get_profile_contact_info('idan-yehiel1')
# # GET 1st degree connections of a given profile
# connections = api.get_profile_connections('idan-yehiel1')

# experience = profile.get("experience", [])

# school_names = functions.get_education_names(profile)


# print(json.dumps(profile, indent=2))


