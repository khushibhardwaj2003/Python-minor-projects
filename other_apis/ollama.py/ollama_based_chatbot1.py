import os
from ollama import Client, ResponseError

# Create Ollama client (local)
client = Client(
    host="host"
)

# Use the configured model, or the first model installed in Ollama.
try:
    installed_models = client.list().models
    installed_model_names = [model.model for model in installed_models]
except Exception as error:
    raise SystemExit(
        "Cannot connect to Ollama. Start Ollama and run this script again. "
        f"Details: {error}"
    ) from error

if not installed_model_names:
    raise SystemExit(
        "No Ollama models are installed. Run 'ollama pull llama3.2', "
        "then run this script again."
    )

MODEL = os.getenv("OLLAMA_MODEL", installed_model_names[0])
if MODEL not in installed_model_names:
    raise SystemExit(
        f"Model '{MODEL}' is not installed. Available models: "
        f"{', '.join(installed_model_names)}"
    )

# Store our conversation
messages = [
    {
        "role": "system",
        "content": "You are a helpful AI assistant."
    }
]

print("================================")
print("      Ollama Python Chatbot")
print("================================")
print("Type 'exit' to stop.\n")

while True:

    user_message = input("You: ")

    # Stop the program
    if user_message.lower() == "exit":
        print("Goodbye!")
        break

    # Add user's message
    messages.append({
        "role": "user",
        "content": user_message
    })

    # Ask Ollama
    try:
        response = client.chat(model=MODEL, messages=messages)
    except ResponseError as error:
        messages.pop()
        print(f"\nOllama error: {error.error}\n")
        continue

    # Get AI response
    ai_message = response["message"]["content"]

    # Add AI response to conversation
    messages.append({
        "role": "assistant",
        "content": ai_message
    })

    print("\nAI:", ai_message)
    print()