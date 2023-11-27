from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

options = webdriver.ChromeOptions()
options.add_argument("--headless")

class UserSession:
    def __init__(self):
        self.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options = options)
        self.cookies = None

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

    # Add other necessary methods like login, logout, etc.
