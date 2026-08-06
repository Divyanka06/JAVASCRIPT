function markInputValidity(input, isValid) {
    if (!input) return;

    if (isValid) {
        input.style.borderColor = 'rgba(148, 163, 184, 0.45)';
        input.style.boxShadow = 'none';
        input.setAttribute('aria-invalid', 'false');
    } else {
        input.style.borderColor = '#dc2626';
        input.style.boxShadow = '0 0 0 4px rgba(220, 38, 38, 0.15)';
        input.setAttribute('aria-invalid', 'true');
    }
}

function parseNumericValue(input) {
    if (!input) return null;

    const rawValue = input.value.trim();
    if (rawValue === '') return null;

    const numericValue = Number(rawValue);
    return Number.isFinite(numericValue) ? numericValue : null;
}

function determineLetterGrade(percentage) {
    switch (true) {
        case percentage >= 90:
            return 'A+';
        case percentage >= 80:
            return 'A';
        case percentage >= 70:
            return 'B';
        case percentage >= 60:
            return 'C';
        case percentage >= 50:
            return 'D';
        case percentage >= 33:
            return 'Pass';
        default:
            return 'Fail';
    }
}

function getGradeStatus(letterGrade) {
    switch (letterGrade) {
        case 'A+':
        case 'A':
        case 'B':
        case 'C':
        case 'D':
        case 'Pass':
            return 'Passed';
        default:
            return 'Failed';
    }
}

function calculateGrade(event) {
    event.preventDefault();

    const studentNameInput = document.getElementById('studentName');
    const englishInput = document.getElementById('englishMarks');
    const mathInput = document.getElementById('mathMarks');
    const scienceInput = document.getElementById('scienceMarks');
    const historyInput = document.getElementById('historyMarks');
    const computerInput = document.getElementById('computerMarks');

    const studentName = studentNameInput.value.trim();
    const marks = [
        parseNumericValue(englishInput),
        parseNumericValue(mathInput),
        parseNumericValue(scienceInput),
        parseNumericValue(historyInput),
        parseNumericValue(computerInput)
    ];

    const message = document.getElementById('message');
    const result = document.getElementById('result');

    const studentValid = studentName.length > 0;
    const marksValid = marks.every(mark => mark !== null && Number.isInteger(mark) && mark >= 0 && mark <= 100);

    markInputValidity(studentNameInput, studentValid);
    [englishInput, mathInput, scienceInput, historyInput, computerInput].forEach((input, index) => {
        const mark = marks[index];
        markInputValidity(input, mark !== null && Number.isInteger(mark) && mark >= 0 && mark <= 100);
    });

    if (!studentValid || !marksValid) {
        message.textContent = 'Please correct the highlighted fields before calculating the grade.';
        message.style.color = '#b91c1c';
        result.innerHTML = '';
        return;
    }

    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (totalMarks / (marks.length * 100)) * 100;
    const letterGrade = determineLetterGrade(percentage);
    const status = getGradeStatus(letterGrade);

    message.textContent = 'Grade calculated successfully.';
    message.style.color = '#0f172a';
    result.innerHTML = `
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Total Marks:</strong> ${totalMarks} / ${marks.length * 100}</p>
        <p><strong>Percentage:</strong> ${percentage.toFixed(2)}%</p>
        <p><strong>Grade:</strong> ${letterGrade}</p>
        <p><strong>Status:</strong> ${status}</p>
    `;
}

function resetForm() {
    document.getElementById('gradeForm').reset();

    const message = document.getElementById('message');
    const result = document.getElementById('result');
    const inputs = document.querySelectorAll('input');

    inputs.forEach((input) => {
        markInputValidity(input, true);
    });

    message.textContent = 'Enter marks to get the student\'s grade.';
    message.style.color = '#475569';
    result.innerHTML = '';
}

document.getElementById('gradeForm').addEventListener('submit', calculateGrade);
document.getElementById('resetBtn').addEventListener('click', resetForm);
window.addEventListener('DOMContentLoaded', () => {
    const message = document.getElementById('message');
    message.textContent = 'Enter marks to get the student\'s grade.';
    message.style.color = '#475569';
});
