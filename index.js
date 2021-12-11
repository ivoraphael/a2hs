////window.onerror = function (msg, url, linenumber) {
////    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
////    return true;
////}

// Code to handle install prompt on desktop
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

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

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

$(document).ready(function () {
    swalWithBootstrapButtons.fire({
        title: 'Adicionar atalho em sua tela inicial?',
        text: "Sua escolha ficara salva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Adicionar atalho!',
        cancelButtonText: 'Nao adicionar atalho.',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {

            $('#addButton').click();

        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire('Atalho nao adicionado!');
        }
    })
});