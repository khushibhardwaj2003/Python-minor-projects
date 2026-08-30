from flask import Flask, render_template, request, jsonify
from ollama import Client
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

print("BASE_DIR =", BASE_DIR)
print("Template folder =", app.template_folder)
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(
    __name__,
    template_folder=os.path.join(BASE_DIR, "templates"),
    static_folder=os.path.join(BASE_DIR, "static")
)

client = Client(host="http://localhost:11434")

# Sample campus data
gates = {
    "Arts Faculty": "Gate 4",
    "Library": "Gate 2",
    "IIC": "Gate 4",
    "Canteen": "Gate 1"
}

routes = {
    ("Gate 4", "Arts Faculty"):
        "Gate 4 → Main Road → Arts Faculty",

    ("Gate 2", "Library"):
        "Gate 2 → Central Path → Library",

    ("Gate 4", "IIC"):
        "Gate 4 → Left Corridor → IIC"
}


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/closest_gate", methods=["POST"])
def closest_gate():

    location = request.json["location"]

    gate = gates.get(location, "Not Found")

    return jsonify({
        "result": gate
    })


@app.route("/shortest_path", methods=["POST"])
def shortest_path():

    start = request.json["start"]
    end = request.json["end"]

    path = routes.get(
        (start, end),
        "Route not available"
    )

    return jsonify({
        "result": path
    })


@app.route("/chat", methods=["POST"])
def chat():

    question = request.json["question"]

    response = client.chat(
        model="phi3:mini",
        messages=[
            {
                "role": "system",
                "content":
                "You are a campus navigation assistant."
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    answer = response["message"]["content"]

    return jsonify({
        "result": answer
    })


if __name__ == "__main__":
    app.run(debug=True)