let tbody = document.getElementById("tbody")
let add = document.getElementById("add")
let boolen = true;

const allowNumbers = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };
  
  const allowLetter = (e) => {
    e.target.value = e.target.value.replace(/[^a-z\s]/gi, "");
  };


add.addEventListener("click", () => {
    if (boolen) {
        let tr = document.createElement("tr")
        let listNumTd = document.createElement("td")
        listNumTd.innerText;
        let nameTd = document.createElement("td")
        let nameInput = document.createElement("input")
        nameInput.setAttribute("type", "text")
        nameInput.setAttribute("placeholder", "Write Nour Name")
        nameInput.addEventListener("input", allowLetter)
        nameTd.append(nameInput)
        let surnameTd = document.createElement("td")
        let surnameInput = document.createElement("input")
        surnameInput.addEventListener("input", allowLetter)
        surnameInput.setAttribute("type", "text")
        surnameInput.setAttribute("placeholder", "Write Nour Surname")
        surnameTd.append(surnameInput)

        let salaryTd = document.createElement("td")
        let salaryInput = document.createElement("input")
        salaryInput.addEventListener("input", allowNumbers)
        salaryInput.setAttribute("type", "number")
        salaryInput.setAttribute("placeholder", "Amount of Salary")
        salaryTd.append(salaryInput)

        let operTd = document.createElement("td")
        let cancel = document.createElement("button")
        cancel.innerText = "Cancel"
        cancel.classList.add("cancel")
        cancel.addEventListener("click", cancelFunction)
        let save = document.createElement("button")
        save.innerText = "Save"
        save.classList.add("save")
        save.addEventListener("click", saveFunction)
        operTd.append(cancel, save)

        tr.append(listNumTd, nameTd, surnameTd, salaryTd, operTd)
        tbody.append(tr);
        boolen = false;
    }
    else {
        alert("Please fill blank")
    }
    makeList();

})

const cancelFunction = (e) => {
    let check = confirm("Delete ?")
    if (check) {
        e.target.closest("tr").remove()
        boolen = true;
    }
    makeList();
}

const saveFunction = (e) => {
    if (checkWordCount()) {
        let inputs = document.querySelectorAll("input");


        [...inputs].map((input) => {
            input.parentElement.innerText = input.value
        })
        boolen = true;
        e.target.innerText = "Edit"
        e.target.previousElementSibling.innerText = "Delete"
        e.target.classList.remove("save")
        e.target.classList.add("edit")
        e.target.addEventListener("click", editFunction)

    }

}

const editFunction = (e) => {

    let tr = e.target.closest("tr");
    let allTd = [...tr.querySelectorAll("td")];
    allTd.shift();
    allTd.pop();

    allTd.map((index) => {
        let text = index.innerText;
        let input = document.createElement("input");
        input.setAttribute("type", "text ")
        input.value = text
        index.innerText = ""
        index.append(input)

    })
    e.target.classList.remove("edit")
    e.target.innerText = "Save"
    e.target.removeEventListener("click", editFunction)
    e.target.addEventListener("click", saveFunction)
    e.target.classList.add("save")

}


const makeList = () => {
    let rows = [...document.querySelectorAll("tbody tr")];
    rows.map((x, y) => {
        x.querySelector("td").innerText = y + 1;
    });
};


const checkWordCount = () => {
    let result = true;
    let inputs = [...document.querySelectorAll("input")];
    inputs.map((a) => {
        a.classList.remove("error");
        if (a.value.length < 3) {
            result = false;
            a.classList.add("error");
        }
    });
    return result;
};