// Globalne varijable
let qualityData = [];
let rawData = [];
let officeManagerMap = {}; // Mapa ureda i voditelja

// Mapiranje voditelja i njihovih područja
const VODITELJI_MAPPING = {
    "22000": "IVICA VRANJIĆ",
    "22101": "SANJA VOJVODIĆ",
    "22102": "SANJA VOJVODIĆ",
    "22103": "SANJA VOJVODIĆ",
    "22104": "SANJA VOJVODIĆ",
    "22105": "SANJA VOJVODIĆ",
    "22106": "SANJA VOJVODIĆ",
    "22108": "SANJA VOJVODIĆ",
    "22202": "SANJA VOJVODIĆ",
    "22203": "SANJA VOJVODIĆ",
    "22205": "ANĐELA MANDIĆ",
    "22211": "SANJA VOJVODIĆ",
    "22212": "SANJA VOJVODIĆ",
    "22213": "VALENTINA PILIŽOTA",
    "22215": "ANĐELA MANDIĆ",
    "22221": "ANĐELA MANDIĆ",
    "22222": "ANĐELA MANDIĆ",
    "22232": "SANJA VOJVODIĆ",
    "22233": "SANJA VOJVODIĆ",
    "22234": "SANJA VOJVODIĆ",
    "22235": "SANJA VOJVODIĆ",
    "22236": "SANJA VOJVODIĆ",
    "22240": "VALENTINA PILIŽOTA",
    "22242": "VALENTINA PILIŽOTA",
    "22243": "VALENTINA PILIŽOTA",
    "22300": "ANĐELA MANDIĆ",
    "22303": "ANĐELA MANDIĆ",
    "22305": "ANĐELA MANDIĆ",
    "22310": "ANĐELA MANDIĆ",
    "22320": "ANĐELA MANDIĆ",
    "22321": "ANĐELA MANDIĆ",
    "22322": "ANĐELA MANDIĆ",
    "22323": "ANĐELA MANDIĆ",
    "22324": "ANĐELA MANDIĆ",
    "22940": "IVICA VRANJIĆ",
    "23000": "IVAN GAĆINA",
    "23103": "IVAN GAĆINA",
    "23104": "JOSIPA ZORIĆ-BEGONJA",
    "23105": "JOSIPA ZORIĆ-BEGONJA",
    "23106": "JOSIPA ZORIĆ-BEGONJA",
    "23107": "JOSIPA ZORIĆ-BEGONJA",
    "23205": "VALENTINA PILIŽOTA",
    "23206": "VALENTINA PILIŽOTA",
    "23207": "VALENTINA PILIŽOTA",
    "23210": "VALENTINA PILIŽOTA",
    "23211": "VALENTINA PILIŽOTA",
    "23212": "JOSIPA ZORIĆ-BEGONJA",
    "23222": "JASENKA ĆURIĆ",
    "23223": "JASENKA ĆURIĆ",
    "23226": "JASENKA ĆURIĆ",
    "23231": "JOSIPA ZORIĆ-BEGONJA",
    "23232": "JOSIPA ZORIĆ-BEGONJA",
    "23233": "JOSIPA ZORIĆ-BEGONJA",
    "23234": "JOSIPA ZORIĆ-BEGONJA",
    "23235": "JOSIPA ZORIĆ-BEGONJA",
    "23241": "JASENKA ĆURIĆ",
    "23242": "JASENKA ĆURIĆ",
    "23243": "JASENKA ĆURIĆ",
    "23244": "JASENKA ĆURIĆ",
    "23248": "JOSIPA ZORIĆ-BEGONJA",
    "23249": "JASNA DEŠIĆ",
    "23250": "JASNA DEŠIĆ",
    "23251": "JASNA DEŠIĆ",
    "23262": "JOSIPA ZORIĆ-BEGONJA",
    "23263": "JOSIPA ZORIĆ-BEGONJA",
    "23271": "JOSIPA ZORIĆ-BEGONJA",
    "23272": "JOSIPA ZORIĆ-BEGONJA",
    "23273": "JOSIPA ZORIĆ-BEGONJA",
    "23274": "MARKO JOSIĆ",
    "23275": "JOSIPA ZORIĆ-BEGONJA",
    "23281": "JOSIPA ZORIĆ-BEGONJA",
    "23283": "JOSIPA ZORIĆ-BEGONJA",
    "23284": "JOSIPA ZORIĆ-BEGONJA",
    "23286": "JOSIPA ZORIĆ-BEGONJA",
    "23287": "JOSIPA ZORIĆ-BEGONJA",
    "23291": "JOSIPA ZORIĆ-BEGONJA",
    "23292": "JOSIPA ZORIĆ-BEGONJA",
    "23293": "JOSIPA ZORIĆ-BEGONJA",
    "23294": "JOSIPA ZORIĆ-BEGONJA",
    "23295": "JOSIPA ZORIĆ-BEGONJA",
    "23296": "JOSIPA ZORIĆ-BEGONJA",
    "23312": "JASENKA ĆURIĆ",
    "23420": "JASENKA ĆURIĆ",
    "23422": "JASENKA ĆURIĆ",
    "23423": "JASENKA ĆURIĆ",
    "23440": "TOMISLAV KULAŠ",
    "23445": "TOMISLAV KULAŠ",
    "23450": "JASENKA ĆURIĆ",
    "23452": "JASENKA ĆURIĆ",
    "23940": "MARKO JOSIĆ",
    "23950": "MARKO JOSIĆ",
    "53000": "TOMISLAV KULAŠ",
    "53202": "TOMISLAV KULAŠ",
    "53220": "JASNA DEŠIĆ",
    "53223": "JASNA DEŠIĆ",
    "53230": "JASNA DEŠIĆ",
    "53231": "JASNA DEŠIĆ",
    "53233": "JASNA DEŠIĆ",
    "53234": "TOMISLAV KULAŠ",
    "53244": "TOMISLAV KULAŠ",
    "53250": "TOMISLAV KULAŠ",
    "53260": "JASNA DEŠIĆ",
    "53270": "JASNA DEŠIĆ",
    "53273": "JASNA DEŠIĆ",
    "53284": "JASNA DEŠIĆ",
    "53287": "JASNA DEŠIĆ",
    "53288": "TOMISLAV KULAŠ",
    "53291": "JASNA DEŠIĆ",
    "53296": "JASNA DEŠIĆ",
    "53940": "TOMISLAV KULAŠ",
    "53212": "TOMISLAV KULAŠ",
    "53271": "JASNA DEŠIĆ",
    "53294": "JASNA DEŠIĆ",
    "53274": "JASNA DEŠIĆ",
    "53224": "JASNA DEŠIĆ",
    "53941": "JASNA DEŠIĆ"
};

