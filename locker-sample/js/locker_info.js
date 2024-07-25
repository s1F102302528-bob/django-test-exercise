let BASE_URL = "https://edu-iot.iniad.org/api/v1";

function displayLockerPosition(result) {
  
}

function displayIccardInformation(result) {
  let status = getElementById("iccard-results");
  let id = getElementById("iccard-id");
  let comment = getElementById("iccard-comment");

  status.textContent = result.description;
  if (result.status === "success") {
    id = result.iccardId;
    comment = result.iccardComment;
  } else {
    id = none;
    comment = none;
  }
}

function getLockerPosition() {}

function getRegisteredIccard() {
  let userid = document.getElementById("iniad-id").value;
  let userpw = document.getElementById("iniad-pw").value;
  let url = BASE_URL + "/iccards";

  callRegisteredIccardAPI(url, GET, userid, userpw, displayIccardInformation);
}
