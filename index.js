window.onerror = function (msg, url, linenumber) {
    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
}

// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js')
        .then(() => { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
//addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    addBtn.addEventListener('click', () => {

        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

//const swalWithBootstrapButtons = Swal.mixin({
//    customClass: {
//        confirmButton: 'btn btn-success',
//        cancelButton: 'btn btn-danger'
//    },
//    buttonsStyling: false
//})

$(document).ready(function () {

    //checkNotification();
    checkCookie();
});

function checkNotification() {
    let actualCookie = getCookie("notificationResponse");
    if (actualCookie != "") {
        alert('notificationResponse already answered');
        //console.log('a2hsResponse already answered');
    } else {

        Notification.requestPermission().then(function (permission) {
            alert(permission);
        });

        Swal.fire({
            title: 'Ativar Notificações',
            text: "Saiba na hora novidades e status de pedidos do seu volume no Freto",
            imageUrl: 'https://www.freto.com/Login/Images/favicon/favicon.ico',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ativar agora!',
            cancelButtonText: 'Deixar pra depois'
        }).then((result) => {
            if (result.isConfirmed) {

                setCookie("notificationResponse", "true", 365);
                alert('notificationResponse answered');
                ContinueLoading();

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Atalho nao adicionado!');
                ContinueLoading();
            }
        })


    }
}

function checkCookie() {
    //let username = getCookie("a2hsResponse");
    //if (username != "") {
    //    alert('a2hsResponse already answered');
    //    //console.log('a2hsResponse already answered');
    //} else {


        Swal.fire({
            title: 'Adicionar o Freto na sua tela inicial?',
            text: "Acesse o Freto de forma rápida e fácil na tela inicial do seu celular.",
            imageUrl: 'https://www.freto.com/Login/Images/favicon/favicon.ico',
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Adicionar na tela inicial',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {

                $('#addButton').click();
                document.getElementById('addButton').click();
                document.getElementById('addButton').click();
                document.getElementById('addButton').click();
                document.getElementById('addButton').click();

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                Swal.fire('Atalho nao adicionado!');
            }
        })

    //}
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}