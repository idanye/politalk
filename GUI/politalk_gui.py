import tkinter as tk
from tkinter import ttk
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By

from UserSession import UserSession

def login_to_linkedin(username, password):
    # Setup Chrome WebDriver
    user_session.driver.get("https://www.linkedin.com/login")

    # Locate email and password fields and submit button
    user_session.driver.implicitly_wait(2)
    email_field = user_session.driver.find_element(By.CSS_SELECTOR, value="input#username")
    password_field = user_session.driver.find_element(By.CSS_SELECTOR, value="input#password")
    login_button = user_session.driver.find_element(By.CSS_SELECTOR, value=".from__button--floating")

    # Input credentials and submit
    email_field.send_keys(username)
    password_field.send_keys(password)
    login_button.click()

def on_login_button_clicked():
    # Get the entered credentials
    username = entry_username.get()
    password = entry_password.get()
    # Initiate login process
    login_to_linkedin(username, password)

#def login_with_google(email, password):

# Run application
root = tk.Tk()
root.title("LinkedIn Login")

# Create a UserSession object to handle the login process
user_session = UserSession()

# Center the window
root.geometry("400x300+{}+{}".format(root.winfo_screenwidth()//2 - 150, root.winfo_screenheight()//2 - 100))

# Layout
frame = ttk.Frame(root, padding="30")
frame.pack(fill=tk.BOTH, expand=True)

label_username = ttk.Label(frame, text="Username:")
label_username.pack()
entry_username = ttk.Entry(frame)
entry_username.pack()

label_password = ttk.Label(frame, text="Password:")
label_password.pack()
entry_password = ttk.Entry(frame, show="*")
entry_password.pack()


login_button = ttk.Button(frame, text="Login", command=on_login_button_clicked)
login_button.pack()

"""# Add this in your Tkinter setup where you define the layout
google_login_button = ttk.Button(frame, text="Login with Google", command=lambda: login_with_google(entry_username.get(), entry_password.get()))
google_login_button.pack()"""
login_button.pack(pady=(7, 20))

root.mainloop()



