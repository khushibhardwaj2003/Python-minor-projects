/* =====================================================
   SAKSHATKAR AI INTERVIEWER
   SINGLE CLEAN JAVASCRIPT FILE

   IMPORTANT:
   Do not keep another copy of these variables/functions.
===================================================== */


/* =====================================================
   GLOBAL STATE
===================================================== */

let normalInterview = {

    type: "technical",

    topic: "",

    difficulty: "Intermediate",

    totalQuestions: 5,

    currentQuestion: 1,

    question: "",

    previousQuestions: [],

    scores: [],

    expression: "neutral",

    cameraStream: null

};


let resumeInterview = {

    resumeText: "",

    totalQuestions: 5,

    currentQuestion: 1,

    question: "",

    previousQuestions: [],

    scores: []

};


/* =====================================================
   GROUP DISCUSSION STATE

   THESE ARE DECLARED ONLY ONCE.
===================================================== */

let gdConversation = [];

let currentGDTopic = "";

const GD_TOPICS = [

    "Artificial Intelligence: Boon or Bane",

    "Impact of Social Media on Students",

    "Work From Home vs Office",

    "Is AI Going to Replace Jobs?",

    "Online Education vs Offline Education",

    "Climate Change and Responsibility",

    "Is Technology Making Us Lazy?",

    "Startups vs Traditional Jobs",

    "Should College Education Be Mandatory?",

    "Importance of Soft Skills",

    "Cashless Economy",

    "Electric Vehicles: Future of Transport",

    "Cybersecurity and Privacy",

    "Should Students Use Generative AI?",

    "Is Competition Good for Students?",

    "Social Media Influencers",

    "Four Day Work Week",

    "Entrepreneurship vs Employment",

    "Technology in Rural Development",

    "Sustainable Development"

];


/* =====================================================
   FACE API STATE
===================================================== */

let faceModelsLoaded = false;

let faceDetectionInterval = null;


/* =====================================================
   SCREEN NAVIGATION
===================================================== */

function showScreen(screenId) {

    document
        .querySelectorAll(".screen")
        .forEach(function(screen) {

            screen.classList.remove(
                "active-screen"
            );

        });


    const target =
        document.getElementById(screenId);


    if (!target) {

        console.error(
            "Screen does not exist:",
            screenId
        );

        return;
    }


    target.classList.add(
        "active-screen"
    );


    document
        .querySelectorAll(".nav-item")
        .forEach(function(item) {

            item.classList.remove(
                "active"
            );

        });


    const nav =
        document.getElementById(
            "nav-" + screenId
        );


    if (nav) {

        nav.classList.add(
            "active"
        );

    }


    window.scrollTo(
        0,
        0
    );
}


/* =====================================================
   LET'S START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const startButton =
            document.getElementById(
                "letsStartButton"
            );


        if (startButton) {

            startButton.addEventListener(
                "click",
                function() {

                    showScreen(
                        "modes"
                    );

                }
            );

        }


        showScreen(
            "welcome"
        );

    }
);


/* =====================================================
   TECHNICAL INTERVIEW
===================================================== */

function startTechnicalSetup() {

    normalInterview.type =
        "technical";


    createInterviewSetup(
        "Technical Interview"
    );


    showScreen(
        "interview"
    );
}


function openTechnical() {

    startTechnicalSetup();

}


/* =====================================================
   HR INTERVIEW
===================================================== */

function startHRSetup() {

    normalInterview.type =
        "hr";


    createInterviewSetup(
        "HR Interview"
    );


    showScreen(
        "interview"
    );
}


function openHR() {

    startHRSetup();

}


/* =====================================================
   INTERVIEW SETUP
===================================================== */

