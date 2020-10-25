(() => {
    const form = document.querySelector('form');
    const responseToUser = document.getElementById('js-form-response');

    form.onsubmit = e => {
        e.preventDefault();

        const requestBody = buildRequest(form);

        let xhr = initializeAsyncRequest(form)

        xhr.send(requestBody);

        // Callback function. Take the response data from the send() and do something
        xhr.onloadend = response => {
            if (response.target.status === 200) {
                form.reset();
                displaySuccess(responseToUser);
                console.log("Message successfully sent. 💪🏾");
            } else {
                displayFailure(responseToUser);
                console.error(JSON.parse(response.target.response).message);
            }
        };
    };
})();

function buildRequest(form) {
    return JSON.stringify(getMapFromForm(form));
}

function getMapFromForm(form) {
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));
    return data;
}

function initializeAsyncRequest(form) {
    let xhr = new XMLHttpRequest();
    xhr.open(form.method, form.url, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.withCredentials = false;
    return xhr;
}

function displaySuccess(element) {
    addPadding(element);
    element.innerHTML = "Your message has been successfully sent 🎉. We'll be in touch soon!";
    fadeOut(element);
}

function displayFailure(element) {
    addPadding(element);
    element.innerHTML = "Oops. Something went wrong. Please try again later or <a href=\"mailto:contact@avlabels.com\">email us</a>";
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

