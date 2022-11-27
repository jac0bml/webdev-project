$(document).ready(function () {
    // Listen for form submission
    document.getElementById("form").addEventListener("submit", function (e) {
        e.preventDefault(); // prevent default submission

        const form = e.target;
        const username = getFormElement(form, "name");
        const email = getFormElement(form, "email");
        const message = getFormElement(form, "message");

        // Some data must be submitted to print anything.
        if (username === "no submission" && email === "no submission" && message === "no submission") {
            alert("You must enter some data to submit this form");
        } else {
            console.log("========== Form Submission ==========");
            console.log("\tUsername: " + username);
            console.log("\tEmail: " + email);
            console.log("\tMessage: " + message);
            alert("Thanks for reaching out!")
        }
    });

    // Get park data from NPS.gov to populate Oregon's Nationsl Parks modal
    $.getJSON({
        // Not great to store API key in JavaScript. If was using an actual web server, this would be server-side
        url: "https://developer.nps.gov/api/v1/parks?stateCode=OR&api_key=GAgUhWvkL6n49EtZZdanGdOZu7vwHQzRZP30XKfz",
        success: function (result) {
            // Create initial unordered list element
            let ul = document.createElement("ul");

            // Loop through all parks in Oregon
            $.each(result.data, function (i, obj) {
                // Create list item
                let li = window.document.createElement("li");

                // Create link, use NPS.gov URL and open in new tab
                let ahref = window.document.createElement("a");
                ahref.href = obj.url;
                ahref.target = "_blank";
                ahref.textContent = obj.fullName;

                // Add link to list item, then list item to unordered list
                li.append(ahref);
                ul.append(li);
            });

            // Add completed list to modal
            $("#nationalParksModalText").append(ul);
        }
    })
});


/**
 * Gets the specified form element's value from the specified form.
 * @param form The form to get element value(s) from.
 * @param element The element name to get the value of.
 * @returns {string|*} Value of the specified element name, or "no submission" if {@code null} or empty.
 */
function getFormElement(form, element) {
    const value = form.elements[element].value;

    if (isNullOrEmpty(value)) {
        return "no submission";
    }
    return value;
}

/**
 * Checks if the specified value is null or empty.
 * @param value The value to check.
 * @returns {boolean} {@code true} if the specified value is {@code null} or empty, {@code false} otherwise.
 */
function isNullOrEmpty(value) {
    return value === null || value === "";
}