function createInterviewSetup(title) {

    const screen =
        document.getElementById(
            "interview"
        );


    if (!screen) {

        console.error(
            "Interview screen missing."
        );

        return;
    }


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                ${escapeHTML(
                    title.toUpperCase()
                )}
            </div>


            <h2>
                Configure your interview.
            </h2>


            <p class="subtitle">
                Choose your topic, difficulty
                and number of questions.
            </p>


            <div class="setup-panel">

                <label>
                    INTERVIEW TOPIC
                </label>


                <select id="interviewTopic">

                    <option value="">
                        Select topic
                    </option>

                    <option value="python">
                        Python
                    </option>

                    <option value="java">
                        Java
                    </option>

                    <option value="c++">
                        C++
                    </option>

                    <option value="javascript">
                        JavaScript
                    </option>

                    <option value="data structures">
                        Data Structures
                    </option>

                    <option value="algorithms">
                        Algorithms
                    </option>

                    <option value="database">
                        Database
                    </option>

                    <option value="sql">
                        SQL
                    </option>

                    <option value="operating system">
                        Operating System
                    </option>

                    <option value="computer networks">
                        Computer Networks
                    </option>

                    <option value="software engineering">
                        Software Engineering
                    </option>

                    <option value="web development">
                        Web Development
                    </option>

                    <option value="artificial intelligence">
                        Artificial Intelligence
                    </option>

                    <option value="machine learning">
                        Machine Learning
                    </option>

                    <option value="deep learning">
                        Deep Learning
                    </option>

                    <option value="generative ai">
                        Generative AI
                    </option>

                    <option value="natural language processing">
                        Natural Language Processing
                    </option>

                    <option value="computer vision">
                        Computer Vision
                    </option>

                    <option value="data science">
                        Data Science
                    </option>

                    <option value="business">
                        Business
                    </option>

                    <option value="management">
                        Management
                    </option>

                    <option value="marketing">
                        Marketing
                    </option>

                    <option value="finance">
                        Finance
                    </option>

                    <option value="business analytics">
                        Business Analytics
                    </option>

                    <option value="entrepreneurship">
                        Entrepreneurship
                    </option>

                    <option value="electronics">
                        Electronics
                    </option>

                    <option value="electrical engineering">
                        Electrical Engineering
                    </option>

                    <option value="mechanical engineering">
                        Mechanical Engineering
                    </option>

                    <option value="civil engineering">
                        Civil Engineering
                    </option>

                    <option value="semiconductor">
                        Semiconductor
                    </option>

                    <option value="physics">
                        Physics
                    </option>

                    <option value="mathematics">
                        Mathematics
                    </option>

                    <option value="hr">
                        HR
                    </option>

                    <option value="human resources">
                        Human Resources
                    </option>

                    <option value="communication">
                        Communication
                    </option>

                </select>


                <label>
                    NUMBER OF QUESTIONS
                </label>


                <input
                    id="interviewQuestionCount"
                    type="number"
                    min="1"
                    max="20"
                    value="5"
                >


                <label>
                    DIFFICULTY
                </label>


                <select id="interviewDifficulty">

                    <option>
                        Beginner
                    </option>

                    <option selected>
                        Intermediate
                    </option>

                    <option>
                        Advanced
                    </option>

                </select>


                <button
                    class="primary-button"
                    onclick="startNormalInterview()"
                >
                    Start Interview →
                </button>


                <button
                    class="back-button"
                    onclick="showScreen('modes')"
                >
                    ← Back to modes
                </button>

            </div>

        </div>

    `;
}


/* =====================================================
   START NORMAL INTERVIEW
===================================================== */

async function startNormalInterview() {

    const topicElement =
        document.getElementById(
            "interviewTopic"
        );


    const difficultyElement =
        document.getElementById(
            "interviewDifficulty"
        );


    const countElement =
        document.getElementById(
            "interviewQuestionCount"
        );


    if (!topicElement) {

        alert(
            "Interview setup could not be loaded."
        );

        return;
    }


    const topic =
        topicElement.value;


    if (!topic) {

        alert(
            "Please select an interview topic."
        );

        return;
    }


    normalInterview.topic =
        topic;


    normalInterview.difficulty =
        difficultyElement.value;


    normalInterview.totalQuestions =
        Math.max(
            1,
            Math.min(
                20,
                parseInt(
                    countElement.value
                ) || 5
            )
        );


    normalInterview.currentQuestion =
        1;


    normalInterview.previousQuestions =
        [];


    normalInterview.scores =
        [];


    normalInterview.expression =
        "neutral";


    createLiveInterviewScreen();


    showScreen(
        "interview"
    );


    await startCamera();


    await loadFaceModels();


    startExpressionDetection();


    await generateNormalQuestion();

}


/* =====================================================
   LIVE INTERVIEW SCREEN
===================================================== */

function createLiveInterviewScreen() {

    const screen =
        document.getElementById(
            "interview"
        );


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                LIVE AI INTERVIEW
            </div>


            <h2>
                AI Interviewer
            </h2>


            <div class="interview-live-card">

                <div class="question-counter">

                    Question

                    <strong>

                        <span
                            id="liveQuestionNumber">
                            1
                        </span>

                        /

                        <span
                            id="liveTotalQuestions">
                            5
                        </span>

                    </strong>

                </div>


                <div class="interview-layout">


                    <!-- CAMERA -->

                    <div class="camera-panel">

                        <video
                            id="interviewCamera"
                            autoplay
                            muted
                            playsinline
                        ></video>


                        <div
                            id="cameraStatus"
                            class="camera-status"
                        >
                            CAMERA STARTING...
                        </div>


                        <div
                            id="expressionStatus"
                            class="expression"
                        >
                            Expression:
                            detecting...
                        </div>

                    </div>


                    <!-- INTERVIEW -->

                    <div>

                        <div class="ai-interviewer">

                            <div class="ai-avatar">
                                AI
                            </div>


                            <div>

                                <span
                                    class="ai-label">
                                    ● AI INTERVIEWER
                                </span>


                                <p>
                                    I will ask one
                                    question at a time.
                                </p>

                            </div>

                        </div>


                        <div
                            class="question-display"
                        >

                            <span>
                                QUESTION
                            </span>


                            <h3
                                id="liveQuestion"
                            >
                                Preparing your question...
                            </h3>

                        </div>


                        <textarea
                            id="liveAnswer"
                            placeholder="Type your answer here..."
                        ></textarea>


                        <button
                            id="submitInterviewAnswer"
                            class="primary-button"
                            onclick="submitNormalAnswer()"
                        >
                            Submit Answer →
                        </button>

                    </div>

                </div>

            </div>

        </div>

    `;
}


