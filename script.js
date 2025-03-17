const form = document.getElementById('forum');


const imgLabel = document.getElementById('true-label');
const userImgPlace = document.getElementById('upload-img');
const uploadDescription = document.getElementById('upload-desc');
const funcButtons = document.getElementById('func-buttons');
const removeImageBtn = document.getElementById('rem-img');
const changeImageBtn = document.getElementById('change-img');
const img = document.getElementById('img');
const imgInfoPanel = document.getElementById('img-info');
const imgInfoIco = document.getElementById('img-info-img');
const imgInfoDesc = document.getElementById('img-info-desc');

const namee = document.getElementById('name');

const mail = document.getElementById('email');
const mailInfoPanel = document.getElementById('mail-info');
const mailInfoIco = document.getElementById('mail-info-img');
const mailInfoDesc = document.getElementById('mail-info-desc');

const git = document.getElementById('github');
const gitInfoPanel = document.getElementById('git-info');
const gitInfoIco = document.getElementById('git-info-img');
const gitInfoDesc = document.getElementById('git-info-desc');

const submitBtn = document.getElementById('submit-btn');

function validateMail(email) {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
}


function validateGitHubUsername(username) {
    const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (typeof username !== 'string') {
        return false;
    }

    return usernameRegex.test(username);
}


function validateImage(imgFile){
    if(imgFile.size > 500 * 1024 || !imgFile.type.startsWith('image/')){
        return false;
    }else{
        return true;
    }
}

img.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        if (file.type.startsWith('image/')) {
            if (file.size <= 500 * 1024) {
                imgInfoPanel.classList.toggle("flex");
                imgInfoPanel.classList.toggle("hidden");
                
                uploadDescription.classList.toggle("hidden");
                funcButtons.classList.toggle("hidden");


                const reader = new FileReader();
                reader.onload = function (e) {
                    userImgPlace.src = e.target.result;
                    localStorage.setItem("img", e.target.result);
                    userImgPlace.style.height = "10em";
                }

                reader.readAsDataURL(file);

            } else {
                errorEncounter(imgInfoIco, imgInfoDesc, 'Image size must be less than 500KB.')
                img.value = '';
            }
        } else {
            errorEncounter(imgInfoIco, imgInfoDesc, 'Please select an image file.')
            img.value = '';
        }
    }
});

removeImageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    img.value = ''; 
    userImgPlace.src = "assets/images/icon-upload.svg"; 
    userImgPlace.style.height = "auto";
    uploadDescription.classList.remove("hidden");
    funcButtons.classList.add("hidden");
});




mail.addEventListener("change", (event) => {
    const emailInput = event.target;
    const email = emailInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(email)) {
        mailInfoPanel.classList.toggle("hidden");
        mailInfoPanel.classList.toggle("flex");
        errorEncounter(mailInfoIco, mailInfoDesc, "Enter Correct Mail Please!");
    } else {
        if (mailInfoPanel.classList.contains("flex")) {
            mailInfoPanel.classList.toggle("hidden");
            mailInfoPanel.classList.toggle("flex");
        }
    }
})

git.addEventListener("change", (e)=>{
    const gitInput = e.target;
    const git = gitInput.value;

    const gitRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (!gitRegex.test(git)) {
        gitInfoPanel.classList.remove("hidden");
        gitInfoPanel.classList.add("flex");
        errorEncounter(gitInfoIco, gitInfoDesc, "Enter a valid GitHub username!");
    } else {
        gitInfoPanel.classList.add("hidden");
    }
    
})

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(!validateMail(mail.value) || !validateGitHubUsername(git.value) || namee.value.trim().length === 0){
        alert("something is not right!");
    }else{
        localStorage.setItem("name", namee.value.trim());
        localStorage.setItem("email", mail.value);
        localStorage.setItem("git", git.value);
        window.location.href = "/success/success.html";
    }
})

function errorEncounter(ico, desc, data) {
    ico.style.filter = "invert(13%) sepia(99%) saturate(7492%) hue-rotate(3deg) brightness(98%) contrast(117%)";
    desc.style.color = "red";
    desc.textContent = data;
    return;
}

