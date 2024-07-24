let BASE_URL = "https://edu-iot.iniad.org/api/v1";

function makeBasicAuth(userid, userpw) {
  let token = userid + ":" + userpw;
  let hash = btoa(token);
  return "Basic " + hash;
}

function handleErrors(response) {
  if (response.status >= 500 && response.status <= 599) {
    let error = {
      status: response.status,
      statusText: response.statusText,
    };
    throw error;
  }
  return response.json();
}

function callLockerPositionAPI(url, method, userid, userpw, callback) {
  fetch(url, {
    method: method,
    headers: {
      Authorization: makeBasicAuth(userid, userpw),
    },
  })
    .then(handleErrors)
    .then(function (json) {
      if ("status" in json) {
        if (json.status === "error") {
          let error = {
            status: json.status,
            statusText: json.description,
          };
          throw error;
        }
      }
      callback({
        status: "success",
        description: "Succeeded getting locker information",
        lockerAddress: json.name,
        lockerFloor: json.floor,
      });
    })
    .catch(function (error) {
      if (error.status === 503) {
        callback({
          status: "success",
          description: "Below is dummy data for test purposes",
          lockerAddress: "32XXXX",
          lockerFloor: "3",
        });
      } else {
        callback({
          status: "fail",
          description: "[Error] " + error.statusText,
          lockerAddress: null,
          lockerFloor: null,
        });
      }
    });
}

function displayLockerPositionWhereIOpenedWithoutYourPermission(result) {
  if (result.description === "Succeeded getting locker information") {
    message =
      "Congratulations! By the way, I opened your locker. \nYour locker's address:" +
      result.lockerAddress +
      "\nYour locker's floor:" +
      result.lockerFloor;
  } else {
    message = "Congratulations!";
  }
  alert(message);
  location.href = location.href + "close";
}

function openYourLockerWithoutYourPermission() {
  let userid = document.getElementById("iniad-id").value;
  let userpw = document.getElementById("iniad-pw").value;
  let url = BASE_URL + "/locker/open";

  callLockerPositionAPI(
    url,
    "POST",
    userid,
    userpw,
    displayLockerPositionWhereIOpenedWithoutYourPermission
  );
}
