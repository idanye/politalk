# from linkedin_api import Linkedin
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from seleniumwire import webdriver as wiredriver
from urllib.parse import parse_qs, urlparse, unquote
from linkedin_functions import add_profile_to_database, is_profile_id_in_database
from itertools import islice
from uniLists import ivy_league_uni
import json
import requests
import re
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

        # print(f"clicked button 1")

        input_element = WebDriverWait(driver, 20).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, "input#fe_text.field__control.field__control--lg")))

        input_value_url = str(input_element.get_attribute("value"))
        return input_value_url

    except TimeoutException as te:
        print(f"Timeout error occurred: {te}")

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        driver.quit()


def get_search_text_from_url(profile_url):
    """Receives a profile_url and returns the string search text from it
    """
    # Use regular expression to find the search query part of the URL
    match = re.search(r'\?q=([^&]+)', profile_url)

    if match:
        search_query = unquote(match.group(1).replace('+', ' '))
        return search_query
    else:
        print("Search query not found in the URL.")


def get_new_connections(search_text, output_file="linkedin_urls_trialtwo.json"):
    """Recieves the search text and returns a set of the linkedin urls 
    from the search and saves it as a text file
    """
    #RapidApi
    url = "https://real-time-web-search.p.rapidapi.com/search"

    querystring = {"q":search_text, 
                    "limit":"300"}

    headers = {
        "X-RapidAPI-Key": "191e432bb6mshddc5b2894664670p1b5143jsn4e664d04e498",
        "X-RapidAPI-Host": "real-time-web-search.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    #
    if response.status_code == 200:
        # Parse the JSON content
        url_links = set()

        json_content = response.json()
        pos_responses = json_content.get("data", [])
        
        # Extract URLs from the "organic" results
        for position in pos_responses:
            url_links.add(position.get("url", ""))

        # Save the results to a JSON file
        with open(output_file, "w") as file:
            json.dump(list(url_links), file)
        
        return list(url_links)

    else:
        print(f"Error: {response.status_code}")

    # Zenserp
    # headers = {"apikey": "70eeee00-8dfa-11ee-b02d-f36f343cfa0b"}

    # params = (
    # ("q", search_text),
    # ("num","100"),
    # ("start","2"),
    # );

    # response = requests.get('https://app.zenserp.com/api/v2/search', headers=headers, params=params);
    
    # Check if the request was successful (status code 200)
    # if response.status_code == 200:
    #     # Parse the JSON content
    #     url_links = set()

    #     json_content = response.json()
    #     pos_responses = json_content.get("organic", [])
        
    #     # Extract URLs from the "organic" results
    #     for position in pos_responses:
    #         url_links.add(position.get("url", ""))

    #     # Save the results to a JSON file
    #     with open(output_file, "w") as file:
    #         json.dump(list(url_links), file)
        
    #     return list(url_links)

    # else:
    #     print(f"Error: {response.status_code}")


def get_linkedin_profile_info(json_linkedin_url_file_path):
    """Receives a JSON file with LinkedIn URLs from get_new_connections function and 
    returns a dictionary with profile IDs as keys and profile URLs as values.
    """
    with open(json_linkedin_url_file_path, "r") as json_file:
        linkedin_urls = json.load(json_file)

    # Extract LinkedIn IDs and create a dictionary
    linkedin_ids_dict = {}
    
    for url in linkedin_urls:
        profile_id = url.split("/")[-1]
        
        # Check if there are additional parameters in the URL
        if "?" in profile_id:
            # Remove additional parameters
            profile_id = profile_id.split("?")[0]
        
        linkedin_ids_dict[profile_id] = url

    return linkedin_ids_dict


def main():
    print("Preparing")

    # Testing out: 
    for ivy_uni in ivy_league_uni[:1]:
        # url = get_search_text_url(school_name=ivy_uni)
        # search_text = get_search_text_from_url(url)
        # # print(search_text)
        # result_list = get_new_connections(search_text)
        # print(result_list)
        user_info_dict = get_linkedin_profile_info('linkedin_urls_trialtwo.json')
        # user_info_dict = get_linkedin_profile_info('newdemojs.json')
        # print(user_info_dict)
        print("Starting run")
        
        for profile_id, profile_url in user_info_dict.items():
            if not is_profile_id_in_database(profile_id):
                print("****************************************")
                print(f"Adding user: {profile_id}")
                add_profile_to_database(profile_id, profile_url)
            else:
                print(f"User: *{profile_id}* already exists in our database")


    print('Finished Running')


if __name__ == "__main__":
    main()