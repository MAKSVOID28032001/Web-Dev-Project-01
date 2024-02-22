function formdata(event) {
    event.preventDefault();
    let sid = document.getElementById("CANID").value;
    let srol = document.getElementById("CANROLL").value;
    let sname = document.getElementById("CANNAME").value;
    let smail = document.getElementById("CANMAIL").value;
    let scity = document.getElementById("CITY").value;
    let sstate = document.getElementById("STATE").value;
    let scountry = document.getElementById("COUNTRY").value;
    let sdate = document.getElementById("BIRTH").value;
    let sbrc = document.getElementById("BRC").value;
    let OBJ = {
        sid, srol, sname, smail, scity, sstate, scountry, sdate, sbrc,
        sgender1: funcgender1(), sgender2: funcgender2(), sgender3: funcgender3(),
        sservice: funcservice()
    };
    ULADDLI(OBJ);
    document.getElementById("CANID").value = "";
    document.getElementById("CANROLL").value = "";
    document.getElementById("CANNAME").value = "";
    document.getElementById("CANMAIL").value = "";
    document.getElementById("CITY").value = "";
    document.getElementById("STATE").value = "";
    document.getElementById("COUNTRY").value = "";
    document.getElementById("BIRTH").value = "";
    document.getElementById("BRC").value = "";
    document.getElementById("MLE").checked = false;
    document.getElementById("FLE").checked = false;
    document.getElementById("NOT").checked = false;
    document.getElementById("LIB").checked = false;
    document.getElementById("HSTL").checked = false;
    document.getElementById("CLB").checked = false;
}
function funcgender1() {
    let gender;
    if (document.getElementById("MLE").checked === true) {
        gender = "Male";
        document.getElementById("FLE").checked = false;
        document.getElementById("NOT").checked = false;
    }
    return gender;
}
function funcgender2() {
    let gender;
    if (document.getElementById("FLE").checked === true) {
        gender = "Female";
        document.getElementById("MLE").checked = false;
        document.getElementById("NOT").checked = false;
    }
    return gender;
}
function funcgender3() {
    let gender;
    if (document.getElementById("NOT").checked === true) {
        gender = "Privacy";
        document.getElementById("MLE").checked = false;
        document.getElementById("FLE").checked = false;
    }
    return gender;
}
function funcservice() {
    let service;
    if (document.getElementById("LIB").checked === true &&
        document.getElementById("HSTL").checked === true &&
        document.getElementById("CLB").checked === true) {
        service = "Library, Hostel, & Club Services";
    }
    else if (
        document.getElementById("LIB").checked === true &&
        document.getElementById("HSTL").checked === true &&
        document.getElementById("CLB").checked === false
    ) {
        service = "Library, & Hostel Serices";
    }
    else if (
        document.getElementById("LIB").checked === true &&
        document.getElementById("HSTL").checked === false &&
        document.getElementById("CLB").checked === true
    ) {
        service = "Library, & Club Services";
    }
    else if (
        document.getElementById("LIB").checked === false &&
        document.getElementById("HSTL").checked === true &&
        document.getElementById("CLB").checked === true
    ) {
        service = "Hostel, & Club Services";
    }
    else if (
        document.getElementById("LIB").checked === true &&
        document.getElementById("HSTL").checked === false &&
        document.getElementById("CLB").checked === false
    ) {
        service = "Library Service";
    }
    else if (
        document.getElementById("LIB").checked === false &&
        document.getElementById("HSTL").checked === true &&
        document.getElementById("CLB").checked === false
    ) {
        service = "Hostel Service";
    }
    else if (
        document.getElementById("LIB").checked === false &&
        document.getElementById("HSTL").checked === false &&
        document.getElementById("CLB").checked === true
    ) {
        service = "Club Service";
    }
    return service;
}
function ULADDLI(OBJ) {
    let filtercopy = {};
    for (let key in OBJ) {
        if (OBJ[key] !== undefined) {
            filtercopy[key] = OBJ[key];
        }
    }
    let UList = document.getElementById("ULL");
    let List = document.createElement('li');
    List.classList.add("LI");
    let Pr = document.createElement('p');
    Pr.classList.add("PLI");
    let displayedValues = Object.values(filtercopy).filter(values => values !== undefined).join(' &nbsp; ');
    Pr.innerHTML = displayedValues;

    let delt = document.createElement('button');
    delt.textContent = "Delete";
    delt.classList.add("DLT");
    delt.addEventListener("click", function (event) {
        let listitme = event.target.parentElement;
        let email = filtercopy.smail;
        localStorage.removeItem(email);
        UList.removeChild(listitme);
    });

    let edit = document.createElement('button');
    edit.textContent = "Edit";
    edit.classList.add("EDT");
    edit.addEventListener("click", function () {
        let email = filtercopy.smail;
        let DataString = localStorage.getItem(email);
        let data = JSON.parse(DataString);
        console.log("Data : ", data);

        document.getElementById("CANID").value = data.sid;
        document.getElementById("CANROLL").value = data.srol;
        document.getElementById("CANNAME").value = data.sname;
        document.getElementById("CANMAIL").value = data.smail;
        document.getElementById("CITY").value = data.scity;
        document.getElementById("STATE").value = data.sstate;
        document.getElementById("COUNTRY").value = data.scountry;
        document.getElementById("BIRTH").value = data.sdate;
        document.getElementById("BRC").value = data.sbrc;

        if ('sgender1' in data) {
            document.getElementById("MLE").checked = true;
        } else if ('sgender2' in data) {
            document.getElementById("FLE").checked = true;
        } else if ('sgender3' in data) {
            document.getElementById("NOT").checked = true;
        }

        if (data.sservice === "Library, Hostel, & Club Services") {
            document.getElementById("LIB").checked = true;
            document.getElementById("HSTL").checked = true;
            document.getElementById("CLB").checked = true;
        } else if (data.sservice === "Library, & Hostel Serices") {
            document.getElementById("LIB").checked = true;
            document.getElementById("HSTL").checked = true;
        } else if (data.sservice === "Library, & Club Services") {
            document.getElementById("CLB").checked = true;
            document.getElementById("LIB").checked = true;
        } else if (data.sservice === "Hostel, & Club Services") {
            document.getElementById("HSTL").checked = true;
            document.getElementById("CLB").checked = true;
        } else if (data.sservice === "Library Service") {
            document.getElementById("LIB").checked = true;
        } else if (data.sservice === "Hostel Service") {
            document.getElementById("HSTL").checked = true;
        } else if (data.sservice === "Club Service") {
            document.getElementById("CLB").checked = true;
        }

        localStorage.removeItem(email);
        UList.removeChild(List);
    });

    List.appendChild(Pr);
    List.appendChild(edit);
    List.appendChild(delt);
    UList.appendChild(List);
    localStorage.setItem(filtercopy.smail, JSON.stringify(filtercopy));
}
/*CRUD Operation after refreshing the page*/
document.addEventListener("DOMContentLoaded",()=>{
    let UList = document.getElementById('ULL');
    for(let key in localStorage){
        if(localStorage.hasOwnProperty(key)){
            let storedData = localStorage.getItem(key);
            let data = JSON.parse(storedData);

            let List = document.createElement('li');
            List.classList.add("LI");
            let Pr = document.createElement('p');
            Pr.classList.add("PLI");
            let displayedValues = Object.values(data).filter(values => values !== undefined).join(' &nbsp; ');
            Pr.innerHTML = displayedValues;
        
            let delt = document.createElement('button');
            delt.textContent = "Delete";
            delt.classList.add("DLT");
            delt.addEventListener("click", function (event) {
                let listitme = event.target.parentElement;
                let email = data.smail;
                localStorage.removeItem(email);
                UList.removeChild(listitme);
            });
        
            let edit = document.createElement('button');
            edit.textContent = "Edit";
            edit.classList.add("EDT");
            edit.addEventListener("click", function () {
                let email = data.smail;
                let DataString = localStorage.getItem(email);
                let data1 = JSON.parse(DataString);
                console.log("Data : ", data1);
        
                document.getElementById("CANID").value = data1.sid;
                document.getElementById("CANROLL").value = data1.srol;
                document.getElementById("CANNAME").value = data1.sname;
                document.getElementById("CANMAIL").value = data1.smail;
                document.getElementById("CITY").value = data1.scity;
                document.getElementById("STATE").value = data1.sstate;
                document.getElementById("COUNTRY").value = data1.scountry;
                document.getElementById("BIRTH").value = data1.sdate;
                document.getElementById("BRC").value = data1.sbrc;
        
                if ('sgender1' in data1) {
                    document.getElementById("MLE").checked = true;
                } else if ('sgender2' in data1) {
                    document.getElementById("FLE").checked = true;
                } else if ('sgender3' in data1) {
                    document.getElementById("NOT").checked = true;
                }
        
                if (data1.sservice === "Library, Hostel, & Club Services") {
                    document.getElementById("LIB").checked = true;
                    document.getElementById("HSTL").checked = true;
                    document.getElementById("CLB").checked = true;
                } else if (data1.sservice === "Library, & Hostel Serices") {
                    document.getElementById("LIB").checked = true;
                    document.getElementById("HSTL").checked = true;
                } else if (data1.sservice === "Library, & Club Services") {
                    document.getElementById("CLB").checked = true;
                    document.getElementById("LIB").checked = true;
                } else if (data1.sservice === "Hostel, & Club Services") {
                    document.getElementById("HSTL").checked = true;
                    document.getElementById("CLB").checked = true;
                } else if (data1.sservice === "Library Service") {
                    document.getElementById("LIB").checked = true;
                } else if (data1.sservice === "Hostel Service") {
                    document.getElementById("HSTL").checked = true;
                } else if (data1.sservice === "Club Service") {
                    document.getElementById("CLB").checked = true;
                }
        
                localStorage.removeItem(email);
                UList.removeChild(List);
            });
        
            List.appendChild(Pr);
            List.appendChild(edit);
            List.appendChild(delt);
            UList.appendChild(List);
        }
    }
});