// Dodatno mapiranje za raspone
const RANGE_MAPPING = {
    "22000       -22911": "IVICA VRANJIĆ",
    "23000       -23199": "IVAN GAĆINA",      // Završava prije Ante Lazanja
    "23200       -23201": "ANTE LAZANJA",     // Novi raspon za Antu Lazanju
    "23202       -23273": "IVAN GAĆINA",      // Nastavlja se nakon Ante Lazanja
    "23274       -23940": "MARKO JOSIĆ"
};

const requiredColumns = [
    'Prijamni broj',
    'Status pošiljke',
    'Datum i vrijeme prijama',
    '1P - PU zaduženja',
    '1P - Datum i vrijeme događaja uručenja',
    'Dana'
];
const holidays = [
    '01.01.2024', // Nova godina
    '06.01.2024', // Sveta tri kralja
    '31.03.2024', // Uskrs
    '01.04.2024', // Uskrsni ponedjeljak
    '01.05.2024', // Praznik rada
    '30.05.2024', // Tijelovo
    '22.06.2024', // Dan antifašističke borbe
    '05.08.2024', // Dan domovinske zahvalnosti
    '15.08.2024', // Velika Gospa
    '01.11.2024', // Svi sveti
    '18.11.2024', // Dan sjećanja na žrtve Domovinskog rata
    '25.12.2024', // Božić
    '26.12.2024'  // Sveti Stjepan
];

