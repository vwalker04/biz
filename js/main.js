const form = document.querySelector('form');
const responseToUser = document.getElementById('js-form-response');

form.onsubmit = e => {
    e.preventDefault();

    postData(form.action, form).then( response => {
        console.log("response: ", response);
        if (response.statusCode === 200){
            form.reset();
            displaySuccess(responseToUser);
        } else {
            displayFailure(responseToUser);
            console.error("Something went wrong.", response.message)
        }
    });
};

async function postData(url, form) {
    const data = createRequest(form);
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: data
    })
    return response.json();
}

function createRequest(form) {
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    return JSON.stringify(data);
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