/* =====================================================
   CAMERA
===================================================== */

async function startCamera() {

    const video =
        document.getElementById(
            "interviewCamera"
        );


    const status =
        document.getElementById(
            "cameraStatus"
        );


    if (!video) {

        return;
    }


    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        if (status) {

            status.textContent =
                "Camera not supported";

        }

        return;
    }


    try {

        normalInterview.cameraStream =
            await navigator.mediaDevices.getUserMedia(
                {
                    video: true,
                    audio: false
                }
            );


        video.srcObject =
            normalInterview.cameraStream;


        if (status) {

            status.textContent =
                "● CAMERA ACTIVE";

        }

    } catch (error) {

        console.error(
            "Camera error:",
            error
        );


        if (status) {

            status.textContent =
                "CAMERA PERMISSION REQUIRED";

        }

    }
}


/* =====================================================
   STOP CAMERA
===================================================== */

function stopCamera() {

    if (
        normalInterview.cameraStream
    ) {

        normalInterview.cameraStream
            .getTracks()
            .forEach(function(track) {

                track.stop();

            });

        normalInterview.cameraStream =
            null;
    }


    if (faceDetectionInterval) {

        clearInterval(
            faceDetectionInterval
        );

        faceDetectionInterval =
            null;
    }
}


/* =====================================================
   LOAD FACE API MODELS
===================================================== */

async function loadFaceModels() {

    if (faceModelsLoaded) {

        return true;
    }


    if (typeof faceapi === "undefined") {

        console.warn(
            "face-api.js has not loaded yet."
        );

        return false;
    }


    try {

        const MODEL_URL =
            "https://justadudewhohacks.github.io/face-api.js/models";


        await faceapi.nets.tinyFaceDetector
            .loadFromUri(
                MODEL_URL
            );


        await faceapi.nets.faceExpressionNet
            .loadFromUri(
                MODEL_URL
            );


        faceModelsLoaded =
            true;


        return true;

    } catch (error) {

        console.error(
            "Face model loading error:",
            error
        );


        return false;
    }
}