// Inicijalizacija
document.addEventListener('DOMContentLoaded', function() {
    // Event listeneri za upload
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', handleFileDrop);
    fileInput.addEventListener('change', handleFileSelect);

    // Event listener za izvoz detalja
    document.getElementById('exportDetailsBtn').addEventListener('click', exportDetailsToExcel);
    
    // Novi event listeneri
    document.getElementById('importExcelBtn').addEventListener('click', () => {
        document.getElementById('uploadSection').style.display = 'block';
        document.getElementById('dashboardContent').style.display = 'none';
    });
    
    document.getElementById('exportAllBtn').addEventListener('click', exportAllToExcel);

    // Event listeneri za pomoć i info
    document.getElementById('helpBtn').addEventListener('click', () => {
        const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
        helpModal.show();
    });

    document.getElementById('aboutBtn').addEventListener('click', () => {
        const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
        infoModal.show();
    });

    // Inicijalizacija sidebar collapse
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
    });
});

// Funkcija za obradu ispuštene datoteke
function handleFileDrop(e) {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) processExcelFile(file);
}

// Funkcija za obradu odabrane datoteke
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) processExcelFile(file);
}

// Funkcija za provjeru ima li datoteka sve potrebne stupce
function validateColumns(headers) {
    const missingColumns = requiredColumns.filter(col => !headers.includes(col));
    if (missingColumns.length > 0) {
        alert(`Nedostaju sljedeći stupci: ${missingColumns.join(', ')}`);
        return false;
    }
    return true;
}

// Funkcija za formatiranje datuma u hrvatski format
function formatDate(date) {
    if (!date) return '';
    return date.toLocaleString('hr-HR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

// Funkcija za konverziju Excel datuma u JavaScript Date objekt
function excelDateToJSDate(excelDate) {
    if (!excelDate) return null;
    
    // Excel koristi broj dana od 1.1.1900, a JavaScript od 1.1.1970
    // 25569 je broj dana između ta dva datuma
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const date = new Date((excelDate - 25569) * millisecondsPerDay);
    
    // Korigiraj vremensku zonu
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    
    return date;
}

// Funkcija za provjeru je li datum radni dan
function isWorkingDay(dateStr) {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return false;
    
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    const day = date.getDay();
    
    // Provjera je li vikend
    if (day === 0 || day === 6) return false;
    
    // Provjera je li praznik
    if (holidays.includes(dateStr)) return false;
    
    return true;
}

// Funkcija za računanje radnih dana između dva datuma
function getWorkingDays(startDateTimeExcel, endDateTimeExcel) {
    console.log('Ulazni Excel datumi:', {
        startDateTimeExcel,
        endDateTimeExcel
    });

    if (!startDateTimeExcel || !endDateTimeExcel) {
        console.error('Nedostaju datumi:', { startDateTimeExcel, endDateTimeExcel });
        return 0;
    }

    // Konvertiramo Excel datume u JavaScript Date objekte
    const startDate = excelDateToJSDate(startDateTimeExcel);
    const endDate = excelDateToJSDate(endDateTimeExcel);

    console.log('Konvertirani datumi:', {
        startDate: startDate.toLocaleString('hr-HR'),
        endDate: endDate.toLocaleString('hr-HR')
    });

    // Postavi vrijeme na početak i kraj dana
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let workingDays = 0; // Počinjemo od 0 jer je dan prijema dan 1
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const dateStr = current.toLocaleDateString('hr-HR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        if (isWorkingDay(dateStr)) {
            workingDays++;
            console.log(`Radni dan: ${dateStr}, ukupno: ${workingDays}`);
        } else {
            console.log(`Nije radni dan: ${dateStr}`);
        }
        current.setDate(current.getDate() + 1);
    }
    
    console.log(`Konačni broj radnih dana: ${workingDays}`);
    return workingDays;
}

// Funkcija za obradu Excel datoteke
function processExcelFile(file) {
    console.log('=== POČETAK OBRADE EXCEL DATOTEKE ===');
    console.log('Ime datoteke:', file.name);
    console.log('Veličina datoteke:', file.size, 'bajtova');
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            console.log('FileReader je uspješno učitao datoteku');
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {type: 'array'});
            
            console.log('Excel datoteka učitana');
            console.log('Dostupni listovi:', workbook.SheetNames);
            
            if (workbook.SheetNames.length === 0) {
                throw new Error('Excel datoteka nema listova!');
            }
            
            // Uzmi prvi sheet
            const firstSheet = workbook.SheetNames[0];
            console.log('Koristim prvi list:', firstSheet);
            
            const worksheet = workbook.Sheets[firstSheet];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            
            if (jsonData.length === 0) {
                throw new Error('Nema podataka u Excel datoteci!');
            }
            
            console.log('Broj učitanih redaka:', jsonData.length);
            console.log('Prvi redak podataka:', jsonData[0]);
            
            const headers = Object.keys(jsonData[0]);
            console.log('Pronađeni stupci:', headers);

            // Provjeri ima li sve potrebne stupce
            if (!validateColumns(headers)) {
                throw new Error('Nedostaju potrebni stupci u Excel datoteci!');
            }

            console.log('Validacija stupaca uspješna');
            rawData = jsonData; // Spremi originalne podatke

            console.log('=== POČETAK ANALIZE KVALITETE ===');
            analyzeQuality(jsonData);
            
            // Prikaz dashboard-a
            document.getElementById('uploadSection').style.display = 'none';
            document.getElementById('dashboardContent').style.display = 'block';
            
            console.log('=== OBRADA EXCEL DATOTEKE ZAVRŠENA ===');
            
        } catch (error) {
            console.error('=== GREŠKA PRI OBRADI EXCEL DATOTEKE ===');
            console.error('Detalji greške:', error);
            console.error('Stack trace:', error.stack);
            alert('Greška pri učitavanju datoteke: ' + error.message);
        }
    };
    
    reader.onerror = function(error) {
        console.error('Greška pri čitanju datoteke:', error);
        alert('Greška pri čitanju datoteke');
    };
    
    console.log('Započinjem čitanje datoteke...');
    reader.readAsArrayBuffer(file);
}

