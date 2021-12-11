let deferredPrompt;

window.onerror = function (msg, url, linenumber) {
    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
    return true;
}

(function () {

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('sw.js')
            .then(() => { teste(); });
    }

})();

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

function teste() {


    swalWithBootstrapButtons.fire({
        title: 'Adicionar à tela inicial?',
        text: "Sua escolha ficará salva!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Adicionar atalho!',
        cancelButtonText: 'Não adicionar atalho.',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            a2hs();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire('Atalho não adicionado!');
        }
    })
}

function a2hs() {

    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
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

}
