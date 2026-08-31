from flask import Flask, render_template, request, jsonify
from ollama import Client

app = Flask(__name__)

client = Client(host="d75e1c954fda4258afa83154520f91d3.GUVWnfun0tztuJ4r0_ojXwwP")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():

    data = request.json

    subject = data["subject"]
    num_questions = data["num_questions"]

    prompt = f"""
    Generate EXACTLY {num_questions} interview questions
    with answers on {subject}.

    Format:

    Q.1 Question
    Ans. Answer
    """

    response = client.chat(
        model="phi3:mini",   # or llama3.2
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return jsonify({
        "response": response["message"]["content"]
    })

if __name__ == "__main__":
    app.run(debug=True)