var input = document.getElementById("input");
input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        authenticate(e.target.value);
    }
});

window.authentication_done = () => {
    if (lightdm.is_authenticated) {
        console.log("Authenticated!");
        lightdm.start_session(lightdm.default_session);
    } else {
        input.value = "";
        input.placeholder = "user";
        input.type = "text";
        input.disabled = false;
        input.focus();
        input.select();
    }
};

window.addEventListener("GreeterReady", () => {
    lightdm.authentication_complete?.connect(() => window.authentication_done());
    input.focus();
    input.select();
    if(input.value) {
      authenticate(input.value);
    }
});

function authenticate(input_text) {
    if(!lightdm.in_authentication || !lightdm.authentication_user) {
        lightdm.authenticate(input_text);
        input.value = "";
        input.type = "password";
        input.placeholder = "password";
        input.disabled = false;
    } else {
        input.disabled = true;
        lightdm.respond(input_text);
    }
}
