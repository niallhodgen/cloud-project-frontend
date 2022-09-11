let modules_form = document.getElementById("inputText");
let total_marks = "";
let max_min = "";
let sorted_modules = "";
let classification = "";
let averages = "";
let transcript = "";
let savedDetails = "";
let studentDetails = {};

let apiURL = "http://api.40040160.qpc.hal.davecutting.uk/";
let totalURL = "http://totalmark.40040160.qpc.hal.davecutting.uk/";
//let totalURL = "http://localhost:94";
let maxminURL = "http://maxmin.40040160.qpc.hal.davecutting.uk/";
//let maxminURL = "http://localhost:91";
let sortedModulesURL = "http://sortmodules.40040160.qpc.hal.davecutting.uk/";
//let sortedModulesURL = "http://localhost:92";
let classificationURL = "http://classification.40040160.qpc.hal.davecutting.uk/";
//let classificationURL = "http://localhost:90";
//let transcriptURL = "http://transcript.40040160.qpc.hal.davecutting.uk/";
let transcriptURL = "http://127.0.0.1:5000";
let saveDetailsURL = "http://localhost:8080/student/save";
//let saveDetailsURL = "http://results.40040160.qpc.hal.davecutting.uk/student/save";
let getDetailsURL = "http://localhost:8080/student/find";
//let getDetailsURL = "http://results.40040160.qpc.hal.davecutting.uk/student/find";

function displayClassification() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value =
    "Classification = " + classification;
}

function displayTotal() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = total_marks;
}

function displayMaxMin() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = max_min;
}

function displaySortedModules() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = sorted_modules;
}

function displaySaved() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = savedDetails;
}

function displayDetails() {

  let details = "";

 for (const key in studentDetails){

  // Already changed to 00000 for confidentiality on backend but this tidies up further
  if(!key.match("studentId")) {

    details += `${key}: ${studentDetails[key]}` + '\r\n'
    
  }   
  
}

// Tidy up formatting
details = details.replace(/[A-Z]/g, ' $&').trim()
details = details.toUpperCase()

console.log(details)

  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = details;
}

function displayTranscript() {
  document.getElementById("output-text").value = "";
  document.getElementById("output-text").value = transcript;
}

function clearText() {
  document.getElementById("inputText").value = "";
  document.getElementById("output-text").value = "";
}

// Simulating user login whereby key user details are store in local or session storage
function saveStudent() {
  studentNum = document.getElementById("studentNumber").value;
  studentName = document.getElementById("studentName").value;

  sessionStorage.setItem("studentNumber", studentNum);
  sessionStorage.setItem("studentName", studentName);

  console.log(sessionStorage.getItem("studentNumber"));
  console.log(sessionStorage.getItem("studentName"));
}

/**
 * GET final classification, i.e. distinction
 */
function getClassification() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
  //console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(classificationURL, {
            method: "post",
            body: data,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              classification = json.answer;
              displayClassification();
              console.log(json);
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}

/**
 * POST results to DB (including studentNum and studentName session vars)
 * GET total marks result back.
 */
function getTotal() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
 // console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(totalURL, {
            method: "post",
            body: data,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              total_marks = json.answer;
              displayTotal();
              console.log(json);
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}

/**
 * GET module with highest mark and module with lowest mark
 */
function getMaxMin() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
  //console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(maxminURL, {
            method: "post",
            body: data,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              max_min = json.answer;
              // Replace url encoded escape chars globally
              max_min = max_min.replace(/\\r\\n/g, "\r\n", sorted_modules);
              displayMaxMin();
              console.log(json);
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}

/**
 * Get all modules back and sorted in descending order
 *
 * Creates FormData object from module marks form ('inputText'),
 * proceeds to send an asynchronous fetch API request to receive
 * back results. The JSON file is parsed to a JS Object Literal
 * and the 'answer' key is accessed and stored. Replace() is used
 * to ensure escape keys are url decoded.
 *
 * Access to Bootstrap form validation through their check-validity() function
 *
 * HTML5 attribute "type='number'" ensures only numeric values can be entered
 */
function getSortedModules() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
  //console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(sortedModulesURL, {
            method: "post",
            body: data,
            cache: "default"
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              sorted_modules = json.answer;
              // Replace url encoded escape chars globally
              sorted_modules = sorted_modules.replace(
                /\\r\\n/g,
                "\r\n",
                sorted_modules
              );
              displaySortedModules();
              console.log(json);
            })
            .catch(function (error) {
              console.error(error);
            });
        } else {
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}

/**
 * Function that posts form data to database for later retrieval
 */
function saveDetails() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
 // console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(saveDetailsURL, {
            method: "post",
            body: data,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              savedDetails = json.message;
             
              displaySaved();
              console.log(json);
            })
            .catch(function (error) {
               // add bootstrap alert class
               //savedDetails = "Student number has already registered marks on our system - please check carefully and try again. If you are still having issues please contact the system admin"
               document.getElementById("warning").className =
               "alert alert-warning alert-dismissible fade show";
               displaySaved();
              console.error(error);
            });
        } else {
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}

/**
 * Function that posts form data, uses it to access and return data from database
 */
 function getDetails() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
  //console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(getDetailsURL, {
            method: "post",
            body: data,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              studentDetails = json;    
              displayDetails();
              console.log(json);
            })
            .catch(function (error) {
               // add bootstrap alert class
               document.getElementById("warning").className =
               "alert alert-warning alert-dismissible fade show";
              console.error(error);
            });
        
      },
      { once: true }
    );
  });
}

/**
 * GET final classification, i.e. distinction
 */
function getTranscript() {
  const data = new URLSearchParams();
  for (const pair of new FormData(inputText)) {
    data.append(pair[0], pair[1]);
  }

  // Check URL parmeters
  //console.log(data.toString());

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over these forms and prevent submission if validation not met
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "click",
      function (event) {
        if (form.checkValidity()) {
          event.preventDefault();
          //event.stopPropagation()
          console.log("Sending data");

          // Use Fetch API to POST data to microservice function
          fetch(transcriptURL, {
            method: "post",
            body: data,
          })
            .then((response) => {
              if (!response.ok) {
                throw Error(response.statusText);
              }

              // We are reading the *Content-Disposition* header for getting the original filename given from the server
              const header = response.headers.get("Content-Disposition");
              const parts = header.split(";");
              filename = parts[1].split("=")[1].replaceAll('"', "");

              return response.blob();
            })
            .then((blob) => {
              if (blob != null) {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                a.remove();
              }
            })
            .catch(function (error) {
              console.error(error);
              // add bootstrap alert class
              document.getElementById("warning").className =
                "alert alert-warning alert-dismissible fade show";
            });
        } else {
          //event.preventDefault()
          event.stopPropagation();
        }
      },
      { once: true }
    );
  });
}
