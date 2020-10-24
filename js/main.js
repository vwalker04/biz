const responseMessage = document.getElementById('js-form-response');

(() => {
    const form = document.querySelector('form');
    const formResponse = document.getElementById('js-form-response');

    form.onsubmit = e => {
        e.preventDefault();

        // Prepare data to send
        const data = {};
        const formElements = Array.from(form);
        formElements.map(input => (data[input.name] = input.value));

        const dataToSend = JSON.stringify(data);
        // Log what our lambda function will receive
        console.log(`Data being sent to the API: ${dataToSend}`);

        // Construct HTTP request
        let xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = false;

        // Send collected data as JSON
        xhr.send(dataToSend);

        // Callback function. Take the response data from the send() and do something
        xhr.onloadend = response => {
            if (response.target.status === 200) {
                // The form submission was successful
                form.reset();
                addPadding();
                formResponse.innerHTML = "You're message has been successfully delivered 🎉. We'll be in touch soon!";
                fadeOut();
                console.log("Successfully send message. 💪🏾")
            } else {
                // The form submission failed
                addPadding();
                formResponse.innerHTML = "Oops. Something went wrong. Please try again later or <a href=\"mailto:contact@avlabels.com\">email us</a>";
                console.error(JSON.parse(response.target.response).message);
            }
        };
    };
})();

function addPadding() {
    responseMessage.setAttribute('style', 'padding: 20px');
}

function fadeOut() {
    setTimeout(() => $(responseMessage).fadeOut(2500), 10000);
}

function enableButton() {
    $(`:input[type="submit"]`).prop('disabled', false);
}
