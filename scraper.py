from linkedin_api import Linkedin
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import json
import functions
import requests
import time

def get_new_connections(school_name):
    """ Returns a list of ?new? linkedin links from the recruitin website from a chosen university
    """
    URL = "https://recruitin.net/"
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-extensions')

    driver = webdriver.Chrome(options=options)
    driver.get(URL)
    linkedin_links = []

    try:
        include_keywords_element = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input#include-keywords.field__control.field__control--input")))
        
        include_keywords_element.clear()

        # Send keys to the input field
        include_keywords_element.send_keys("Student at " + school_name)

        find_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button#fly-baby.btn.btn--block.btn--primary")))
        find_button.click()

        find_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a#resultButton.btn.btn--block.btn--primary")))
        find_button.click()

        WebDriverWait(driver, 20).until(
            EC.url_contains("google.com"))

        linkedin_links.append(-1)

        # Find all anchor tags with a 'href' attribute containing "linkedin.com"
        linkedin_links_element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, 'a[jsname="UWckNb"][href*="linkedin.com"]')))

        linkedin_links.append(-2)
        # Print the links
        for link in linkedin_links_element:
            linkedin_links.append(link.get_attribute("href"))

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        driver.quit()
        print(linkedin_links)

get_new_connections(school_name="Harvard")


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
 



 #From Nimrod
# CURRENT_PATH = _file_.split("xbot.py")[0] #change string to the file name

# self.options.add_argument("--user-data-dir=" + CURRENT_PATH + "cookies")

# def login(self, headless: bool = False) -> bool:
#         max_tries = 3
#         current_try = 0
#         login_successful = False

#         if headless:
#             self.options.add_argument('--headless=new')

#         self.start() #Function that creates the driver == connection

#         # fetches the login page
#         self.open_page('https://twitter.com/')

#         while not login_successful and current_try <= max_tries:
#             login_successful = self.is_logged_in()
#             current_try += 1
#             # let cookies update
#             time.sleep(2)

#         self.quit() # driver.close()
#         return login_successful # Check if you were able to connect

# def is_logged_in(self) -> bool:
#     xpath = "//a[@data-testid='SideNav_NewTweet_Button']" # catches the connection object

#     try:
#         WebDriverWait(self.bot, 30).until(ec.presence_of_all_elements_located((By.XPATH, xpath)))
#         validation = True
#     except Exception as e:
#         logging.error("Exception occurred", exc_info=True)
#         validation = False

#     return validation


