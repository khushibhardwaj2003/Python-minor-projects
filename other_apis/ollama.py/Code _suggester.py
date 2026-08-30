from ollama import Client

client = Client(host="http://localhost:11434")

MODEL = "qwen2.5-coder"

messages = []

print("=== Local Coding Assistant ===")
print("Type 'exit' to quit\n")

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        break

    messages.append(
        {
            "role": "user",
            "content": user_input
        }
    )

    response = client.chat(
        model=MODEL,
        messages=messages
    )

    assistant_reply = response["message"]["content"]

    print("\nAssistant:")
    print(assistant_reply)
    print()

    messages.append(
        {
            "role": "assistant",
            "content": assistant_reply
        }
    )