function calcularIMC(){

    console.log("hola");
    const peso = Number(document.getElementById("input-peso").value);
    const altura = Number(document.getElementById("input-altura").value);
    let etiqueta = document.getElementById("mensaje-salida");

    // fórmula del IMC: peso / altura(al cuadrado)
    // const imc = Math.round((peso / altura ** 2)*100)/100;
    const imc = peso / altura ** 2;
    // const roundedBmi = Math.round(imc * 100) / 100;
    const roundedBmi = imc.toFixed(2);
    
    console.log(imc);
    console.log(roundedBmi);

    if (imc < 18.5) {
        console.log("Delgadez");
        etiqueta.textContent = `Tu IMC es ${roundedBmi}: Delgadez 🦴`;
        etiqueta.style.color = "blue";
    } else if (imc <= 25) {
        console.log("Saludable");
        etiqueta.textContent = `Tu IMC es ${roundedBmi}: Saludable ✅`;
        etiqueta.style.color = "green";
    } else if (imc < 30) {
        console.log("Sobrepeso");
        etiqueta.textContent = `Tu IMC es ${roundedBmi}: Sobrepeso ⚠️`;
        etiqueta.style.color = "orange";
    } else {
        console.log("Obeso");
        etiqueta.textContent = `Tu IMC es ${roundedBmi}: Obeso 🚨`;
        etiqueta.style.color = "red";
    }


}


function calculateBMI() {
    const heightInput = document.getElementById("input-altura");
    const heightUnits = document.getElementById("heightunits").value;
    const weightInput = document.getElementById("weight");
    const weightUnits = document.getElementById("weightunits").value;

    const rawHeight = heightInput.value.trim();
    const rawWeight = weightInput.value.trim();

    if (rawHeight === "" || rawWeight === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fields are blank. Please enter data."
        });

        return;
    }

    let height = Number(rawHeight);
    let weight = Number(rawWeight);

    if (!Number.isFinite(height) || !Number.isFinite(weight) || height <= 0 || weight <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid height and weight values."
        });

        return;
    }

    if (heightUnits === "inches") {
        height /= 39.3700787;
    }

    if (weightUnits === "lb") {
        weight /= 2.20462;
    }

    const bmi = weight / height ** 2;
    const roundedBmi = Math.round(bmi * 100) / 100;

    document.getElementById("output").innerText = roundedBmi;

    const comment = document.getElementById("comment");
    const styleElem = getResultStyleElement();

    if (roundedBmi < 18.5) {
        comment.innerText = "Delgadez";
        updateResultStyles(styleElem, "#e74c3c", "#c0392b");
    } else if (roundedBmi <= 25) {
        comment.innerText = "Saludable";
        updateResultStyles(styleElem, "#2ecc71", "#27ae60");
    } else if (roundedBmi < 30) {
        comment.innerText = "Sobrepeso";
        updateResultStyles(styleElem, "#f1c40f", "#f39c12");
    } else {
        comment.innerText = "Obeso";
        updateResultStyles(styleElem, "#e74c3c", "#c0392b");
    }
}

function getResultStyleElement() {
    const styleId = "bmi-result-styles";
    let styleElem = document.getElementById(styleId);

    if (!styleElem) {
        styleElem = document.createElement("style");
        styleElem.id = styleId;
        document.head.appendChild(styleElem);
    }

    return styleElem;
}

function updateResultStyles(styleElem, accentColor, backgroundColor) {
    styleElem.textContent = `
        #result_container .toast:before {
            background-color: ${accentColor};
        }

        #result_container .toast__icon {
            background-color: ${accentColor};
        }

        #aa_bmicalculator_container {
            background: ${backgroundColor} !important;
        }
    `;
}
