const form = document.querySelector('form');
const responseToUser = document.getElementById('js-form-response');

form.onsubmit = e => {
    e.preventDefault();

    postData(form.action, form).then( response => {
        if (response.statusCode === 200){
            form.reset();
            displaySuccess(responseToUser);
        }
         else {
            displayFailure(responseToUser);
            console.error("Something went wrong.", response.message)
        }
    }).catch( err => {
        console.error(err)
    });
};

async function postData(url, form) {
    const data = buildRequest(form);
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

function buildRequest(form) {
    const data = {};
    const formElements = Array.from(form);
    formElements.map(input => (data[input.name] = input.value));

    return JSON.stringify(data);
}

function displaySuccess(responseToUser) {
    scrollDown();
    addPadding(responseToUser);
    responseToUser.innerHTML = "Your message has been successfully sent 🎉. We'll be in touch soon!";
    fadeOut(responseToUser);
}

function displayFailure(responseToUser) {
    scrollDown();
    addPadding(responseToUser);
    responseToUser.innerHTML = "Oops. Something went wrong. Please try again later or <a href=\"mailto:contact@avlabels.com\">email us</a>";
}

function scrollDown() {
    window.scrollBy({
        top: 100,
        behavior: "smooth"
    });
}

function addPadding(element) {
    element.setAttribute('style', 'padding: 20px');
}

function fadeOut(element) {
    // TODO: Please remove me in favor for css.
    setTimeout(() => $(element).fadeOut(2500), 10000);
}

function enableButton() {
    $(`:input[type="submit"]`).prop('disabled', false);
}