window.onload = function() {
    const day = document.getElementById("day");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const personalDatas = document.getElementsByTagName("label");
    const error = document.getElementsByClassName("error");
    const resultButton = document.getElementById("button-result");
    const resultDatas = document.getElementsByTagName("span");

    const date = new Date();

    let currentDay = date.getDate();
    let currentMonth = date.getMonth() + 1;
    let currentYear = date.getFullYear();

    const typeOfError = [
        "",
        "Esse campo é necessário",
        "Precisa ser um dia válido",
        "Precisa ser um mês válido",
        "Precisa ser um ano válido",
        "Precisa ser uma data válida",
    ];

    const wichError = (numberOfError, typeOfDate, typeOfError, color) => {
        error[numberOfError].innerHTML = typeOfError;
        personalDatas[numberOfError].style.color = color;
        typeOfDate.style.borderColor = color;
    }

    const leapYear = (day, month, year) => {
        month = month - 1;
        fullDate = new Date(year,month,day);
        if (day == fullDate.getDate() && month == fullDate.getMonth() && year == fullDate.getFullYear()){
            return true;
        } else {
            return false;
        }
    }

    const ageValue = () => {
        let newYear = Math.abs(currentYear - year.value);

        let newMonth = 0;
        if(currentMonth >= month.value) {
            newMonth = currentMonth - month.value;
        } else {
            newYear--;
            newMonth = 12 + currentMonth - month.value;
        }

        let newDay = 0;
        if (currentDay >= day.value) {
            newDay = currentDay - day.value;
        } else {
            newMonth--;
            if(leapYear(day.value, month.value, year.value)) {
                newDay = 30 + currentDay - day.value;
            } else {
                newDay = currentDay - day.value;
            }

            if(newMonth < 0) {
                newMonth = 11;
                newYear--;
            }

            if(newMonth < currentMonth) {
                newDay++;
            }
        }

        resultDatas[0].innerHTML = newYear;
        resultDatas[1].innerHTML = newMonth;
        resultDatas[2].innerHTML = newDay;
    }

    const dayCorrect = () => {
        if(day.value == "") {
            wichError(0, day, typeOfError[1], "#ff5757");
            return false;
        } else if(day.value <= 0 || day.value > 31) {
            wichError(0, day, typeOfError[2], "#ff5757");
            return false;
        } else if(leapYear(day.value, month.value, year.value) == false){
            wichError(0, day, typeOfError[5], "#ff5757");
            return false;
        } else {
            wichError(0, day, typeOfError[0], "");
            return true;
        }
    }

    const monthCorrect = () => {
        if(month.value == "") {
            wichError(1, month, typeOfError[1], "#ff5757");
            return false;
        } else if(month.value <= 0 || month.value > 12) {
            wichError(1, month, typeOfError[3], "#ff5757");
            return false;
        } else if(leapYear(day.value, month.value, year.value) == false){
            wichError(1, month, typeOfError[0], "#ff5757");
            return false;
        } else {
            wichError(1, month, typeOfError[0], "");
            return true;
        }
    }

    const yearCorrect = () => {
        if(year.value == "") {
            wichError(2, year, typeOfError[1], "#ff5757");
            return false;
        } else if(year.value > currentYear) {
            wichError(2, year, typeOfError[4], "#ff5757");
            return false;
        } else if(leapYear(day.value, month.value, year.value) == false){
            wichError(2, year, typeOfError[0], "#ff5757");
            return false;
        } else if(year.value == currentYear && month.value > currentMonth) {
            wichError(1, month, typeOfError[3], "#ff5757");
            return false;
        } else if(year.value == currentYear && month.value == currentMonth && day.value > currentDay) {
            wichError(0, day, typeOfError[2], "#ff5757");
            return false;
        } else {
            wichError(2, year, typeOfError[0], "");
            return true;
        }
    }

    resultButton.addEventListener("click", () => {
        dayCorrect();
        monthCorrect();
        yearCorrect();
        if(dayCorrect() && monthCorrect() && yearCorrect()) {
            ageValue();
        }
    })
}