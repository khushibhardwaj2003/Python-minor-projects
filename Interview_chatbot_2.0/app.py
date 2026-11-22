from flask import Flask, render_template, request, jsonify
import ollama
import os
from dotenv import load_dotenv
from pypdf import PdfReader
from valid_topics import VALID_TOPICS

load_dotenv()

app = Flask(__name__)

MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")
OLLAMA_HOST = os.getenv(
    "OLLAMA_HOST",
    "http://localhost:11434"
)

client = ollama.Client(host=OLLAMA_HOST)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# AI HELPER
# =========================================================

def ask_ai(prompt):

    response = client.chat(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response["message"]["content"].strip()


# =========================================================
# PDF READER
# =========================================================

def extract_pdf_text(file):

    reader = PdfReader(file)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text + "\n"

    return text.strip()


# =========================================================
# NORMAL INTERVIEW QUESTION
# =========================================================

@app.route("/generate_question", methods=["POST"])
def generate_question():

    try:

        data = request.get_json()

        interview_type = data.get(
            "interview_type",
            "technical"
        )

        topic = data.get(
            "topic",
            ""
        ).strip().lower()

        difficulty = data.get(
            "difficulty",
            "Intermediate"
        )

        previous_questions = data.get(
            "previous_questions",
            []
        )

        expression = data.get(
            "expression",
            "neutral"
        )


        if not topic:

            return jsonify({
                "success": False,
                "error": "Please select a topic."
            }), 400


        if topic not in VALID_TOPICS:

            return jsonify({
                "success": False,
                "error": "Please select a valid topic."
            }), 400


        previous = "\n".join(
            previous_questions
        )


        # -------------------------------------------------
        # EXPRESSION INSTRUCTION
        # -------------------------------------------------

        expression_instruction = ""

        if expression == "happy":

            expression_instruction = """
The candidate appears comfortable and positive.
You may slightly increase the difficulty.
Ask a question that encourages deeper thinking.
"""

        elif expression == "sad":

            expression_instruction = """
The candidate appears less positive or uncomfortable.
Keep the question clear and supportive.
Do not make the question unnecessarily difficult.
"""

        elif expression == "angry":

            expression_instruction = """
The candidate appears tense.
Ask a calm and straightforward question.
"""

        elif expression == "fearful":

            expression_instruction = """
The candidate appears nervous.
Ask a clear and approachable question.
Do not overwhelm the candidate.
"""

        elif expression == "surprised":

            expression_instruction = """
The candidate appears surprised.
Ask a practical question that allows them
to demonstrate their understanding.
"""

        elif expression == "disgusted":

            expression_instruction = """
The candidate appears uncomfortable.
Use a neutral and professional question.
"""

        else:

            expression_instruction = """
The candidate appears neutral.
Continue the interview normally.
"""


        if interview_type == "hr":

            prompt = f"""
You are conducting a realistic HR interview.

Topic:
{topic}

Difficulty:
{difficulty}

Candidate facial expression:
{expression}

Previous questions:
{previous}

{expression_instruction}

Ask ONE new HR interview question.

The question must be different from previous
questions.

Focus on realistic areas such as:

- communication
- teamwork
- leadership
- conflict
- strengths
- weaknesses
- decision making
- workplace behaviour
- adaptability

Return ONLY the question.
"""

        else:

            prompt = f"""
You are conducting a realistic technical interview.

Technical topic:
{topic}

Difficulty:
{difficulty}

Candidate facial expression:
{expression}

Previous questions:
{previous}

{expression_instruction}

Ask ONE new technical interview question.

The question must:

- be directly related to {topic}
- be appropriate for {difficulty}
- not repeat previous questions
- test actual understanding
- sound like a real interviewer

Return ONLY the question.
"""


        question = ask_ai(prompt)


        return jsonify({
            "success": True,
            "question": question
        })


    except Exception as e:

        print("GENERATE QUESTION ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# NORMAL INTERVIEW EVALUATION
# =========================================================

@app.route("/evaluate", methods=["POST"])
def evaluate():

    try:

        data = request.get_json()

        question = data.get(
            "question",
            ""
        )

        answer = data.get(
            "answer",
            ""
        )

        topic = data.get(
            "topic",
            ""
        )

        interview_type = data.get(
            "interview_type",
            "technical"
        )


        if not question or not answer:

            return jsonify({
                "success": False,
                "error": "Question or answer missing."
            }), 400


        prompt = f"""
You are an expert interview evaluator.

Interview type:
{interview_type}

Topic:
{topic}

Question:
{question}

Candidate's EXACT answer:
{answer}

Evaluate ONLY the candidate's answer above.

Do not give generic feedback.

Give realistic scores from 0 to 10.

Return EXACTLY this format:

TECHNICAL_SCORE: number

COMMUNICATION_SCORE: number

CONFIDENCE_SCORE: number

OVERALL_SCORE: number

STRENGTHS:
specific strengths of this exact answer

IMPROVEMENTS:
specific improvements for this exact answer

EXPLANATION:
explain whether the answer is correct,
relevant and complete

BETTER_ANSWER:
give a stronger answer to this exact question
"""


        result = ask_ai(prompt)


        return jsonify({
            "success": True,
            "evaluation": result
        })


    except Exception as e:

        print("EVALUATION ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# RESUME INTERVIEW START
# =========================================================

@app.route("/resume_interview/start", methods=["POST"])
def start_resume_interview():

    try:

        file = request.files.get("resume")


        if not file:

            return jsonify({
                "success": False,
                "error": "Please upload your resume."
            }), 400


        resume_text = extract_pdf_text(file)


        if not resume_text:

            return jsonify({
                "success": False,
                "error":
                    "Could not read this PDF."
            }), 400


        prompt = f"""
You are a professional interviewer.

Interview the candidate based ONLY on
their resume.

Resume:

-------------------------
{resume_text}
-------------------------

Ask the FIRST interview question.

The question must be based on information
actually present in the resume.

Focus on:

- projects
- internships
- skills
- education
- experience
- achievements

Do not invent information.

Return ONLY the question.
"""


        question = ask_ai(prompt)


        return jsonify({
            "success": True,
            "question": question,
            "resume_text": resume_text
        })


    except Exception as e:

        print("RESUME START ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# RESUME NEXT QUESTION
# =========================================================

@app.route("/resume_interview/question", methods=["POST"])
def resume_interview_question():

    try:

        data = request.get_json()

        resume_text = data.get(
            "resume_text",
            ""
        )

        previous_questions = data.get(
            "previous_questions",
            []
        )


        previous = "\n".join(
            previous_questions
        )


        prompt = f"""
You are conducting a professional interview
based on the candidate's resume.

Resume:

-------------------------
{resume_text}
-------------------------

Previous questions:

{previous}

Ask ONE new question.

The question must:

- be based on the actual resume
- not repeat previous questions
- test the candidate's actual experience
- sound like a real interviewer

Return ONLY the question.
"""


        question = ask_ai(prompt)


        return jsonify({
            "success": True,
            "question": question
        })


    except Exception as e:

        print("RESUME QUESTION ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# RESUME EVALUATION
# =========================================================

@app.route("/resume_interview/evaluate", methods=["POST"])
def evaluate_resume_interview():

    try:

        data = request.get_json()

        question = data.get(
            "question",
            ""
        )

        answer = data.get(
            "answer",
            ""
        )

        resume_text = data.get(
            "resume_text",
            ""
        )


        prompt = f"""
You are evaluating a real resume-based
interview answer.

Candidate resume:

{resume_text}

Question:

{question}

Candidate's EXACT answer:

{answer}

Evaluate ONLY this answer.

Do not provide generic feedback.

Return:

TECHNICAL_SCORE: number

COMMUNICATION_SCORE: number

CONFIDENCE_SCORE: number

OVERALL_SCORE: number

STRENGTHS:
specific strengths

IMPROVEMENTS:
specific weaknesses

EXPLANATION:
specific explanation

BETTER_ANSWER:
a stronger answer to this question
"""


        result = ask_ai(prompt)


        return jsonify({
            "success": True,
            "evaluation": result
        })


    except Exception as e:

        print("RESUME EVALUATION ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# ATS ANALYSIS
# =========================================================

@app.route("/analyze_resume", methods=["POST"])
def analyze_resume():

    try:

        file = request.files.get("resume")


        if not file:

            return jsonify({
                "success": False,
                "error": "Please upload a PDF resume."
            }), 400


        resume_text = extract_pdf_text(file)


        if not resume_text:

            return jsonify({
                "success": False,
                "error":
                    "Could not read text from this PDF."
            }), 400


        prompt = f"""
You are an ATS resume analyzer.

Analyze this resume:

{resume_text}

Return:

ATS_SCORE: number

JOB_READINESS: number

KEYWORDS_SCORE: number

FORMATTING_SCORE: number

SKILLS_SCORE: number

STRENGTHS:
strong points

WEAKNESSES:
problems

MISSING_KEYWORDS:
missing useful keywords

ATS_PROBLEMS:
possible ATS problems

IMPROVEMENTS:
specific improvements

FINAL_RECOMMENDATION:
overall recommendation
"""


        result = ask_ai(prompt)


        return jsonify({
            "success": True,
            "result": result
        })


    except Exception as e:

        print("ATS ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# GROUP DISCUSSION
# =========================================================

@app.route("/group_discussion", methods=["POST"])
def group_discussion():

    try:

        data = request.get_json()

        topic = data.get(
            "topic",
            ""
        ).strip()

        conversation = data.get(
            "conversation",
            []
        )


        if not topic:

            return jsonify({
                "success": False,
                "error":
                    "Please select a GD topic."
            }), 400


        previous = "\n".join(
            conversation
        )


        prompt = f"""
You are running a realistic Group Discussion.

Discussion Topic:
{topic}

Participants:

AI PARTICIPANT 1:
Technology-oriented student.

AI PARTICIPANT 2:
Critical thinker.

AI PARTICIPANT 3:
Business-oriented participant.

AI PARTICIPANT 4:
Balanced participant.

Previous discussion:

{previous}

Continue the group discussion.

Each participant should have a different
opinion.

Do not make everyone agree.

Participants should:

- agree sometimes
- disagree sometimes
- challenge ideas
- introduce new perspectives
- use examples

Return EXACTLY:

AI PARTICIPANT 1:
statement

AI PARTICIPANT 2:
statement

AI PARTICIPANT 3:
statement

AI PARTICIPANT 4:
statement

Each statement should be 2-4 sentences.
"""


        result = ask_ai(prompt)


        return jsonify({
            "success": True,
            "result": result
        })


    except Exception as e:

        print("GD ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":

    print()
    print("==========================================")
    print("       SAKSHATKAR AI INTERVIEWER")
    print("==========================================")
    print("Model :", MODEL)
    print("Ollama:", OLLAMA_HOST)
    print()
    print("Open http://127.0.0.1:5000")
    print("==========================================")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )