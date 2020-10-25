(() => {
    const form = document.querySelector('form');
    const responseToUser = document.getElementById('js-form-response');

    form.onsubmit = e => {
        e.preventDefault();

        const requestBody = createRequest(form);

        let xhr = initializeAsyncRequest(form.method, form.action)

        xhr.send(requestBody);

        // Callback function. Take the response data from the send() and do something
        xhr.onloadend = response => {
            if (response.target.status === 200) {
                form.reset();
                displaySuccess(responseToUser)
                console.log("Message successfully sent. 💪🏾")
            } else {
                displayFailure(responseToUser);
                console.error(JSON.parse(response.target.response).message);
            }
        };
    };
})();

function createRequest(form) {
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    return JSON.stringify(data);
}

function initializeAsyncRequest(method, url) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false;

    return xhr;
}

function displaySuccess(responseToUser) {
    addPadding(responseToUser);
    responseToUser.innerHTML = "Your message has been successfully sent 🎉. We'll be in touch soon!";
    fadeOut(responseToUser);
}

function displayFailure(responseToUser) {
    addPadding(responseToUser);
    responseToUser.innerHTML = "Oops. Something went wrong. Please try again later or <a href=\"mailto:contact@avlabels.com\">email us</a>";
}

function addPadding(element) {
    element.setAttribute('style', 'padding: 20px');
}

function fadeOut(element) {
    setTimeout(() => $(element).fadeOut(2500), 10000);
}

function enableButton() {
    $(`:input[type="submit"]`).prop('disabled', false);
}