const msg = document.getElementById("msg");

msg.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;



  fetch("http://localhost:https://be-semarang-32-production.up.railway.app/feedback/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  }).then(response => {
    if(response.ok){
      alert("MESSAGE SENT");
    } else{
      alert("MESSAGE NOT SENT");
    }
  })
  .catch((error) => {
    alert(`ERROR: ${error.message}`);
  });

});