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

        // Log what our lambda function will receive
        console.log(`Data being sent to the API: ${JSON.stringify(data)}`);

        // Construct HTTP request
        let xhr = new XMLHttpRequest();
        xhr.open(form.method, form.action, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.withCredentials = false;

        // Send collected data as JSON
        xhr.send(JSON.stringify(data));

        // Callback function
        xhr.onloadend = response => {
            if (response.target.status === 200) {
                // The form submission was successful
                console.log("Success")
                form.reset();
                addPadding();
                formResponse.innerHTML = "You're message has been successfully delivered 🎉. We'll be in touch soon!";
                fadeOut();
            } else {
                // The form submission failed
                console.log("Response code: ", response.target.status)
                formResponse.innerHTML = 'Something went wrong';
                console.error(JSON.parse(response.target.response).message);
            }
        };
    };
})();

function addPadding() {
    responseMessage.setAttribute('style', 'padding: 20px');
}

function fadeOut() {
    setTimeout( () => $(responseMessage).fadeOut(2500), 7500);
}