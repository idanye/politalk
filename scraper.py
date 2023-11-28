from linkedin_api import Linkedin
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from seleniumwire import webdriver as wiredriver
from urllib.parse import parse_qs, urlparse
import json
import functions
import requests
import time

def get_search_text_url(school_name):
    """ Returns a str of the search text url from the recruitin website from a chosen university
    """
    URL = "https://recruitin.net/"
    options = webdriver.FirefoxOptions()
    options.add_argument('--disable-gpu')
    options.add_argument('--disable-sync')
    options.add_argument('--headless')
    options.add_argument('--ignore-certificate-errors')
    options.set_preference('devtools.console.stdout.content', True)

    # Set up Selenium WebDriver with proxy
    driver = webdriver.Firefox(options=options)
    driver.get(URL)

    try:
        include_keywords_element = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "input#include-keywords.field__control.field__control--input")))
        include_keywords_element.clear()

        include_keywords_element.send_keys("Student at " + school_name)

        print(f"searched student at: {school_name}")

        find_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button#fly-baby.btn.btn--block.btn--primary")))
        find_button.click()

        print(f"clicked button 1")

        input_element = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "input#fe_text.field__control.field__control--lg")))

        input_value_url = input_element.get_attribute("value")

    except TimeoutException as te:
        print(f"Timeout error occurred: {te}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        driver.quit()
        print(input_value_url)


def extract_search_text_from_url(url):
    """Recieves a url and returns the string search text from it
    """
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)

    # Extract the 'q' parameter, which contains the search text
    search_text = query_params.get('q', [''])[0]

    return search_text


def get_new_connections(search_text, output_file="linkedin_urls_trialtwo.json"):
    """Recieves the search text and returns a set of the linkedin urls from the search and saves it as a text file
    """
    headers = {"apikey": "70eeee00-8dfa-11ee-b02d-f36f343cfa0b"}

    params = (
    ("q", search_text),
    ("num","100"),
    ("start","2"),
    );

    response = requests.get('https://app.zenserp.com/api/v2/search', headers=headers, params=params);

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON content
        url_links = set()

        json_content = response.json()
        pos_responses = json_content.get("organic", [])
        
        # Extract URLs from the "organic" results
        for position in pos_responses:
            url_links.add(position.get("url", ""))

        # Save the results to a JSON file
        with open(output_file, "w") as file:
            json.dump(list(url_links), file)
        
        return list(url_links)

    else:
        print(f"Error: {response.status_code}")


# Example URL
# url = "https://www.google.com/search?q=+%22Student+at+Harvard%22%20OR%20%22Student+at+Stanford%22%20OR%20%22Student+at+Princeton%22%20OR%20%22Student+at+Colombia%22%20-intitle:%22profiles%22%20-inurl:%22dir/+%22+site:linkedin.com/in/+OR+site:linkedin.com/pub/"

# search_text = extract_search_text_from_url(url)
# result_list = get_new_connections(search_text)

# print(result_list)

get_search_text(school_name="Harvard")


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

