const container = document.getElementById('container');

function load(event) {
    if (event == 'DOMContentLoaded') {
        container.append(form);
    }
}

document.addEventListener('DOMContentLoaded', load);