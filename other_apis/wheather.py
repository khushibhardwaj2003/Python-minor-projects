import requests

# Step 1: Store your API key (replace with your own key)
API_KEY = "ab2c254d94894ebf56060e3c123c9dea"

# Step 2: Choose a city
city = str(input("Enter city name: ")).strip()

# Step 3: Create the API URL
url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

# Step 4: Send request to the API
response = requests.get(url)

# Step 5: Convert response to JSON (dictionary format)
data = response.json()

# Step 6: Extract useful information
temperature = data["main"]["temp"]
weather = data["weather"][0]["description"]

# Step 7: Print results
print(f"City: {city}")
print(f"Temperature: {temperature}°C")
print(f"Weather: {weather}")