// Funkcija za analizu kvalitete
function analyzeQuality(data) {
    console.log('Započinjem analizu kvalitete');
    console.log('Broj redaka za obradu:', data.length);
    
    const qualityByManager = {};
    const today = new Date();
    const excelToday = (today.getTime() / (24 * 60 * 60 * 1000)) + 25569;
    
    console.log('Današnji datum:', today.toLocaleDateString('hr-HR'), '(Excel:', excelToday, ')');
    
    data.forEach((row, index) => {
        try {
            const assignedOffice = row['1P - PU zaduženja']?.toString().trim();
            const destinationOffice = row['Odredišni ured']?.toString().trim();
            const office = assignedOffice || destinationOffice; // Koristi zaduženi ured ako postoji, inače odredišni
            
            const barcode = row['Prijamni broj'];
            const receiptDate = row['Datum i vrijeme prijama'];
            const deliveryDate = row['1P - Datum i vrijeme događaja uručenja'];
            const daysOverdue = parseInt(row['Dana']);
            const status = row['Status pošiljke'];
            
            // Preskočimo redak ako nema podatka u stupcu 'Dana'
            if (isNaN(daysOverdue)) {
                return;
            }
            
            console.log(`\nObrada retka ${index + 1}:`, {
                barcode,
                assignedOffice,
                destinationOffice,
                selectedOffice: office,
                daysOverdue,
                status,
                receiptDate: excelDateToJSDate(receiptDate)?.toLocaleString('hr-HR'),
                deliveryDate: deliveryDate ? excelDateToJSDate(deliveryDate)?.toLocaleString('hr-HR') : 'Nije uručeno'
            });
            
            // Provjeri osnovne podatke
            if (!receiptDate || !office) {
                console.error(`Redak ${index + 1}: Nedostaju osnovni podaci:`, { 
                    receiptDate: !!receiptDate,
                    office: !!office 
                });
                return;
            }

            // Pronađi voditelja za ured
            let manager = VODITELJI_MAPPING[office];
            if (!manager) {
                const officeNum = parseInt(office);
                if (!isNaN(officeNum)) {
                    for (const [range, voditelj] of Object.entries(RANGE_MAPPING)) {
                        const [start, end] = range.split('-').map(num => parseInt(num.trim()));
                        if (officeNum >= start && officeNum <= end) {
                            manager = voditelj;
                            break;
                        }
                    }
                }
            }
            
            manager = manager || 'Nepoznat voditelj';
            console.log(`Redak ${index + 1}: Pronađen voditelj:`, manager);
            
            // Pošiljka je u roku ako je daysOverdue <= 0
            const isOnTime = daysOverdue <= 0;
            
            // Inicijaliziraj podatke za voditelja ako ne postoje
            if (!qualityByManager[manager]) {
                qualityByManager[manager] = {
                    total: 0,
                    onTime: 0,
                    late: 0,
                    items: [],
                    offices: new Set()
                };
            }
            
            // Ažuriraj statistiku
            qualityByManager[manager].offices.add(office);
            qualityByManager[manager].total++;
            
            if (isOnTime) {
                qualityByManager[manager].onTime++;
            } else {
                qualityByManager[manager].late++;
                console.log(`Redak ${index + 1}: Pošiljka je VAN ROKA:`, {
                    barcode,
                    daysOverdue
                });
            }
            
            // Dodaj detalje pošiljke
            qualityByManager[manager].items.push({
                barcode: barcode,
                assignedOffice: assignedOffice || 'N/A',
                destinationOffice: destinationOffice || 'N/A',
                receiptDateTime: excelDateToJSDate(receiptDate)?.toLocaleString('hr-HR'),
                deliveryDateTime: deliveryDate ? excelDateToJSDate(deliveryDate)?.toLocaleString('hr-HR') : 'Nije uručeno',
                status: status,
                isOnTime: isOnTime,
                daysOverdue: daysOverdue
            });
            
        } catch (error) {
            console.error(`Greška pri obradi retka ${index + 1}:`, error);
            console.error('Podaci retka:', row);
        }
    });
    
    // Pripremi podatke za prikaz
    qualityData = Object.entries(qualityByManager)
        .filter(([manager, stats]) => stats.total > 0)
        .map(([manager, stats]) => ({
            manager,
            offices: Array.from(stats.offices),
            total: stats.total,
            onTime: stats.onTime,
            late: stats.late,
            quality: (stats.onTime / stats.total * 100).toFixed(2),
            items: stats.items
        }))
        .sort((a, b) => b.quality - a.quality);
    
    console.log('\nStatistika po voditeljima:', qualityData);
    
    // Ažuriraj prikaz
    if (qualityData.length > 0) {
        console.log('Ažuriram tablicu i graf...');
        updateQualityTable();
        updateQualityChart();
    } else {
        console.error('Nema podataka za prikaz!');
    }
}