/* =====================================================
   EXPRESSION DETECTION
===================================================== */

function startExpressionDetection() {

    const video =
        document.getElementById(
            "interviewCamera"
        );


    if (!video) {

        return;
    }


    if (typeof faceapi === "undefined") {

        return;
    }


    if (!faceModelsLoaded) {

        return;
    }


    if (faceDetectionInterval) {

        clearInterval(
            faceDetectionInterval
        );

    }


    faceDetectionInterval =
        setInterval(
            async function() {

                if (
                    video.readyState <
                    2
                ) {

                    return;
                }


                try {

                    const detection =
                        await faceapi
                            .detectSingleFace(
                                video,
                                new faceapi
                                    .TinyFaceDetectorOptions()
                            )
                            .withFaceExpressions();


                    if (!detection) {

                        updateExpression(
                            "neutral"
                        );

                        return;
                    }


                    const expressions =
                        detection.expressions;


                    let strongest =
                        "neutral";


                    let highest =
                        expressions.neutral;


                    Object.keys(
                        expressions
                    ).forEach(
                        function(expression) {

                            if (
                                expressions[
                                    expression
                                ] > highest
                            ) {

                                highest =
                                    expressions[
                                        expression
                                    ];

                                strongest =
                                    expression;
                            }

                        }
                    );


                    updateExpression(
                        strongest
                    );

                } catch (error) {

                    console.error(
                        "Expression error:",
                        error
                    );

                }

            },
            1500
        );
}


/* =====================================================
   UPDATE EXPRESSION
===================================================== */

function updateExpression(
    expression
) {

    normalInterview.expression =
        expression;


    const element =
        document.getElementById(
            "expressionStatus"
        );


    if (!element) {

        return;
    }


    const readable =
        expression.charAt(0)
            .toUpperCase() +
        expression.slice(1);


    element.textContent =
        "Expression: " +
        readable;
}


/* =====================================================
   GENERATE QUESTION
===================================================== */

async function generateNormalQuestion() {

    const questionElement =
        document.getElementById(
            "liveQuestion"
        );


    if (!questionElement) {

        return;
    }


    questionElement.textContent =
        "AI interviewer is preparing your question...";


    try {

        const response =
            await fetch(
                "/generate_question",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        interview_type:
                            normalInterview.type,

                        topic:
                            normalInterview.topic,

                        difficulty:
                            normalInterview.difficulty,

                        previous_questions:
                            normalInterview
                                .previousQuestions,

                        expression:
                            normalInterview.expression

                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error ||
                "Could not generate question."
            );

            return;
        }


        normalInterview.question =
            data.question;


        normalInterview
            .previousQuestions
            .push(
                data.question
            );


        questionElement.textContent =
            data.question;


        const number =
            document.getElementById(
                "liveQuestionNumber"
            );


        const total =
            document.getElementById(
                "liveTotalQuestions"
            );


        if (number) {

            number.textContent =
                normalInterview.currentQuestion;

        }


        if (total) {

            total.textContent =
                normalInterview.totalQuestions;

        }

    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not connect to Flask/Ollama."
        );

    }
}


/* =====================================================
   SUBMIT NORMAL ANSWER
===================================================== */

async function submitNormalAnswer() {

    const answerElement =
        document.getElementById(
            "liveAnswer"
        );


    if (!answerElement) {

        return;
    }


    const answer =
        answerElement.value.trim();


    if (!answer) {

        alert(
            "Please enter your answer."
        );

        return;
    }


    const button =
        document.getElementById(
            "submitInterviewAnswer"
        );


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "AI is analysing...";

    }


    try {

        const response =
            await fetch(
                "/evaluate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        question:
                            normalInterview.question,

                        answer:
                            answer,

                        topic:
                            normalInterview.topic,

                        interview_type:
                            normalInterview.type

                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        const evaluation =
            parseEvaluation(
                data.evaluation
            );


        normalInterview
            .scores
            .push(
                evaluation
            );


        stopCamera();


        showInterviewFeedback(
            evaluation,
            false
        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not analyse your answer."
        );

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Submit Answer →";

        }

    }
}


