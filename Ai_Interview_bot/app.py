from flask import Flask, render_template, request, jsonify
from ollama import Client
import os
import re

app = Flask(__name__)

client = Client(
    host=os.getenv("OLLAMA_HOST", "http://localhost:11434")
)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json()

        # Check if required fields exist
        if not data or "subject" not in data or "num_questions" not in data:
            return jsonify({
                "error": "Wrong entry. Please provide subject and number of questions."
            }), 400

        subject = data["subject"].strip()
        num_questions = data["num_questions"]

        # Subject validation
        # Allows letters, spaces, dots, hyphens
        if not re.match(r"^[A-Za-z\s.-]+$", subject):
            return jsonify({
                "error": "Wrong entry. Subject should contain only letters."
            }), 400

        # Empty subject check
        if len(subject) == 0:
            return jsonify({
                "error": "Wrong entry. Subject cannot be empty."
            }), 400

        # Number validation
        try:
            num_questions = int(num_questions)

            if num_questions <= 0 or num_questions > 50:
                return jsonify({
                    "error": "Number of questions must be between 1 and 50."
                }), 400

        except ValueError:
            return jsonify({
                "error": "Number of questions must be an integer."
            }), 400

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

    except Exception as e:
        return jsonify({
            "error": f"Something went wrong: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(debug=True)