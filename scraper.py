from linkedin_api import Linkedin
import json
import functions
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time

URL = "https://recruitin.net/?country=www&job-title=&include-keywords=&exclude-keywords=Student+at+Harvard&education=all&company=&network=LinkedIn&savedSearchLabel=icon-linkedin-square%40blank+search+in+United+States&submit=true"
driver = webdriver.Chrome()
driver.get(URL)

time.sleep(30)
element = driver.find_element(By.CSS_SELECTOR, "span.select2-selection select2-selection--single")
# Perform the click action
time.sleep(30)
element.click()
time.sleep(30)
element = driver.find_element(By.CSS_SELECTOR, "input.select2-search__field").send_keys("United States")
time.sleep(30)
element = driver.find_element(By.CSS_SELECTOR, "a#resultButton.btn btn--block btn--primary").click()
time.sleep(30)

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

CURRENT_PATH = _file_.split("xbot.py")[0] #change string to the file name

self.options.add_argument("--user-data-dir=" + CURRENT_PATH + "cookies")

def login(self, headless: bool = False) -> bool:
        max_tries = 3
        current_try = 0
        login_successful = False

        if headless:
            self.options.add_argument('--headless=new')

        self.start() #Function that creates the driver == connection

        # fetches the login page
        self.open_page('https://twitter.com/')

        while not login_successful and current_try <= max_tries:
            login_successful = self.is_logged_in()
            current_try += 1
            # let cookies update
            time.sleep(2)

        self.quit() # driver.close()
        return login_successful # Check if you were able to connect

def is_logged_in(self) -> bool:
    xpath = "//a[@data-testid='SideNav_NewTweet_Button']" # catches the connection object

    try:
        WebDriverWait(self.bot, 30).until(ec.presence_of_all_elements_located((By.XPATH, xpath)))
        validation = True
    except Exception as e:
        logging.error("Exception occurred", exc_info=True)
        validation = False

    return validation