/* =====================================================
   FEEDBACK
===================================================== */

function showInterviewFeedback(
    evaluation,
    isResume
) {

    const target =
        isResume
            ? "resume"
            : "interview";


    const screen =
        document.getElementById(
            target
        );


    if (!screen) {

        return;
    }


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                ANSWER ANALYSIS
            </div>


            <h2>
                Here's how you performed.
            </h2>


            <div class="score-grid">

                <div class="score-card">

                    <span>
                        TECHNICAL
                    </span>

                    <strong>
                        ${evaluation.technical}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        COMMUNICATION
                    </span>

                    <strong>
                        ${evaluation.communication}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        CONFIDENCE
                    </span>

                    <strong>
                        ${evaluation.confidence}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        OVERALL
                    </span>

                    <strong>
                        ${evaluation.overall}
                    </strong>

                    /10

                </div>

            </div>


            <div class="feedback-box">

                <h3>
                    What you did well
                </h3>

                <p>
                    ${escapeHTML(
                        evaluation.strengths
                    )}
                </p>


                <h3>
                    What you can improve
                </h3>

                <p>
                    ${escapeHTML(
                        evaluation.improvements
                    )}
                </p>


                <h3>
                    AI Explanation
                </h3>

                <p>
                    ${escapeHTML(
                        evaluation.explanation
                    )}
                </p>


                <h3>
                    Better Answer
                </h3>

                <p>
                    ${escapeHTML(
                        evaluation.betterAnswer
                    )}
                </p>

            </div>


            <button
                class="primary-button"
                onclick="${
                    isResume
                        ? "nextResumeQuestion()"
                        : "nextNormalQuestion()"
                }"
            >
                Next Question →
            </button>


            <br>


            <button
                class="back-button"
                onclick="showScreen('modes')"
            >
                ← Back to modes
            </button>

        </div>

    `;
}


/* =====================================================
   NEXT NORMAL QUESTION
===================================================== */

async function nextNormalQuestion() {

    if (
        normalInterview.currentQuestion >=
        normalInterview.totalQuestions
    ) {

        showFinalReport(
            normalInterview.scores,
            "interview"
        );

        return;
    }


    normalInterview.currentQuestion++;


    createLiveInterviewScreen();


    showScreen(
        "interview"
    );


    await startCamera();


    await loadFaceModels();


    startExpressionDetection();


    await generateNormalQuestion();
}


/* =====================================================
   FINAL REPORT
===================================================== */

function showFinalReport(
    scores,
    type
) {

    stopCamera();


    let technical = 0;

    let communication = 0;

    let confidence = 0;

    let overall = 0;


    scores.forEach(
        function(score) {

            technical +=
                Number(
                    score.technical
                ) || 0;

            communication +=
                Number(
                    score.communication
                ) || 0;

            confidence +=
                Number(
                    score.confidence
                ) || 0;

            overall +=
                Number(
                    score.overall
                ) || 0;

        }
    );


    const count =
        scores.length || 1;


    technical /=
        count;

    communication /=
        count;

    confidence /=
        count;

    overall /=
        count;


    const screen =
        document.getElementById(
            type
        );


    if (!screen) {

        return;
    }


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                INTERVIEW COMPLETED
            </div>


            <h2>
                Your Final Performance
            </h2>


            <div class="score-grid">

                <div class="score-card">

                    <span>
                        TECHNICAL
                    </span>

                    <strong>
                        ${technical.toFixed(1)}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        COMMUNICATION
                    </span>

                    <strong>
                        ${communication.toFixed(1)}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        CONFIDENCE
                    </span>

                    <strong>
                        ${confidence.toFixed(1)}
                    </strong>

                    /10

                </div>


                <div class="score-card">

                    <span>
                        OVERALL
                    </span>

                    <strong>
                        ${overall.toFixed(1)}
                    </strong>

                    /10

                </div>

            </div>


            <button
                class="primary-button"
                onclick="showScreen('modes')"
            >
                Back to Modes →
            </button>

        </div>

    `;
}


