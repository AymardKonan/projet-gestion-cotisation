// script.js

// Sélection des éléments HTML
const searchBar = document.querySelector('.search-bar');
const filterSelect = document.querySelector('.filter');
const tableBody = document.querySelector('.company-table tbody');
const addButton = document.querySelector('#add-item');
const dateFilter = document.querySelector('.date-filter'); // Sélectionner l'élément de filtre de date

// Fonction pour rechercher dans la table
searchBar.addEventListener('input', filterTable);
filterSelect.addEventListener('change', filterTable);
dateFilter.addEventListener('input', filterTable);




function formatDate(date) {
    const [month, day, year] = date.split('/');
    return `${day}/${month}/${year}`;
}

function filterTable() {
    const searchTerm = searchBar.value.toLowerCase();
    const filterValue = filterSelect.value;
    const selectedDate = dateFilter.value; // Récupérer la date sélectionnée
    const rows = tableBody.querySelectorAll('tr'); // Récupérer toutes les lignes du tableau
    let hasResults = false; // Flag pour savoir si des résultats ont été trouvés


    rows.forEach(row => {
        const cells = row.querySelectorAll('td'); // Récupérer toutes les cellules de la ligne
        let matchesSearch = false; // Variable pour savoir si la ligne correspond au terme de recherche
        let matchesFilter = !filterValue || cells[1].textContent.includes(filterValue); // Vérifie si la catégorie correspond au filtre
        let matchesDate = true; // Par défaut, la ligne correspond à la date

        // Si une date est sélectionnée, comparer avec la date dans la cellule correspondante (ici, la dernière cellule de chaque ligne)
        if (selectedDate) {
            const dateText = cells[5].textContent.trim(); // Récupérer la date (colonne "Periode de déclaration")
           // Convertir la date en objet Date
           const rowDate = new Date(dateText);

            // Convertir la date du tableau au format dd/mm/yyyy
            const [day, month, year] = dateText.split("-");
            const formattedRowDate = `${day}/${month}/${year}`;

            // Si la date de la ligne ne correspond pas à la date sélectionnée, la ligne ne correspond pas au filtre
            matchesDate = formattedRowDate === selectedDate; 
        }

        // Parcours chaque cellule pour vérifier si elle correspond au terme de recherche
        cells.forEach(cell => {
            const cellText = cell.textContent.toLowerCase(); // Récupérer le texte de la cellule et le mettre en minuscules
            if (cellText.includes(searchTerm)) {
                matchesSearch = true; // Si une cellule contient le terme de recherche, la ligne est marquée comme correspondante
            }
        });

        // Afficher ou masquer la ligne selon les résultats de la recherche, du filtre de catégorie et du filtre de date
        row.style.display = matchesSearch && matchesFilter && matchesDate ? '' : 'none';
    });

    
}


// Fonction pour trier les colonnes
const headers = document.querySelectorAll('.company-table th');
headers.forEach((header, index) => {
    header.addEventListener('click', () => sortTable(index));
});

function sortTable(columnIndex) {
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const isNumeric = !isNaN(rows[0].children[columnIndex].textContent.trim());
    const sortedRows = rows.sort((a, b) => {
        const aText = a.children[columnIndex].textContent.trim();
        const bText = b.children[columnIndex].textContent.trim();
        return isNumeric
            ? Number(aText) - Number(bText)
            : aText.localeCompare(bText);
    });

    // Réorganiser les lignes dans le tableau
    tableBody.innerHTML = '';
    sortedRows.forEach(row => tableBody.appendChild(row));
}

// Fonction pour ajouter une nouvelle ligne à la table
addButton.addEventListener('click', () => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>Nouvel ID</td>
        <td>Nouvelle Entreprise</td>
        <td>nouveau@email.com</td>
        <td>0000000000</td>
        <td>Type</td>
        <td>Date</td>
        <td>
            <label class="btn-action"><i class="fa-regular fa-eye"></i></label>
            <label class="btn-action"><i class="fa-regular fa-pen-to-square"></i></label>
            <button class="btn-action btn-danger"><i class="fa-solid fa-trash"></i></button>
        </td>
    `;
    tableBody.appendChild(newRow);
});
