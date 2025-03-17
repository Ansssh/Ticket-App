document.addEventListener("DOMContentLoaded", () => {
    const fname = document.getElementById("s-heading-inn");
    const fmail = document.getElementById("heading-description-inn");
    const profileImg = document.getElementById("user-photo"); 
    const githubUser = document.getElementById("github-username");
    const lname = document.getElementById("user-name");

    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedProfilePic = localStorage.getItem("img");
    const storedGit = localStorage.getItem("git");

    if (storedName) {
        fname.textContent = storedName + "!"; 
        document.querySelector(".name-small").textContent =  storedName + "!";     
        lname.textContent = storedName;
    } else {
        fname.textContent = "Capt'n!"; 
        lname.textContent = "Captaiiinn";
    }
    if (storedEmail) {
        fmail.textContent = storedEmail;
        document.querySelector(".mail-small").textContent = storedEmail;
    } else {
        fmail.textContent = "error404@not.found"
    }
    if (storedGit) {
        githubUser.textContent = "@" + storedGit;
    } else {
        githubUser.textContent = "@surrealMan04"
    }

    const ticket = document.getElementById("ticket-no");
    ticket.textContent = "#" +  Math.round(Math.random() * 100000);
    
    
    if (storedProfilePic) {
        profileImg.src = storedProfilePic; 
    }


    function copyText() {
        const text = "Hello, this is the text to share!";
        navigator.clipboard.writeText(text)
          .then(() => alert("Text copied! Paste it in any app."))
          .catch(err => console.error("Failed to copy:", err));
    }

    const shareBtn = document.getElementById("share");
    shareBtn.addEventListener("click", copyText);

    const homeBtn = document.getElementById("home");
    homeBtn.addEventListener("click", ()=>{
        localStorage.clear();
        window.location.href = "/index.html"
    })
});