/* =====================================================
   RESUME SECTION
===================================================== */

function openResume() {

    showScreen(
        "resume"
    );

}


/* =====================================================
   START RESUME INTERVIEW
===================================================== */

async function startResumeInterview() {

    const input =
        document.getElementById(
            "resumeInterviewFile"
        );


    if (!input ||
        !input.files ||
        !input.files.length) {

        alert(
            "Please upload your CV first."
        );

        return;
    }


    const formData =
        new FormData();


    formData.append(
        "resume",
        input.files[0]
    );


    const button =
        document.querySelector(
            "#resume .primary-button"
        );


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Reading your CV...";

    }


    try {

        const response =
            await fetch(
                "/resume_interview/start",
                {
                    method: "POST",

                    body:
                        formData
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        resumeInterview.resumeText =
            data.resume_text;


        resumeInterview.question =
            data.question;


        resumeInterview.currentQuestion =
            1;


        resumeInterview.previousQuestions =
            [
                data.question
            ];


        resumeInterview.scores =
            [];


        createResumeLiveScreen();


        showScreen(
            "resume"
        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not start resume interview."
        );

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Start Resume Interview →";

        }

    }
}


/* =====================================================
   RESUME LIVE SCREEN
===================================================== */

function createResumeLiveScreen() {

    const screen =
        document.getElementById(
            "resume"
        );


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                RESUME BASED INTERVIEW
            </div>


            <h2>
                Your AI Interviewer
            </h2>


            <div class="interview-live-card">

                <div class="question-counter">

                    Question

                    <strong>

                        <span
                            id="resumeQuestionNumber">
                            1
                        </span>

                        /

                        <span
                            id="resumeTotalQuestions">
                            5
                        </span>

                    </strong>

                </div>


                <div class="ai-interviewer">

                    <div class="ai-avatar">
                        CV
                    </div>


                    <div>

                        <span class="ai-label">
                            ● RESUME INTERVIEWER
                        </span>


                        <p>
                            This question is based
                            on your uploaded CV.
                        </p>

                    </div>

                </div>


                <div class="question-display">

                    <span>
                        QUESTION
                    </span>


                    <h3
                        id="resumeLiveQuestion"
                    >
                        ${escapeHTML(
                            resumeInterview.question
                        )}
                    </h3>

                </div>


                <textarea
                    id="resumeLiveAnswer"
                    placeholder="Type your answer here..."
                ></textarea>


                <button
                    id="resumeSubmitButton"
                    class="primary-button"
                    onclick="submitResumeAnswer()"
                >
                    Submit Answer →
                </button>

            </div>

        </div>

    `;
}


/* =====================================================
   RESUME ANSWER
===================================================== */

async function submitResumeAnswer() {

    const answerElement =
        document.getElementById(
            "resumeLiveAnswer"
        );


    const answer =
        answerElement.value.trim();


    if (!answer) {

        alert(
            "Please enter your answer."
        );

        return;
    }


    const button =
        document.getElementById(
            "resumeSubmitButton"
        );


    button.disabled =
        true;

    button.textContent =
        "AI is analysing...";


    try {

        const response =
            await fetch(
                "/resume_interview/evaluate",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        question:
                            resumeInterview.question,

                        answer:
                            answer,

                        resume_text:
                            resumeInterview.resumeText

                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        const evaluation =
            parseEvaluation(
                data.evaluation
            );


        resumeInterview.scores.push(
            evaluation
        );


        showInterviewFeedback(
            evaluation,
            true
        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not analyse your answer."
        );

    } finally {

        button.disabled =
            false;

        button.textContent =
            "Submit Answer →";

    }
}


/* =====================================================
   NEXT RESUME QUESTION
===================================================== */

async function nextResumeQuestion() {

    if (
        resumeInterview.currentQuestion >=
        resumeInterview.totalQuestions
    ) {

        showFinalReport(
            resumeInterview.scores,
            "resume"
        );

        return;
    }


    resumeInterview.currentQuestion++;


    createResumeLiveScreen();


    showScreen(
        "resume"
    );


    const questionElement =
        document.getElementById(
            "resumeLiveQuestion"
        );


    questionElement.textContent =
        "AI is preparing your next question...";


    try {

        const response =
            await fetch(
                "/resume_interview/question",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        resume_text:
                            resumeInterview.resumeText,

                        previous_questions:
                            resumeInterview
                                .previousQuestions

                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        resumeInterview.question =
            data.question;


        resumeInterview
            .previousQuestions
            .push(
                data.question
            );


        questionElement.textContent =
            data.question;


        document.getElementById(
            "resumeQuestionNumber"
        ).textContent =
            resumeInterview.currentQuestion;


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not generate next question."
        );

    }
}


/* =====================================================
   ATS ANALYSIS
===================================================== */

async function analyseResume() {

    const input =
        document.getElementById(
            "atsFile"
        );


    if (!input ||
        !input.files ||
        !input.files.length) {

        alert(
            "Please upload your resume first."
        );

        return;
    }


    const formData =
        new FormData();


    formData.append(
        "resume",
        input.files[0]
    );


    const button =
        document.querySelector(
            "#ats .primary-button"
        );


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "AI is analysing...";

    }


    try {

        const response =
            await fetch(
                "/analyze_resume",
                {
                    method: "POST",

                    body:
                        formData
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        displayATSResult(
            data.result
        );


    } catch (error) {

        console.error(
            error
        );


        alert(
            "Could not connect to Flask/Ollama."
        );

    } finally {

        if (button) {

            button.disabled =
                false;

            button.textContent =
                "Analyse Resume →";

        }

    }
}


/* =====================================================
   DISPLAY ATS
===================================================== */

function displayATSResult(
    result
) {

    const box =
        document.getElementById(
            "atsResult"
        );


    if (!box) {

        return;
    }


    box.textContent =
        result;


    box.classList.add(
        "visible"
    );
}


/* =====================================================
   GROUP DISCUSSION OPEN
===================================================== */

function openGD() {

    createGDSetup();

    showScreen(
        "gd"
    );
}


/* =====================================================
   GD SETUP
===================================================== */

function createGDSetup() {

    const screen =
        document.getElementById(
            "gd"
        );


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                GROUP DISCUSSION
            </div>


            <h2>
                Choose a discussion topic.
            </h2>


            <p class="subtitle">
                Select a topic and discuss it
                with multiple AI participants.
            </p>


            <div class="setup-panel">

                <label>
                    DISCUSSION TOPIC
                </label>


                <select id="gdTopic">

                    <option value="">
                        Select a topic
                    </option>


                    ${GD_TOPICS.map(
                        function(topic) {

                            return `
                                <option value="${escapeHTML(topic)}">
                                    ${escapeHTML(topic)}
                                </option>
                            `;

                        }
                    ).join("")}

                </select>


                <button
                    class="primary-button"
                    onclick="startGD()"
                >
                    Start Group Discussion →
                </button>


                <button
                    class="back-button"
                    onclick="showScreen('modes')"
                >
                    ← Back to modes
                </button>

            </div>

        </div>

    `;
}