// Funkcija za ažuriranje tablice kvalitete
function updateQualityTable() {
    console.log('Ažuriranje tablice s podacima:', qualityData);
    const tbody = document.querySelector('#qualityTable tbody');
    const thead = document.querySelector('#qualityTable thead');
    if (!tbody || !thead) {
        console.error('Nije pronađen tbody ili thead element tablice!');
        return;
    }

    // Ažuriraj zaglavlje tablice da poravna naslove s podacima
    thead.innerHTML = `
        <tr>
            <th class="text-start">Voditelj</th>
            <th class="text-start">Poštanski ured</th>
            <th class="text-center">Ukupno pošiljaka</th>
            <th class="text-center">U roku</th>
            <th class="text-center">Van roka</th>
            <th class="text-center">Kvaliteta (%)</th>
        </tr>
    `;
    
    tbody.innerHTML = '';
    
    // Izračunaj ukupne vrijednosti
    const totals = qualityData.reduce((acc, data) => {
        acc.total += data.total;
        acc.onTime += data.onTime;
        acc.late += data.late;
        return acc;
    }, { total: 0, onTime: 0, late: 0 });
    
    // Izračunaj ukupnu kvalitetu
    const totalQuality = ((totals.onTime / totals.total) * 100).toFixed(2);
    
    // Dodaj redove za svaki podatak
    qualityData.forEach(data => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="text-start">${data.manager}</td>
            <td class="text-start">${data.offices.join(', ')}</td>
            <td class="text-center">${data.total.toLocaleString()}</td>
            <td class="text-center">${data.onTime.toLocaleString()}</td>
            <td class="text-center">${data.late.toLocaleString()}</td>
            <td class="text-center">${data.quality}%</td>
        `;
        
        // Dodaj klasu za označavanje redova s kašnjenjem
        if (data.late > 0) {
            row.classList.add('table-warning');
        }
        
        // Dodaj event listener za klik koji će prikazati detalje
        row.addEventListener('click', () => showDetails(data));
    });

    // Dodaj prazan red prije sumarnog reda za vizualno odvajanje
    const spacerRow = tbody.insertRow();
    spacerRow.innerHTML = '<td colspan="6" style="height: 2px; background-color: #dee2e6;"></td>';

    // Dodaj sumarni red za R4
    const summaryRow = tbody.insertRow();
    summaryRow.classList.add('table-dark', 'fw-bold', 'border-top', 'border-bottom');
    summaryRow.style.borderWidth = '2px';
    summaryRow.innerHTML = `
        <td class="text-start">R4 Ukupno</td>
        <td class="text-start">Svi uredi</td>
        <td class="text-center">${totals.total.toLocaleString()}</td>
        <td class="text-center">${totals.onTime.toLocaleString()}</td>
        <td class="text-center">${totals.late.toLocaleString()}</td>
        <td class="text-center">${totalQuality}%</td>
    `;
    
    console.log('Tablica je ažurirana s ukupnim podacima:', {
        total: totals.total,
        onTime: totals.onTime,
        late: totals.late,
        quality: totalQuality
    });
}

// Funkcija za ažuriranje grafa kvalitete
function updateQualityChart() {
    console.log('Ažuriranje grafa s podacima:', qualityData);
    const ctx = document.getElementById('qualityChart');
    if (!ctx) {
        console.error('Nije pronađen canvas element za graf!');
        return;
    }
    const context = ctx.getContext('2d');
    
    new Chart(context, {
        type: 'bar',
        data: {
            labels: qualityData.map(d => d.manager),
            datasets: [
                {
                    label: 'U roku',
                    data: qualityData.map(d => d.onTime),
                    backgroundColor: 'rgba(255, 193, 7, 0.5)',
                    borderColor: 'rgba(255, 193, 7, 0.8)',
                    borderWidth: 1,
                    order: 2
                },
                {
                    label: 'Van roka',
                    data: qualityData.map(d => d.late),
                    type: 'line',
                    borderColor: 'rgba(220, 53, 69, 0.8)',
                    backgroundColor: 'rgba(255, 193, 7, 0.05)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: function(event, elements) {
                if (!elements || elements.length === 0) return;
                
                const element = elements[0];
                const index = element.index;
                const datasetIndex = element.datasetIndex;
                const managerData = qualityData[index];
                
                if (!managerData) return;
                
                // Odredi koji tip pošiljaka prikazati na temelju kliknutog elementa
                let showOnTimeOnly = null;
                const datasets = ['U roku', 'Van roka'];
                const datasetLabel = datasets[datasetIndex];
                
                if (datasetLabel === 'U roku') {
                    showOnTimeOnly = true;
                } else if (datasetLabel === 'Van roka') {
                    showOnTimeOnly = false;
                }
                
                // Prikaži detalje
                showDetails(managerData, showOnTimeOnly);
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Broj pošiljaka',
                        color: '#495057'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const data = qualityData[context.dataIndex];
                            const labels = [
                                `${context.dataset.label}: ${context.raw.toLocaleString()}`,
                                `Ukupno: ${data.total.toLocaleString()}`,
                                `Kvaliteta: ${data.quality}%`,
                                `Uredi: ${data.offices.join(', ')}`
                            ];
                            return labels;
                        }
                    }
                },
                legend: {
                    labels: {
                        color: '#495057'
                    },
                    onClick: function(event, legendItem, legend) {
                        Chart.defaults.plugins.legend.onClick.call(this, event, legendItem, legend);
                    }
                }
            }
        }
    });
    console.log('Graf je ažuriran');
}

// Funkcija za prikaz detalja
function showDetails(data, showOnTimeOnly = null) {
    const modalElement = document.getElementById('detailsModal');
    const modal = new bootstrap.Modal(modalElement);
    const modalTitle = document.querySelector('#detailsModal .modal-title');
    const tbody = document.querySelector('#detailsTable tbody');
    
    modalTitle.textContent = `Detalji pošiljaka - ${data.manager}`;
    tbody.innerHTML = '';
    
    // Odaberi koje pošiljke prikazati
    let itemsToShow = [...data.items];
    if (showOnTimeOnly !== null) {
        itemsToShow = itemsToShow.filter(item => item.isOnTime === showOnTimeOnly);
    }
    
    // Sortiraj items po datumu prijema (najnoviji prvi)
    const sortedItems = itemsToShow.sort((a, b) => 
        new Date(b.receiptDateTime) - new Date(a.receiptDateTime)
    );
    
    // Provjeri postoji li već container za legendu
    let legendContainer = document.querySelector('#detailsModal .legend-container');
    if (!legendContainer) {
        // Ako ne postoji, kreiraj novi
        legendContainer = document.createElement('div');
        legendContainer.className = 'legend-container mb-3 d-flex align-items-center gap-3';
        modalTitle.parentNode.insertBefore(legendContainer, modalTitle.nextSibling);
    }
    
    // Ažuriraj sadržaj legende
    legendContainer.innerHTML = `
        <span class="me-2">Filtriraj po:</span>
        <div class="legend-item" data-filter="all" style="cursor: pointer;">
            <span class="badge bg-secondary me-1">●</span>
            <span>Sve (${data.total})</span>
        </div>
        <div class="legend-item" data-filter="onTime" style="cursor: pointer;">
            <span class="badge bg-success me-1">●</span>
            <span>U roku (${data.onTime})</span>
        </div>
        <div class="legend-item" data-filter="late" style="cursor: pointer;">
            <span class="badge bg-danger me-1">●</span>
            <span>Van roka (${data.late})</span>
        </div>
    `;

    // Dodaj event listenere za filtriranje
    legendContainer.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', () => {
            const filter = item.dataset.filter;
            let filterValue = null;
            
            switch(filter) {
                case 'onTime':
                    filterValue = true;
                    break;
                case 'late':
                    filterValue = false;
                    break;
            }
            
            // Ažuriraj samo sadržaj tablice, bez ponovnog kreiranja modala
            updateDetailsTable(data, filterValue);
            updateActiveFilter(legendContainer, filter);
        });

        // Dodaj hover efekt
        item.addEventListener('mouseenter', () => {
            item.style.opacity = '0.8';
        });
        item.addEventListener('mouseleave', () => {
            item.style.opacity = '1';
        });
    });

    // Postavi aktivni filter
    let currentFilter = 'all';
    if (showOnTimeOnly === true) currentFilter = 'onTime';
    else if (showOnTimeOnly === false) currentFilter = 'late';
    updateActiveFilter(legendContainer, currentFilter);
    
    // Dodaj event listener za čišćenje modala pri zatvaranju
    modalElement.addEventListener('hidden.bs.modal', function () {
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    });

    // Ažuriraj zaglavlje tablice
    const thead = document.querySelector('#detailsTable thead');
    thead.innerHTML = `
        <tr>
            <th>Prijamni broj</th>
            <th>Vrijeme prijema</th>
            <th>PU zaduženja</th>
            <th>Odredišni ured</th>
            <th>Datum dodjele statusa</th>
            <th>Status</th>
            <th>Dana</th>
        </tr>
    `;

    // Popuni tablicu
    sortedItems.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.barcode}</td>
            <td>${item.receiptDateTime}</td>
            <td>${item.assignedOffice}</td>
            <td>${item.destinationOffice}</td>
            <td>${item.deliveryDateTime || 'N/A'}</td>
            <td>${item.status}</td>
            <td>${item.daysOverdue}</td>
        `;
        
        if (!item.isOnTime) {
            row.classList.add('table-danger');
        }
    });
    
    modal.show();
}

