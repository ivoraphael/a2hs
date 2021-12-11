////window.onerror = function (msg, url, linenumber) {
////    alert('Error message: ' + msg + '\nURL: ' + url + '\nLine Number: ' + linenumber);
////    return true;
////}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
})

(function () {

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

            // Register service worker to control making site work offline
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('sw.js')
                    .then(() => { console.log('Service Worker Registered'); });
            }

            //// Code to handle install prompt on desktop
            //let deferredPrompt;

            //window.addEventListener('beforeinstallprompt', (e) => {
            //    // Prevent Chrome 67 and earlier from automatically showing the prompt
            //    e.preventDefault();
            //    // Stash the event so it can be triggered later.
            //    deferredPrompt = e;
            //});

            //// Show the prompt
            //deferredPrompt.prompt();

            //// Wait for the user to respond to the prompt
            //deferredPrompt.userChoice.then((choiceResult) => {
            //    if (choiceResult.outcome === 'accepted') {
            //        console.log('User accepted the A2HS prompt');
            //    } else {
            //        console.log('User dismissed the A2HS prompt');
            //    }
            //    deferredPrompt = null;
            //});

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire('Atalho nao adicionado!');
        }
    })

})();

//////////////////////////////////////////////////////////////////