/* =====================================================
   START GD
===================================================== */

async function startGD() {

    const select =
        document.getElementById(
            "gdTopic"
        );


    if (!select) {

        alert(
            "GD topic list could not be loaded."
        );

        return;
    }


    const topic =
        select.value;


    if (!topic) {

        alert(
            "Please select a discussion topic."
        );

        return;
    }


    currentGDTopic =
        topic;


    gdConversation =
        [];


    createGDLiveScreen(
        topic
    );


    showScreen(
        "gd"
    );


    await continueGD();

}


/* =====================================================
   GD LIVE SCREEN
===================================================== */

function createGDLiveScreen(
    topic
) {

    const screen =
        document.getElementById(
            "gd"
        );


    screen.innerHTML = `

        <div class="screen-inner">

            <div class="eyebrow">
                LIVE GROUP DISCUSSION
            </div>


            <h2>
                ${escapeHTML(topic)}
            </h2>


            <div
                id="gdConversationBox"
                class="discussion-box"
            >

                <div
                    class="discussion-message"
                >
                    AI participants are joining
                    the discussion...
                </div>

            </div>


            <textarea
                id="gdUserAnswer"
                class="gd-input"
                placeholder="Enter your contribution to the discussion..."
            ></textarea>


            <button
                class="primary-button"
                onclick="sendGDResponse()"
            >
                Add My Opinion →
            </button>


            <button
                class="back-button"
                onclick="showScreen('modes')"
            >
                ← End Discussion
            </button>

        </div>

    `;
}


