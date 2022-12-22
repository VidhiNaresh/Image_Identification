function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoded);
}
function modelLoded() {
  console.log("model is loded");
}
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
}
var previous_results ="";

function gotResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    if((results[0].confidence>0.5)&&(resluts[0].label!=previous_results)) {
      console.log(results);
      previous_results=results[0].label;
      var synth = window.speechSynthesis;
      speak_data ="Object detected is "+results[0].label;
      var utterthis = new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);
document.getElementById("result_1").innerHTML =results[0].label;
document.getElementById("result_2").innerHTML = results[0].accuracy;
    }
  }
}
