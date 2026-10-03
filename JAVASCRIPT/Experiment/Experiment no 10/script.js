let students = [
    {
        "id": 24070521149,
        "name": "Divyanka Chakole",
        "course": "CSE",
        "year": 3
    },
    {
        "id": 24070521174,
        "name": "Ayushi Nasre",
        "course": "CSE",
        "year": 3
    },
    {
        "id": 24070521153,
        "name": "Disha Devgirkar",
        "course": "IT",
        "year": 2
    },
    {
        "id": 24070521141,
        "name": "Ananya Prasad",
        "course": "AIML",
        "year": 3
    },
    {
        "id": 24070521161,
        "name": "Riya Patil",
        "course": "CSE",
        "year": 4
    }
];


/* --------------------------------
   Common Display Function
-------------------------------- */

function displayData(data, sourceName) {

    const table = document.getElementById("dataTable");

    table.innerHTML = "";


    /* Statistics */

    document.getElementById("totalRecords").textContent =
        data.length;

    document.getElementById("displayedRecords").textContent =
        data.length;

    document.getElementById("source").textContent =
        sourceName;

    document.getElementById("recordBadge").textContent =
        `${data.length} Records`;


    /* No records */

    if (data.length === 0) {

        table.innerHTML = `
            <tr class="empty-row">

                <td colspan="4">

                    <div class="empty-state">

                        <div class="empty-icon">
                            !
                        </div>

                        <h3>
                            No Records Found
                        </h3>

                        <p>
                            No matching data is available.
                        </p>

                    </div>

                </td>

            </tr>
        `;

        return;
    }


    /* Display records */

    data.forEach(student => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                #${student.id}
            </td>

            <td>
                <strong>
                    ${student.name}
                </strong>
            </td>

            <td>
                ${student.course}
            </td>

            <td>
                Year ${student.year}
            </td>

        `;


        table.appendChild(row);

    });

}


/* --------------------------------
   FETCH API
-------------------------------- */

document
    .getElementById("fetchBtn")
    .addEventListener("click", function () {


        setStatus("Loading...", true);


        fetch("data.json")

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Could not load JSON file"
                    );

                }

                return response.json();

            })


            .then(data => {

                students = data;

                displayData(
                    data,
                    "Fetch API"
                );

                setStatus(
                    "Connected",
                    true
                );

            })


            .catch(error => {

                console.error(error);

                setStatus(
                    "Error",
                    false
                );

                showError();

            });

    });


/* --------------------------------
   jQuery $.getJSON()
-------------------------------- */

document
    .getElementById("jqueryBtn")
    .addEventListener("click", function () {


        setStatus(
            "Loading...",
            true
        );


        $.getJSON("data.json")

            .done(function (data) {

                students = data;

                displayData(
                    data,
                    "jQuery"
                );

                setStatus(
                    "Connected",
                    true
                );

            })


            .fail(function () {

                setStatus(
                    "Error",
                    false
                );

                showError();

            });

    });


/* --------------------------------
   Search
-------------------------------- */

document
    .getElementById("searchInput")
    .addEventListener("input", function () {


        const searchValue =
            this.value.toLowerCase();


        const filteredData =
            students.filter(student => {


                return (

                    student.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.course
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    student.id
                        .toString()
                        .includes(searchValue)

                    ||

                    student.year
                        .toString()
                        .includes(searchValue)

                );

            });


        displayData(
            filteredData,
            "Filtered"
        );

    });


/* --------------------------------
   Status
-------------------------------- */

function setStatus(message, success) {


    document
        .getElementById("statusText")
        .textContent = message;


    const dot =
        document.getElementById("statusDot");


    if (success) {

        dot.style.background =
            "#22c55e";

        dot.style.boxShadow =
            "0 0 12px #22c55e";

    }

    else {

        dot.style.background =
            "#ef4444";

        dot.style.boxShadow =
            "0 0 12px #ef4444";

    }

}


/* --------------------------------
   Error Message
-------------------------------- */

function showError() {


    const table =
        document.getElementById("dataTable");


    table.innerHTML = `

        <tr class="empty-row">

            <td colspan="4">

                <div class="empty-state">

                    <div class="empty-icon">
                        !
                    </div>

                    <h3>
                        Unable to Load Data
                    </h3>

                    <p>
                        Make sure data.json exists
                        and the project is running
                        through a local server.
                    </p>

                </div>

            </td>

        </tr>

    `;

}