/* =====================================================
   CONTINUE GD
===================================================== */

async function continueGD() {

    try {

        const response =
            await fetch(
                "/group_discussion",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        topic:
                            currentGDTopic,

                        conversation:
                            gdConversation

                    })
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            alert(
                data.error
            );

            return;
        }


        gdConversation.push(
            data.result
        );


        renderGDConversation();


    } catch (error) {

        console.error(
            "GD error:",
            error
        );


        alert(
            "Could not connect to the GD AI."
        );

    }
}


/* =====================================================
   SEND USER GD RESPONSE
===================================================== */

async function sendGDResponse() {

    const input =
        document.getElementById(
            "gdUserAnswer"
        );


    if (!input) {

        return;
    }


    const answer =
        input.value.trim();


    if (!answer) {

        alert(
            "Please enter your opinion."
        );

        return;
    }


    gdConversation.push(
        "YOU:\n" + answer
    );


    input.value =
        "";


    renderGDConversation();


    await continueGD();

}


/* =====================================================
   RENDER GD
===================================================== */

function renderGDConversation() {

    const box =
        document.getElementById(
            "gdConversationBox"
        );


    if (!box) {

        return;
    }


    box.innerHTML =
        "";


    gdConversation.forEach(
        function(message) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "discussion-message";


            if (
                message.startsWith(
                    "YOU:"
                )
            ) {

                div.classList.add(
                    "you"
                );

            }


            div.textContent =
                message;


            box.appendChild(
                div
            );

        }
    );


    box.scrollTop =
        box.scrollHeight;
}


/* =====================================================
   PARSE EVALUATION
===================================================== */

function parseEvaluation(
    text
) {

    return {

        technical:
            extractScore(
                text,
                "TECHNICAL_SCORE"
            ),

        communication:
            extractScore(
                text,
                "COMMUNICATION_SCORE"
            ),

        confidence:
            extractScore(
                text,
                "CONFIDENCE_SCORE"
            ),

        overall:
            extractScore(
                text,
                "OVERALL_SCORE"
            ),

        strengths:
            extractSection(
                text,
                "STRENGTHS:",
                "IMPROVEMENTS:"
            ),

        improvements:
            extractSection(
                text,
                "IMPROVEMENTS:",
                "EXPLANATION:"
            ),

        explanation:
            extractSection(
                text,
                "EXPLANATION:",
                "BETTER_ANSWER:"
            ),

        betterAnswer:
            extractSection(
                text,
                "BETTER_ANSWER:",
                null
            )

    };
}


/* =====================================================
   EXTRACT SCORE
===================================================== */

function extractScore(
    text,
    label
) {

    const regex =
        new RegExp(
            label +
            "\\s*:\\s*([0-9]+(?:\\.[0-9]+)?)",
            "i"
        );


    const match =
        text.match(
            regex
        );


    if (match) {

        return match[1];

    }


    return "0";
}


/* =====================================================
   EXTRACT SECTION
===================================================== */

function extractSection(
    text,
    start,
    end
) {

    const startIndex =
        text.indexOf(
            start
        );


    if (startIndex === -1) {

        return "No analysis available.";

    }


    let content =
        text.substring(
            startIndex +
            start.length
        );


    if (end) {

        const endIndex =
            content.indexOf(
                end
            );


        if (endIndex !== -1) {

            content =
                content.substring(
                    0,
                    endIndex
                );

        }

    }


    return content.trim();
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(
    text
) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text == null
            ? ""
            : String(text);


    return div.innerHTML;
}