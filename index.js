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

            navigator.serviceWorker
                .register('sw.js')
                .then(() => { console.log('Service Worker Registered'); });

        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            Swal.fire('Atalho nao adicionado!');
        }
    })
});
