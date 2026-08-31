from flask import Flask, render_template, request, jsonify
from ollama import Client
import os

app = Flask(__name__)

client = Client(
    host=os.getenv("3d945166dc8c464c8b10d88ef94f5355")
)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():

    data = request.get_json()

    subject = data["subject"]
    num_questions = data["num_questions"]

    prompt = f"""
Generate EXACTLY {num_questions} interview questions
with answers on {subject}.

Format:

Q.1 Question
Ans. Answer

Q.2 Question
Ans. Answer
"""

    response = client.chat(
        model="llama3.2",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return jsonify({
        "response": response["message"]["content"]
    })

if __name__ == "__main__":
    app.run(debug=True)