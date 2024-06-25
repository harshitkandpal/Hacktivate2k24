# import requests
# import re

# API_KEY= "AIzaSyBXKRkoP-pEhETZRfoy6iu0CxNR1WHIDvM"
# SEARCH_ENGINE_ID="608dc67a56fad4865"


# search_query=input("Enter the domain name:")
# url='https://www.googleapis.com/customsearch/v1'

# parameters={
#     'q': search_query,
#     'key': API_KEY,
#     'cx': SEARCH_ENGINE_ID,
# }

# response= requests.get(url, params=parameters)
# results= response.json()

# print(results)

# for item in results:
#     snippet
#     if 'snippet' in item:
#         snippet = item['snippet']

#     else:
#         print(f"Snippet key not found in item: {item}")
#     emails = re.findall(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}", snippet)
#     if emails:
#         print(f"Emails found in snippet: {emails}")

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time

def extract_emails_from_page(driver):
    try:
        # Wait for the page to load completely (adjust timeout as needed)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'body')))
        
        # Extract email addresses using regex
        page_source = driver.page_source
        emails = re.findall(r'[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', page_source)
        return emails
    except Exception as e:
        print(f"Error extracting emails: {str(e)}")
        return []

def extract_emails_from_url(url):
    try:
        options = webdriver.ChromeOptions()
        options.add_argument('--headless') 
        driver = webdriver.Chrome(options=options)
        
        driver.get(url)
        for _ in range(5):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
        
        emails = extract_emails_from_page(driver)
        
        driver.quit()
        
        return emails
    except Exception as e:
        print(f"Error extracting emails from {url}: {str(e)}")
        return []


url = 'https://www.google.com/search?q=%22Banglore%22+%22%40gmail.com%22&rlz=1C1RXQR_enIN1067IN1068&oq=%22Banglore%22+%22%40gmail.com%22&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCTE5ODc3ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8'  # Replace with your actual search URL
emails = extract_emails_from_url(url)
print(emails)