// Nova pomoćna funkcija za ažuriranje aktivnog filtera
function updateActiveFilter(container, filter) {
    container.querySelectorAll('.legend-item').forEach(item => {
        if (item.dataset.filter === filter) {
            item.classList.add('fw-bold');
            item.style.textDecoration = 'underline';
        } else {
            item.classList.remove('fw-bold');
            item.style.textDecoration = 'none';
        }
    });
}

// Nova pomoćna funkcija za ažuriranje sadržaja tablice
function updateDetailsTable(data, showOnTimeOnly) {
    const tbody = document.querySelector('#detailsTable tbody');
    tbody.innerHTML = '';
    
    let itemsToShow = [...data.items];
    if (showOnTimeOnly !== null) {
        itemsToShow = itemsToShow.filter(item => item.isOnTime === showOnTimeOnly);
    }
    
    const sortedItems = itemsToShow.sort((a, b) => 
        new Date(b.receiptDateTime) - new Date(a.receiptDateTime)
    );
    
    sortedItems.forEach(item => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${item.barcode}</td>
            <td>${item.receiptDateTime}</td>
            <td>${item.assignedOffice}</td>
            <td>${item.destinationOffice}</td>
            <td>${item.deliveryDateTime || 'N/A'}</td>
            <td>${item.status}</td>
            <td>${item.daysOverdue}</td>
        `;
        
        if (!item.isOnTime) {
            row.classList.add('table-danger');
        }
    });
}

// Funkcija za izvoz detalja u Excel
function exportDetailsToExcel() {
    const table = document.getElementById('detailsTable');
    const modalTitle = document.querySelector('#detailsModal .modal-title').textContent;
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Detalji');
    XLSX.writeFile(wb, `${modalTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.xlsx`);
}

// Nova funkcija za izvoz svih podataka u Excel
function exportAllToExcel() {
    if (!qualityData || qualityData.length === 0) {
        alert('Nema podataka za izvoz. Prvo učitajte Excel datoteku.');
        return;
    }

    // Kreiraj novi workbook
    const wb = XLSX.utils.book_new();

    // Izračunaj ukupne vrijednosti za R4
    const totals = qualityData.reduce((acc, data) => {
        acc.total += data.total;
        acc.onTime += data.onTime;
        acc.late += data.late;
        return acc;
    }, { total: 0, onTime: 0, late: 0 });
    
    const totalQuality = ((totals.onTime / totals.total) * 100).toFixed(2);

    // Pripremi podatke za glavni list (tablični prikaz)
    const mainSheetData = [
        ['Voditelj', 'Poštanski uredi', 'Ukupno pošiljaka', 'U roku', 'Van roka', 'Kvaliteta (%)'],
        ...qualityData.map(data => [
            data.manager,
            data.offices.join(', '),
            data.total,
            data.onTime,
            data.late,
            data.quality
        ]),
        [], // Prazan red za odvajanje
        ['R4 Ukupno', 'Svi uredi', totals.total, totals.onTime, totals.late, totalQuality] // Ukupni red
    ];

    // Dodaj glavni list
    const ws = XLSX.utils.aoa_to_sheet(mainSheetData);
    
    // Podesi širinu stupaca za glavni list
    const mainWscols = [
        {wch: 25}, // Voditelj
        {wch: 30}, // Poštanski uredi
        {wch: 15}, // Ukupno pošiljaka
        {wch: 15}, // U roku
        {wch: 15}, // Van roka
        {wch: 15}  // Kvaliteta (%)
    ];
    ws['!cols'] = mainWscols;
    
    XLSX.utils.book_append_sheet(wb, ws, 'Ukupno');

    // Dodaj pojedinačne listove za svakog voditelja s pošiljkama van roka
    qualityData.forEach(data => {
        const hasLateItems = data.late > 0;
        
        if (hasLateItems) {
            // Filtriraj pošiljke van roka za ovog voditelja
            const lateItems = data.items.filter(item => !item.isOnTime);
            
            if (lateItems.length > 0) {
                // Pripremi podatke za list
                const sheetData = [['Prijamni broj', 'Vrijeme prijema', 'PU zaduženja', 'Odredišni ured', 'Datum dodjele statusa', 'Status', 'Dana u kašnjenju']];
                
                // Dodaj pošiljke van roka
                lateItems.forEach(item => {
                    sheetData.push([
                        item.barcode,
                        item.receiptDateTime,
                        item.assignedOffice,
                        item.destinationOffice,
                        item.deliveryDateTime,
                        item.status,
                        item.daysOverdue
                    ]);
                });

                // Kreiraj i dodaj list za voditelja
                const ws = XLSX.utils.aoa_to_sheet(sheetData);
                
                // Podesi širinu stupaca
                const wscols = [
                    {wch: 15}, // Prijamni broj
                    {wch: 20}, // Vrijeme prijema
                    {wch: 15}, // PU zaduženja
                    {wch: 15}, // Odredišni ured
                    {wch: 20}, // Datum dodjele statusa
                    {wch: 10}, // Status
                    {wch: 15}  // Dana u kašnjenju
                ];
                ws['!cols'] = wscols;
                
                XLSX.utils.book_append_sheet(wb, ws, data.manager.substring(0, 31));
            }
        }
    });

    // Izvezi Excel datoteku
    XLSX.writeFile(wb, 'analiza_kvalitete_urucenja.xlsx');
} 