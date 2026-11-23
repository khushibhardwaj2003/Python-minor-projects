import {
  FaceLandmarker,
  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22";

let cameraStream = null;
let faceLandmarker = null;
let cameraRunning = false;
let animationFrame = null;
let lastVideoTime = -1;

window.faceContext = "No facial analysis available";

async function loadFaceModel() {
  if (faceLandmarker) return;

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
  );

  faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "CPU"
    },
    runningMode: "VIDEO",
    numFaces: 1,
    outputFaceBlendshapes: true
  });
}

window.startFaceAnalysis = async function () {
  const video = document.getElementById("candidateCamera");
  const status = document.getElementById("cameraStatus");
  const resultText = document.getElementById("faceResult");

  if (!navigator.mediaDevices?.getUserMedia) {
    status.textContent = "Camera unavailable";
    resultText.textContent =
      "Camera access needs localhost or HTTPS and a supported browser.";
    return;
  }

  if (cameraRunning) return;

  try {
    status.textContent = "Loading detector…";
    resultText.textContent = "Loading face model. The first load needs internet.";

    await loadFaceModel();

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      audio: false
    });

    video.srcObject = cameraStream;
    await video.play();

    cameraRunning = true;
    status.textContent = "Camera active";
    resultText.textContent = "Looking for a face…";
    detectFace();
  } catch (error) {
    console.error("Face analysis error:", error);
    stopCameraTracks();
    status.textContent = "Camera unavailable";
    resultText.textContent =
      "Could not start face analysis. Allow camera permission, check your webcam, and ensure you are using localhost or HTTPS. " +
      (error?.message || "");
  }
};

function detectFace() {
  if (!cameraRunning) return;

  const video = document.getElementById("candidateCamera");

  if (faceLandmarker && video.readyState >= 2 && video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;

    try {
      const detection = faceLandmarker.detectForVideo(video, performance.now());
      const resultText = document.getElementById("faceResult");

      if (!detection.faceLandmarks?.length) {
        window.faceContext = "No face detected";
        resultText.textContent = "No face detected. Centre your face in the camera.";
      } else {
        const categories = detection.faceBlendshapes?.[0]?.categories || [];
        const scores = Object.fromEntries(
          categories.map(item => [item.categoryName, item.score])
        );

        const smile = ((scores.mouthSmileLeft || 0) + (scores.mouthSmileRight || 0)) / 2;
        const raisedBrows = scores.browInnerUp || 0;
        const furrowedBrows = ((scores.browDownLeft || 0) + (scores.browDownRight || 0)) / 2;
        const mouthOpen = scores.jawOpen || 0;

        const cues = [];
        if (smile > 0.45) cues.push("smile-like movement");
        if (raisedBrows > 0.45) cues.push("raised eyebrows");
        if (furrowedBrows > 0.45) cues.push("furrowed eyebrows");
        if (mouthOpen > 0.55) cues.push("mouth open");

        const summary = cues.length
          ? cues.join(", ")
          : "face detected; no strong tracked movement";

        window.faceContext = summary;
        resultText.textContent =
          "Face detected. Visible movement cues: " + summary +
          ". These cues do not reliably identify emotion or confidence.";
      }
    } catch (error) {
      console.error("Face detection failed:", error);
      document.getElementById("faceResult").textContent =
        "Face detector error. Try turning the camera off and on again.";
    }
  }

  if (cameraRunning) animationFrame = requestAnimationFrame(detectFace);
}

function stopCameraTracks() {
  if (cameraStream) {
    cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
  }
}

window.stopFaceAnalysis = function () {
  cameraRunning = false;

  if (animationFrame !== null) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  stopCameraTracks();

  const video = document.getElementById("candidateCamera");
  if (video) video.srcObject = null;

  const status = document.getElementById("cameraStatus");
  const result = document.getElementById("faceResult");
  if (status) status.textContent = "Camera is off";
  if (result) result.textContent = "Camera stopped.";

  window.faceContext = "No facial analysis available";
};
