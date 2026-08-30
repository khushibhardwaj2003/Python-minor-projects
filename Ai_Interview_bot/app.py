from flask import Flask, render_template, request, jsonify
from ollama import Client

app = Flask(__name__)

client = Client(host="http://localhost:11434")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate():
 
    data = request.json

    subject = data["subject"]
    num_questions = int(data["num_questions"])

    prompt = f"""
    Generate EXACTLY {num_questions} interview questions
    with answers on the topic "{subject}".

    Rules:
    - Generate exactly {num_questions} questions.
    - Number them Q1, Q2, Q3...
    - Give a short answer after each question.
    - Do not stop before generating all questions.
    """

    response = client.chat(
        model="phi3:mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
        options={
            "num_predict": 2500
        }
    )

    return jsonify({
        "response": response["message"]["content"]
    })


if __name__ == "__main__":
    app.run(debug=True)