from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
import time
import logging
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as ec

options = webdriver.ChromeOptions()
#options.add_argument("--headless=new")

class UserSession:
    def __init__(self):
        self.cookies = None

    def start(self):
        try:
            self.driver = webdriver.Chrome(options = options)
        except:
            self.driver = webdriver.Chrome(ChromeDriverManager().install(), options = options)

    def quit(self):
        self.driver.quit()

    def save_cookies(self):
        self.cookies = self.driver.get_cookies()

    def load_cookies(self):
        if self.cookies:
            for cookie in self.cookies:
                self.driver.add_cookie(cookie)

    def hide_chrome_driver(self):
        self.driver.minimize_window()

    def show_chrome_driver(self):
        self.driver.maximize_window()

    def login(self, headless: bool = False) -> bool:
        max_tries = 3
        current_try = 0
        login_successful = False

        if headless:
            self.options.add_argument('--headless=new')

        self.start()

        # fetches the login page
        self.driver.get('https://www.linkedin.com/login')

        while not login_successful and current_try <= max_tries:
            login_successful = self.is_logged_in()
            current_try += 1
            # let cookies update
            time.sleep(2)

        self.quit()
        return login_successful

    def is_logged_in(self) -> bool: # GETS STUCK HERE. NEED TO FIX. 
        xpath = "/html/body/div[5]/header/div/a/div/div/li-icon/svg"

        try:
            WebDriverWait(self.driver, 30).until(ec.presence_of_all_elements_located((By.XPATH, xpath)))
            validation = True
        except Exception as e:
            logging.error("Exception occurred", exc_info=True)
            validation = False

        return validation
