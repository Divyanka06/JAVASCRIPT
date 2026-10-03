// ================================
// EMAIL VALIDATION
// ================================

function validateEmail() {

    let text = document.getElementById("textInput").value.trim();
    let output = document.getElementById("output");

    // Regular Expression
    let emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (text === "") {

        output.innerHTML = `
            <div class="invalid">
                ⚠ Please enter an email address.
            </div>
        `;

        return;
    }

    if (emailRegex.test(text)) {

        output.innerHTML = `
            <div class="result-section">
                <div class="result-title">Email Validation</div>

                <div class="valid">
                    ✓ Valid Email Address
                </div>

                <p style="margin-top:10px;">
                    ${text}
                </p>
            </div>
        `;

    } else {

        output.innerHTML = `
            <div class="result-section">

                <div class="result-title">
                    Email Validation
                </div>

                <div class="invalid">
                    ✕ Invalid Email Address
                </div>

                <p style="margin-top:10px;">
                    Please enter a valid email such as
                    example@gmail.com
                </p>

            </div>
        `;
    }
}


// ================================
// DATA EXTRACTION
// ================================

function extractData() {

    let text = document.getElementById("textInput").value;

    let output = document.getElementById("output");

    if (text.trim() === "") {

        output.innerHTML = `
            <div class="invalid">
                ⚠ Please enter some text first.
            </div>
        `;

        return;
    }


    // Email Regex
    let emailRegex =
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;


    // Phone Regex
    let phoneRegex =
        /\b(?:\+91[-\s]?)?[6-9]\d{9}\b/g;


    // URL Regex
    let urlRegex =
        /https?:\/\/[^\s]+/g;


    // Extract data
    let emails = text.match(emailRegex) || [];

    let phones = text.match(phoneRegex) || [];

    let urls = text.match(urlRegex) || [];


    output.innerHTML = `

        <div class="result-section">

            <div class="result-title">
                📧 Emails Found
            </div>

            ${
                emails.length
                ? emails.map(e =>
                    `<span class="result-item">${e}</span>`
                  ).join("")
                : "<span>No emails found</span>"
            }

        </div>


        <div class="result-section">

            <div class="result-title">
                📱 Phone Numbers Found
            </div>

            ${
                phones.length
                ? phones.map(p =>
                    `<span class="result-item">${p}</span>`
                  ).join("")
                : "<span>No phone numbers found</span>"
            }

        </div>


        <div class="result-section">

            <div class="result-title">
                🌐 URLs Found
            </div>

            ${
                urls.length
                ? urls.map(u =>
                    `<span class="result-item">${u}</span>`
                  ).join("")
                : "<span>No URLs found</span>"
            }

        </div>

    `;
}


// ================================
// TEXT ANALYSIS
// ================================

function analyzeText() {

    let text = document.getElementById("textInput").value;

    let output = document.getElementById("output");


    if (text.trim() === "") {

        output.innerHTML = `
            <div class="invalid">
                ⚠ Please enter some text first.
            </div>
        `;

        return;
    }


    // String function: length
    let characters = text.length;


    // String + Regex
    let words =
        text.trim().split(/\s+/).length;


    // Regex for sentences
    let sentences =
        text.split(/[.!?]+/)
            .filter(sentence => sentence.trim() !== "")
            .length;


    // Count lines
    let lines =
        text.split("\n").length;


    // Convert to lowercase
    let lowerText =
        text.toLowerCase();


    // Count "the"
    let theMatches =
        lowerText.match(/\bthe\b/g);

    let theCount =
        theMatches ? theMatches.length : 0;


    // Convert to uppercase
    let upperText =
        text.toUpperCase();


    // Reverse text using String functions
    let reversedText =
        text.split("").reverse().join("");


    output.innerHTML = `

        <div class="result-section">

            <div class="result-title">
                📊 Text Statistics
            </div>

            <div class="stats">

                <div class="stat">
                    <div class="stat-number">
                        ${characters}
                    </div>
                    <div class="stat-label">
                        Characters
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-number">
                        ${words}
                    </div>
                    <div class="stat-label">
                        Words
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-number">
                        ${sentences}
                    </div>
                    <div class="stat-label">
                        Sentences
                    </div>
                </div>

                <div class="stat">
                    <div class="stat-number">
                        ${lines}
                    </div>
                    <div class="stat-label">
                        Lines
                    </div>
                </div>

            </div>

        </div>


        <div class="result-section">

            <div class="result-title">
                🔎 Word Analysis
            </div>

            <p>
                The word
                <b>"the"</b>
                appears
                <b>${theCount}</b>
                time(s).
            </p>

        </div>


        <div class="result-section">

            <div class="result-title">
                🔠 Uppercase Text
            </div>

            <div class="result-item">
                ${upperText}
            </div>

        </div>


        <div class="result-section">

            <div class="result-title">
                🔄 Reversed Text
            </div>

            <div class="result-item">
                ${reversedText}
            </div>

        </div>

    `;
}


// ================================
// CLEAR
// ================================

function clearAll() {

    document.getElementById("textInput").value = "";

    document.getElementById("output").innerHTML = `

        <div class="welcome">

            <div class="big-icon">✨</div>

            <h3>Ready to Analyze!</h3>

            <p>
                Enter your text above and select an operation
                to see the results here.
            </p>

        </div>

    `;
}