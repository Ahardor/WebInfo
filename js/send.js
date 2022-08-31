"use strict"

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formsend);

    async function formsend(e) {
        e.preventDefault();

        let error = formvalidate(form);

        let formData = new FormData(form);

        if (error ===0){
            form.classList.add('_sending');
            
            Email.send({
                Host: "smtp.yandex.ru",
                Username: "tepanosyaneduard@yandex.ru",
                Password: "ksruflfucaojfevw",
                To: formData.get("email"),
                From: "tepanosyaneduard@yandex.ru",
                Subject: "Test from: " + formData.get("name"),
                Body: formData.get("message"),
            }).then(message => alert("mail sent"));

        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formvalidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++){
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')){
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }

            }else if(input.getAttribute("type") === "checkbox" && input.checked === false){
                formAddError(input);
                error++;
            } else {
                if (input.value === ''){
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error')
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error')
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }           
    
})