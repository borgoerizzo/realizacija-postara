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
    "22212": "VALENTINA PILIŽOTA",
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
    "53941": "JASNA DEŠIĆ"
};

// Dodatno mapiranje za raspone
const RANGE_MAPPING = {
    "22000       -22911": "IVICA VRANJIĆ",
    "23000       -23900": "IVAN GAĆINA",
    "23274       -23940": "MARKO JOSIĆ"
};

// Helper function to clean range string
function cleanRangeString(range) {
    return range.replace(/\s+/g, '');
}

// Chart instances
let emfChart = null;
let sviChart = null;
let jbChart = null;
let jChart = null;
let p24Chart = null;
let saspChart = null;
let pointsDistributionChart = null;

// Register Chart.js plugins
Chart.register(ChartDataLabels);

// Global variable to store analysis results
let globalAnalysisResults = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeDropZone();
    setupEventListeners();
    
    // Initialize sidebar toggle
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
        if (emfChart) emfChart.resize();
        if (sviChart) sviChart.resize();
        if (jbChart) jbChart.resize();
        if (jChart) jChart.resize();
        if (p24Chart) p24Chart.resize();
        if (saspChart) saspChart.resize();
    });
});

// Initialize drag and drop functionality
function initializeDropZone() {
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');

    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('upload-area-drag');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('upload-area-drag');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('upload-area-drag');
        
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
}

// Handle file upload and processing
async function handleFile(file) {
    if (!file.name.match(/\.(xlsx|xls)$/)) {
        showAlert('Molimo učitajte Excel datoteku (.xlsx ili .xls)', 'danger');
        return;
    }

    try {
        const workbook = await readExcelFile(file);
        console.log('Workbook loaded:', workbook);
        
        const sheets = workbook.SheetNames;
        const requiredSheets = ['EMF', 'J', 'SVI', 'JB', 'P24', 'SASP-MMR'];
        const foundSheets = sheets.filter(sheet => requiredSheets.includes(sheet));
        
        if (foundSheets.length === 0) {
            showAlert('Datoteka ne sadrži nijedan od potrebnih listova (EMF, J, SVI, JB, P24, SASP-MMR)', 'danger');
            return;
        }

        // Process each found sheet
        const analysisResults = {};
        
        if (sheets.includes('EMF')) {
            console.log('Processing EMF sheet...');
            analysisResults.EMF = processEMFSheet(workbook.Sheets['EMF']);
        }

        if (sheets.includes('J')) {
            console.log('Processing J sheet...');
            analysisResults.J = processJSheet(workbook.Sheets['J']);
        }

        if (sheets.includes('SVI')) {
            console.log('Processing SVI sheet...');
            analysisResults.SVI = processSVISheet(workbook.Sheets['SVI']);
        }

        if (sheets.includes('JB')) {
            console.log('Processing JB sheet...');
            analysisResults.JB = processJBSheet(workbook.Sheets['JB']);
        }

        if (sheets.includes('P24')) {
            console.log('Processing P24 sheet...');
            analysisResults.P24 = processP24Sheet(workbook.Sheets['P24']);
        }

        if (sheets.includes('SASP-MMR')) {
            console.log('Processing SASP-MMR sheet...');
            analysisResults.SASP = processSASPSheet(workbook.Sheets['SASP-MMR']);
        }

        // Calculate rankings and display results
        calculateAndDisplayRankings(analysisResults);
        
        // Show dashboard
        document.getElementById('uploadSection').style.display = 'none';
        document.getElementById('dashboardContent').style.display = 'block';
        
    } catch (error) {
        console.error('Error processing file:', error);
        showAlert('Greška pri učitavanju datoteke: ' + error.message, 'danger');
    }
}

// Read Excel file
function readExcelFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                resolve(workbook);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Process EMD sheet
function processEMDSheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('EMD Raw Data:', data.slice(0, 3)); // Log first 3 rows
    console.log('EMD Column Names:', Object.keys(data[0] || {})); // Log column names
    
    const voditeljStats = {};
    const unpairedData = [];

    // Pronađi točan naziv stupca
    const columnNames = Object.keys(data[0] || {});
    const uredColumn = columnNames.find(name => 
        name.includes('Priprema za uručenje') && name.includes('ured')
    );
    
    console.log('Found ured column:', uredColumn);

    if (!uredColumn) {
        console.error('Could not find ured column');
        return { voditeljStats: {}, unpairedData: [] };
    }

    data.forEach((row, index) => {
        // Log every 100th row for debugging
        if (index % 100 === 0) {
            console.log(`Processing EMD row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row[uredColumn] || !row['Napomena']) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row[uredColumn].toString().trim();
        const status = row['Napomena'].toString().trim();
        
        if (index < 3) {
            console.log('Processing row:', { ured, status });
        }
        
        // Check if status indicates successful delivery
        const isSuccessful = ['Pokušaj dostave D+1', 'Uručeno D+1', 
                            'Priprema za isporuku D+1', 'Ubačeno u kovčežić D+1',
                            'Uručeno u kovčežić D+1']
                            .some(s => status.includes(s));

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, isSuccessful });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            if (isSuccessful) {
                voditeljStats[voditelj].successful++;
            }
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate success rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(1) : '0.0'
        };
    });

    console.log('EMD Final Results:', {
        totalRows: data.length,
        processedVoditelji: Object.keys(voditeljStats),
        unpairedCount: unpairedData.length,
        results: {
            voditeljStats: Object.fromEntries(
                Object.entries(results.voditeljStats).map(([k, v]) => [
                    k,
                    {
                        total: v.total,
                        successful: v.successful,
                        successRate: v.successRate
                    }
                ])
            ),
            unpairedCount: unpairedData.length
        }
    });
    
    return results;
}

// Process EMF sheet
function processEMFSheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('EMF Raw Data:', data.slice(0, 3)); // Log first 3 rows
    console.log('EMF Column Names:', Object.keys(data[0] || {})); // Log column names
    
    const voditeljStats = {};
    const unpairedData = [];

    // Pronađi točan naziv stupca
    const columnNames = Object.keys(data[0] || {});
    const uredColumn = columnNames.find(name => 
        name.includes('Priprema za uručenje') && name.includes('ured')
    );
    
    console.log('Found ured column:', uredColumn);

    if (!uredColumn) {
        console.error('Could not find ured column');
        return { voditeljStats: {}, unpairedData: [] };
    }

    data.forEach((row, index) => {
        // Log every 100th row for debugging
        if (index % 100 === 0) {
            console.log(`Processing EMF row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row[uredColumn] || !row['Napomena']) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row[uredColumn].toString().trim();
        const status = row['Napomena'].toString().trim();
        
        if (index < 3) {
            console.log('Processing row:', { ured, status });
        }
        
        // Check if status indicates successful delivery
        const isSuccessful = ['Pokušaj dostave D+1', 'Uručeno D+1', 
                            'Priprema za isporuku D+1', 'Ubačeno u kovčežić D+1',
                            'Uručeno u kovčežić D+1']
                            .some(s => status.includes(s));

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, isSuccessful });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            if (isSuccessful) {
                voditeljStats[voditelj].successful++;
            }
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate success rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(1) : '0.0'
        };
    });

    console.log('EMF Final Results:', {
        totalRows: data.length,
        processedVoditelji: Object.keys(voditeljStats),
        unpairedCount: unpairedData.length,
        results: {
            voditeljStats: Object.fromEntries(
                Object.entries(results.voditeljStats).map(([k, v]) => [
                    k,
                    {
                        total: v.total,
                        successful: v.successful,
                        successRate: v.successRate
                    }
                ])
            ),
            unpairedCount: unpairedData.length
        }
    });
    
    return results;
}

// Process SVI sheet
function processSVISheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('SVI Raw Data:', data.slice(0, 3));
    console.log('SVI Column Names:', Object.keys(data[0] || {}));
    
    const voditeljStats = {};
    const unpairedData = [];

    // Pronađi točne nazive stupaca
    const columnNames = Object.keys(data[0] || {});
    console.log('Looking for columns in SVI sheet:', columnNames);

    // Traži stupac za ured - fleksibilnije pretraživanje
    const uredColumn = columnNames.find(name => 
        name.includes('PU') && (name.includes('zaduženja') || name.includes('zaduzenja'))
    );
    const statusColumn = columnNames.find(name => 
        name.toLowerCase().includes('status')
    );
    const barcodeColumn = columnNames.find(name => 
        name.toLowerCase().includes('prijamni') || 
        name.toLowerCase().includes('broj pošiljke') ||
        name.toLowerCase().includes('broj posiljke')
    );

    console.log('Found columns in SVI:', {
        uredColumn,
        statusColumn,
        barcodeColumn
    });

    if (!uredColumn || !statusColumn || !barcodeColumn) {
        console.error('Missing required columns in SVI sheet. Found:', {
            uredColumn,
            statusColumn,
            barcodeColumn
        });
        return { voditeljStats: {}, unpairedData: [] };
    }

    data.forEach((row, index) => {
        if (index % 100 === 0) {
            console.log(`Processing SVI row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row[uredColumn] || !row[statusColumn] || !row[barcodeColumn]) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row[uredColumn].toString().trim();
        const status = row[statusColumn].toString().trim();
        
        if (index < 3) {
            console.log('Processing SVI row:', { ured, status });
        }
        
        // Check if status indicates successful delivery - updated to match chart criteria
        const isSuccessful = status.includes('Uručeno u roku D+3') || status.includes('Neuručena pošiljka');

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, isSuccessful });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            if (isSuccessful) {
                voditeljStats[voditelj].successful++;
            }
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate success rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(1) : '0.0'
        };
    });

    return results;
}

// Process JB sheet
function processJBSheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('JB Raw Data:', data.slice(0, 3));
    console.log('JB Column Names:', Object.keys(data[0] || {}));
    
    const voditeljStats = {};
    const unpairedData = [];

    // Pronađi točne nazive stupaca
    const columnNames = Object.keys(data[0] || {});
    console.log('Looking for columns in JB sheet:', columnNames);

    // Traži stupac za ured - fleksibilnije pretraživanje
    const uredColumn = columnNames.find(name => 
        name.includes('PU') && (name.includes('zaduženja') || name.includes('zaduzenja'))
    );
    const statusColumn = columnNames.find(name => 
        name.toLowerCase().includes('status')
    );
    const barcodeColumn = columnNames.find(name => 
        name.toLowerCase().includes('prijamni') || 
        name.toLowerCase().includes('broj pošiljke') ||
        name.toLowerCase().includes('broj posiljke')
    );

    console.log('Found columns in JB:', {
        uredColumn,
        statusColumn,
        barcodeColumn
    });

    if (!uredColumn || !statusColumn || !barcodeColumn) {
        console.error('Missing required columns in JB sheet. Found:', {
            uredColumn,
            statusColumn,
            barcodeColumn
        });
        return { voditeljStats: {}, unpairedData: [] };
    }

    data.forEach((row, index) => {
        if (index % 100 === 0) {
            console.log(`Processing JB row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row[uredColumn] || !row[statusColumn] || !row[barcodeColumn]) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row[uredColumn].toString().trim();
        const status = row[statusColumn].toString().trim();
        
        if (index < 3) {
            console.log('Processing JB row:', { ured, status });
        }
        
        // Check if status indicates successful delivery - updated to match chart criteria
        const isSuccessful = status.includes('Uručeno u roku D+3') || status.includes('Neuručena pošiljka');

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, isSuccessful });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            if (isSuccessful) {
                voditeljStats[voditelj].successful++;
            }
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate success rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(1) : '0.0'
        };
    });

    return results;
}

// Process J sheet
function processJSheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('J Raw Data:', data.slice(0, 3));
    console.log('J Column Names:', Object.keys(data[0] || {}));
    
    const voditeljStats = {};
    const unpairedData = [];

    data.forEach((row, index) => {
        if (index % 100 === 0) {
            console.log(`Processing J row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row['Ured pripreme za D/I'] || !row['Status'] || !row['Prijamni broj']) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row['Ured pripreme za D/I'].toString().trim();
        const status = row['Status'].toString().trim();
        
        if (index < 3) {
            console.log('Processing J row:', { ured, status });
        }
        
        // Check if status indicates successful delivery
        const isSuccessful = ['Uručeno u roku D+3', 'Vraćeno'].includes(status);

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, isSuccessful });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            if (isSuccessful) {
                voditeljStats[voditelj].successful++;
            }
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate success rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: stats.total > 0 ? (stats.successful / stats.total * 100).toFixed(1) : '0.0'
        };
    });

    console.log('J Final Results:', {
        totalRows: data.length,
        processedVoditelji: Object.keys(voditeljStats),
        unpairedCount: unpairedData.length,
        results: {
            voditeljStats: Object.fromEntries(
                Object.entries(results.voditeljStats).map(([k, v]) => [
                    k,
                    {
                        total: v.total,
                        successful: v.successful,
                        successRate: v.successRate
                    }
                ])
            ),
            unpairedCount: unpairedData.length
        }
    });
    
    return results;
}

// Process P24 sheet
function processP24Sheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('P24 Raw Data:', data.slice(0, 3));
    console.log('P24 Column Names:', Object.keys(data[0] || {}));
    
    const voditeljStats = {};
    const unpairedData = [];

    data.forEach((row, index) => {
        if (index % 100 === 0) {
            console.log(`Processing P24 row ${index}:`, row);
        }

        // Provjeri je li redak ima potrebne podatke
        if (!row['DPU'] || row['KVALITETA'] === undefined) {
            console.log('Missing required data in row:', row);
            return;
        }

        const ured = row['DPU'].toString().trim();
        // Parsiranje kvalitete - očekujemo broj
        let kvaliteta = row['KVALITETA'];
        
        // Ako je string (postotak), pretvorimo ga u broj
        if (typeof kvaliteta === 'string') {
            // Ukloni znak postotka i zamijeni zarez s točkom
            kvaliteta = parseFloat(kvaliteta.replace('%', '').replace(',', '.'));
        }
        // Ako je već broj, samo ga pretvorimo u float
        else if (typeof kvaliteta === 'number') {
            kvaliteta = parseFloat(kvaliteta);
        }

        // Provjera je li kvaliteta valjani broj
        if (isNaN(kvaliteta)) {
            console.log(`Invalid kvaliteta value for ured ${ured}:`, row['KVALITETA']);
            return;
        }

        // Ako je kvaliteta u decimalnom formatu (npr. 0.9635), pretvori u postotak
        if (kvaliteta <= 1) {
            kvaliteta = kvaliteta * 100;
        }

        // Debug log za prvih nekoliko redova
        if (index < 3) {
            console.log('Processing P24 row:', { ured, kvaliteta, originalKvaliteta: row['KVALITETA'] });
        }

        // Find matching voditelj
        let voditelj = null;
        
        // First try exact match
        voditelj = VODITELJI_MAPPING[ured];
        
        // If no exact match, try range matching
        if (!voditelj) {
            const uredNum = parseInt(ured);
            if (!isNaN(uredNum)) {
                // Find all matching ranges
                const matchingRanges = Object.entries(RANGE_MAPPING).filter(([range]) => {
                    const [start, end] = cleanRangeString(range).split('-').map(num => parseInt(num));
                    return uredNum >= start && uredNum <= end;
                });
                
                // If we found matching ranges, use the most specific one (smallest range)
                if (matchingRanges.length > 0) {
                    // Sort ranges by size (ascending) - smaller range = more specific
                    const sortedRanges = matchingRanges.sort(([rangeA], [rangeB]) => {
                        const [startA, endA] = cleanRangeString(rangeA).split('-').map(num => parseInt(num));
                        const [startB, endB] = cleanRangeString(rangeB).split('-').map(num => parseInt(num));
                        return (endA - startA) - (endB - startB);
                    });
                    
                    // Use the most specific range (first one after sorting)
                    voditelj = RANGE_MAPPING[sortedRanges[0][0]];
                }
            }
        }

        if (voditelj) {
            if (index < 3) {
                console.log('Matched voditelj:', { ured, voditelj, kvaliteta });
            }
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    total: 0,
                    successful: 0,
                    kvalitete: [],
                    uredi: [],
                    packages: []
                };
            }
            voditeljStats[voditelj].total++;
            voditeljStats[voditelj].kvalitete.push(kvaliteta);
            voditeljStats[voditelj].uredi.push({
                ured: ured,
                kvaliteta: kvaliteta
            });
            voditeljStats[voditelj].packages.push({
                ...row,
                isSuccessful: true
            });
        } else if (ured) {
            console.log('Unmatched ured:', ured);
            unpairedData.push(row);
        }
    });

    // Calculate average quality rates
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        // Calculate average quality - ensure we're working with valid numbers
        const validKvalitete = stats.kvalitete.filter(k => !isNaN(k));
        const avgKvaliteta = validKvalitete.length > 0 
            ? validKvalitete.reduce((a, b) => a + b, 0) / validKvalitete.length
            : 0;
        
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: avgKvaliteta.toFixed(2),
            uredi: stats.uredi.sort((a, b) => b.kvaliteta - a.kvaliteta) // Sort by quality descending
        };
    });

    console.log('P24 Final Results:', {
        totalRows: data.length,
        processedVoditelji: Object.keys(voditeljStats),
        unpairedCount: unpairedData.length,
        results: {
            voditeljStats: Object.fromEntries(
                Object.entries(results.voditeljStats).map(([k, v]) => [
                    k,
                    {
                        total: v.total,
                        successful: v.total,
                        successRate: v.successRate,
                        uredi: v.uredi
                    }
                ])
            ),
            unpairedCount: unpairedData.length
        }
    });
    
    return results;
}

// Calculate rankings and display results
function calculateAndDisplayRankings(results) {
    // Store results globally
    globalAnalysisResults = results;
    
    console.log('Calculating rankings with:', results);
    
    const rankings = {};
    const pointValues = {
        EMF: 3,
        J: 2,
        SVI: 4,
        JB: 4,
        P24: 5,
        SASP: 2  // Adding SASP-MMR point value
    };

    // Process EMF rankings (instead of EMD)
    if (results.EMF) {
        const emfRankings = calculateRankingsForType(results.EMF.voditeljStats);
        Object.entries(emfRankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].EMF = rank * pointValues.EMF; // Using same point value as before
        });
    }

    // Process J rankings
    if (results.J) {
        const jRankings = calculateRankingsForType(results.J.voditeljStats);
        Object.entries(jRankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].J = rank * pointValues.J;
        });
    }

    // Process SVI rankings - using adjusted stats
    if (results.SVI) {
        // Calculate adjusted stats for SVI
        const adjustedSVIStats = {};
        Object.entries(results.SVI.voditeljStats).forEach(([voditelj, stat]) => {
            const packages = stat.packages || [];
            const total = packages.length;
            const successful = packages.filter(p => 
                p['STATUS']?.includes('Uručeno u roku D+3') || 
                p['STATUS']?.includes('Neuručena pošiljka')
            ).length;
            adjustedSVIStats[voditelj] = {
                ...stat,
                total,
                successful,
                successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0'
            };
        });
        
        const sviRankings = calculateRankingsForType(adjustedSVIStats);
        Object.entries(sviRankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].SVI = rank * pointValues.SVI;
        });
    }

    // Process JB rankings - using adjusted stats
    if (results.JB) {
        // Calculate adjusted stats for JB
        const adjustedJBStats = {};
        Object.entries(results.JB.voditeljStats).forEach(([voditelj, stat]) => {
            const packages = stat.packages || [];
            const total = packages.length;
            const successful = packages.filter(p => 
                p['STATUS']?.includes('Uručeno u roku D+3') || 
                p['STATUS']?.includes('Neuručena pošiljka')
            ).length;
            adjustedJBStats[voditelj] = {
                ...stat,
                total,
                successful,
                successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0'
            };
        });
        
        const jbRankings = calculateRankingsForType(adjustedJBStats);
        Object.entries(jbRankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].JB = rank * pointValues.JB;
        });
    }

    // Process P24 rankings
    if (results.P24) {
        const p24Rankings = calculateRankingsForType(results.P24.voditeljStats);
        Object.entries(p24Rankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].P24 = rank * pointValues.P24;
        });
    }

    // Process SASP-MMR rankings
    if (results.SASP) {
        const saspRankings = calculateRankingsForType(results.SASP.voditeljStats);
        Object.entries(saspRankings).forEach(([voditelj, rank]) => {
            if (!rankings[voditelj]) rankings[voditelj] = { EMF: 0, J: 0, SVI: 0, JB: 0, P24: 0, SASP: 0, total: 0 };
            rankings[voditelj].SASP = rank * pointValues.SASP;
        });
    }

    // Calculate total points and sort
    Object.keys(rankings).forEach(voditelj => {
        rankings[voditelj].total = rankings[voditelj].EMF + 
                                 rankings[voditelj].J + rankings[voditelj].SVI + 
                                 rankings[voditelj].JB + rankings[voditelj].P24 + 
                                 rankings[voditelj].SASP;
    });

    const sortedRankings = Object.entries(rankings)
        .sort(([,a], [,b]) => b.total - a.total)
        .map(([voditelj, points], index) => ({
            voditelj,
            ...points,
            rank: index + 1
        }));

    console.log('Sorted Rankings:', sortedRankings);

    // Update table
    updateRankingTable(sortedRankings);

    // Update charts
    if (results.EMF) updateEMDChart(results.EMF.voditeljStats);
    if (results.SVI) updateSVIChart(results.SVI.voditeljStats);
    if (results.JB) updateJBChart(results.JB.voditeljStats);
    if (results.J) updateJChart(results.J.voditeljStats);
    if (results.P24) updateP24Chart(results.P24.voditeljStats);
    if (results.SASP) updateSASPChart(results.SASP.voditeljStats);
}

// Calculate rankings for a specific type
function calculateRankingsForType(stats) {
    const sortedVoditelji = Object.entries(stats)
        .sort(([,a], [,b]) => parseFloat(b.successRate) - parseFloat(a.successRate));
    
    const rankings = {};
    sortedVoditelji.forEach(([voditelj], index) => {
        rankings[voditelj] = sortedVoditelji.length - index; // Best gets highest number
    });

    return rankings;
}

// Update ranking table
function updateRankingTable(rankings) {
    const tableBody = document.querySelector('#rankingTable tbody');
    tableBody.innerHTML = '';

    // Add CSS styles for equal column widths
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #rankingTable th:nth-child(n+3):nth-child(-n+8),
        #rankingTable td:nth-child(n+3):nth-child(-n+8) {
            width: 80px;
            min-width: 80px;
            max-width: 80px;
        }
        #rankingTable th:first-child,
        #rankingTable td:first-child {
            width: 50px;
            min-width: 50px;
            max-width: 50px;
        }
        #rankingTable th:nth-child(2),
        #rankingTable td:nth-child(2) {
            min-width: 150px;
        }
        #rankingTable th:last-child,
        #rankingTable td:last-child {
            width: 80px;
            min-width: 80px;
            max-width: 80px;
        }
    `;
    document.head.appendChild(styleElement);

    // Pronađi min i max vrijednosti za svaki stupac
    const columns = ['EMF', 'J', 'SVI', 'JB', 'P24', 'SASP'];
    const minMax = {};
    columns.forEach(col => {
        const values = rankings.map(r => r[col]);
        minMax[col] = {
            min: Math.min(...values),
            max: Math.max(...values)
        };
    });

    rankings.forEach(ranking => {
        const row = document.createElement('tr');
        
        // Dodaj ćeliju za rang (prva)
        const rankCell = document.createElement('td');
        rankCell.textContent = ranking.rank;
        row.appendChild(rankCell);

        // Dodaj ćeliju za voditelja
        const voditeljCell = document.createElement('td');
        voditeljCell.className = 'text-start';
        voditeljCell.textContent = ranking.voditelj;
        row.appendChild(voditeljCell);

        // Dodaj obojane ćelije za bodove
        columns.forEach(col => {
            const cell = document.createElement('td');
            cell.textContent = ranking[col];
            cell.style.backgroundColor = getColorForValue(
                ranking[col],
                minMax[col].min,
                minMax[col].max
            );
            row.appendChild(cell);
        });

        // Dodaj ćeliju za ukupno
        const totalCell = document.createElement('td');
        totalCell.textContent = ranking.total;
        row.appendChild(totalCell);

        tableBody.appendChild(row);
    });

    // Update points distribution chart
    updatePointsDistributionChart(rankings);
}

// Function to update points distribution chart
function updatePointsDistributionChart(rankings) {
    const ctx = document.getElementById('pointsDistributionChart').getContext('2d');
    
    if (pointsDistributionChart) {
        pointsDistributionChart.destroy();
    }

    // Sort rankings by total points descending
    const sortedRankings = [...rankings].sort((a, b) => b.total - a.total);

    // Prepare data for the chart
    const data = {
        labels: sortedRankings.map(r => r.voditelj),
        datasets: [
            {
                label: 'EMF',
                data: sortedRankings.map(r => r.EMF),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.4
            },
            {
                label: 'J',
                data: sortedRankings.map(r => r.J),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                tension: 0.4
            },
            {
                label: 'SVI',
                data: sortedRankings.map(r => r.SVI),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4
            },
            {
                label: 'JB',
                data: sortedRankings.map(r => r.JB),
                borderColor: 'rgba(153, 102, 255, 1)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                tension: 0.4
            },
            {
                label: 'P24',
                data: sortedRankings.map(r => r.P24),
                borderColor: 'rgba(255, 159, 64, 1)',
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                tension: 0.4
            },
            {
                label: 'SASP',
                data: sortedRankings.map(r => r.SASP),
                borderColor: 'rgba(255, 182, 193, 1)',       // Pink
                backgroundColor: 'rgba(255, 182, 193, 0.2)', // Light pink
                tension: 0.4
            }
        ]
    };

    pointsDistributionChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Distribucija bodova po analizi'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Bodovi'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Voditelji'
                    }
                }
            }
        }
    });
}

// Update EMD chart
function updateEMDChart(stats) {
    const ctx = document.getElementById('emdChart').getContext('2d');
    
    if (emfChart) {
        emfChart.destroy();
    }

    const data = {
        labels: Object.keys(stats),
        datasets: [{
            label: 'Uspješnost (%)',
            data: Object.values(stats).map(s => parseFloat(s.successRate)),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    emfChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const voditelj = Object.keys(stats)[index];
                    const voditeljStats = stats[voditelj];
                    
                    // Filter unsuccessful packages - check if package is NOT successful
                    const unsuccessfulPackages = voditeljStats.packages.filter(p => !p.isSuccessful);
                    
                    // Create and show modal with unsuccessful packages
                    showUnsuccessfulPackagesModal(voditelj, unsuccessfulPackages);
                }
            },
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Međunarodni ekspres kvaliteta'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = stats[voditelj];
                            return [
                                `Uspješnost: ${voditeljStats.successRate}%`,
                                `Uspješno: ${voditeljStats.successful} pošiljki`,
                                `Neuspješno: ${voditeljStats.total - voditeljStats.successful} pošiljki`,
                                `Ukupno: ${voditeljStats.total} pošiljki`,
                                '',
                                'Kliknite za prikaz neuspješnih dostava'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Uspješnost (%)'
                    }
                }
            }
        }
    });
}

// Update SVI chart
function updateSVIChart(stats) {
    const ctx = document.getElementById('sviChart').getContext('2d');
    
    if (sviChart) {
        sviChart.destroy();
    }

    // Recalculate stats based on the same criteria used in the details modal
    const adjustedStats = {};
    Object.entries(stats).forEach(([voditelj, stat]) => {
        const packages = stat.packages || [];
        const total = packages.length;
        const successful = packages.filter(p => 
            p['STATUS']?.includes('Uručeno u roku D+3') || 
            p['STATUS']?.includes('Neuručena pošiljka')
        ).length;
        adjustedStats[voditelj] = {
            ...stat,
            total,
            successful,
            successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0'
        };
    });

    const data = {
        labels: Object.keys(adjustedStats),
        datasets: [{
            label: 'Uspješnost (%)',
            data: Object.values(adjustedStats).map(s => parseFloat(s.successRate)),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    sviChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const voditelj = Object.keys(stats)[index];
                    const voditeljStats = stats[voditelj];
                    
                    // Filter packages that don't have status 'Uručeno u roku D+3'
                    const unsuccessfulPackages = voditeljStats.packages.filter(p => 
                        !p['STATUS']?.includes('Uručeno u roku D+3')
                    );
                    
                    // Create and show modal with unsuccessful packages
                    showUnsuccessfulPackagesModal(voditelj, unsuccessfulPackages);
                }
            },
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'SVI kvaliteta'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = adjustedStats[voditelj];
                            return [
                                `Uspješnost: ${voditeljStats.successRate}%`,
                                `Uspješno: ${voditeljStats.successful} pošiljki`,
                                `Neuspješno: ${voditeljStats.total - voditeljStats.successful} pošiljki`,
                                `Ukupno: ${voditeljStats.total} pošiljki`,
                                '',
                                'Kliknite za prikaz neuspješnih dostava'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Uspješnost (%)'
                    }
                }
            }
        }
    });
}

// Update JB chart
function updateJBChart(stats) {
    const ctx = document.getElementById('jbChart').getContext('2d');
    
    if (jbChart) {
        jbChart.destroy();
    }

    // Recalculate stats based on the same criteria used in the details modal
    const adjustedStats = {};
    Object.entries(stats).forEach(([voditelj, stat]) => {
        const packages = stat.packages || [];
        const total = packages.length;
        const successful = packages.filter(p => 
            p['STATUS']?.includes('Uručeno u roku D+3') || 
            p['STATUS']?.includes('Neuručena pošiljka')
        ).length;
        adjustedStats[voditelj] = {
            ...stat,
            total,
            successful,
            successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0'
        };
    });

    const data = {
        labels: Object.keys(adjustedStats),
        datasets: [{
            label: 'Uspješnost (%)',
            data: Object.values(adjustedStats).map(s => parseFloat(s.successRate)),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
        }]
    };

    jbChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const voditelj = Object.keys(stats)[index];
                    const voditeljStats = stats[voditelj];
                    
                    // Filter packages that don't have status 'Uručeno u roku D+3'
                    const unsuccessfulPackages = voditeljStats.packages.filter(p => 
                        !p['STATUS']?.includes('Uručeno u roku D+3')
                    );
                    
                    // Create and show modal with unsuccessful packages
                    showUnsuccessfulPackagesModal(voditelj, unsuccessfulPackages);
                }
            },
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'JB kvaliteta'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = adjustedStats[voditelj];
                            return [
                                `Uspješnost: ${voditeljStats.successRate}%`,
                                `Uspješno: ${voditeljStats.successful} pošiljki`,
                                `Neuspješno: ${voditeljStats.total - voditeljStats.successful} pošiljki`,
                                `Ukupno: ${voditeljStats.total} pošiljki`,
                                '',
                                'Kliknite za prikaz neuspješnih dostava'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Uspješnost (%)'
                    }
                }
            }
        }
    });
}

// Update J chart
function updateJChart(stats) {
    const ctx = document.getElementById('jChart').getContext('2d');
    
    if (jChart) {
        jChart.destroy();
    }

    const data = {
        labels: Object.keys(stats),
        datasets: [{
            label: 'Uspješnost (%)',
            data: Object.values(stats).map(s => parseFloat(s.successRate)),
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
        }]
    };

    jChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const voditelj = Object.keys(stats)[index];
                    const voditeljStats = stats[voditelj];
                    
                    // Filter unsuccessful packages - check if package is NOT successful
                    const unsuccessfulPackages = voditeljStats.packages.filter(p => !p.isSuccessful);
                    
                    // Create and show modal with unsuccessful packages
                    showUnsuccessfulPackagesModal(voditelj, unsuccessfulPackages);
                }
            },
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'J kvaliteta'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = stats[voditelj];
                            return [
                                `Uspješnost: ${voditeljStats.successRate}%`,
                                `Uspješno: ${voditeljStats.successful} pošiljki`,
                                `Neuspješno: ${voditeljStats.total - voditeljStats.successful} pošiljki`,
                                `Ukupno: ${voditeljStats.total} pošiljki`,
                                '',
                                'Kliknite za prikaz neuspješnih dostava'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Uspješnost (%)'
                    }
                }
            }
        }
    });
}

// Update P24 chart
function updateP24Chart(stats) {
    const ctx = document.getElementById('p24Chart').getContext('2d');
    
    if (p24Chart) {
        p24Chart.destroy();
    }

    const data = {
        labels: Object.keys(stats),
        datasets: [{
            label: 'Kvaliteta (%)',
            data: Object.values(stats).map(s => parseFloat(s.successRate)),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    };

    p24Chart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const voditelj = Object.keys(stats)[index];
                    const voditeljStats = stats[voditelj];
                    
                    // Show modal with DPU list
                    showP24Modal(voditelj, voditeljStats.uredi);
                }
            },
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(1) + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'P24 kvaliteta'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = stats[voditelj];
                            return [
                                `Prosječna kvaliteta: ${voditeljStats.successRate}%`,
                                `Broj ureda: ${voditeljStats.uredi.length}`,
                                '',
                                'Kliknite za prikaz kvalitete po uredima'
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Kvaliteta (%)'
                    }
                }
            }
        }
    });
}

// Show P24 modal with DPU list
function showP24Modal(voditelj, uredi) {
    const modalHtml = `
        <div class="modal fade" id="p24Modal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Kvaliteta po uredima - ${voditelj}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>DPU</th>
                                        <th>Kvaliteta (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${uredi.map(u => `
                                        <tr>
                                            <td>${u.ured}</td>
                                            <td>${parseFloat(u.kvaliteta).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="exportP24ToExcel('${voditelj}')">
                            <i class="fas fa-file-excel me-2"></i>Izvoz u Excel
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('p24Modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Store data for export
    window.p24Data = {
        voditelj,
        uredi
    };

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('p24Modal'));
    modal.show();
}

// Function to export P24 data to Excel
function exportP24ToExcel(voditelj) {
    const data = window.p24Data;
    if (!data || !data.uredi || data.uredi.length === 0) return;

    // Create worksheet data
    const ws_data = [
        ['DPU', 'Kvaliteta (%)'] // Headers
    ];

    // Add DPU data
    data.uredi.forEach(ured => {
        ws_data.push([
            ured.ured,
            ured.kvaliteta.toFixed(2)
        ]);
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Kvaliteta po uredima');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `P24_kvaliteta_${voditelj}_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
}

// Show modal with unsuccessful packages
function showUnsuccessfulPackagesModal(voditelj, packages) {
    if (packages.length === 0) return;

    // Determine package type based on the first package's properties
    const isEMDEMF = 'Priprema za uručenje - ured' in packages[0] || 'Napomena' in packages[0];
    const isJ = 'Ured pripreme za D/I' in packages[0];

    // Create table rows for packages
    const packageRows = packages.map(pkg => `
        <tr>
            <td>${pkg['Prijamni broj'] || pkg['BARCODE'] || ''}</td>
            <td>${isEMDEMF ? 
                (pkg['Priprema za uručenje - ured'] || pkg['Priprema za uručenje – ured'] || '') :
                isJ ? pkg['Ured pripreme za D/I'] :
                (pkg['1P - PU zaduženja'] || '')}</td>
            <td>${isEMDEMF ? 
                (pkg['Napomena'] || '') :
                (pkg['Status'] || pkg['STATUS'] || '')}</td>
        </tr>
    `).join('');

    const modalHtml = `
        <div class="modal fade" id="unsuccessfulPackagesModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Neuspješne dostave - ${voditelj}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive" style="max-height: 500px;">
                            <table class="table table-striped table-hover" id="unsuccessfulTable">
                                <thead>
                                    <tr>
                                        <th>Prijamni broj</th>
                                        <th>Ured</th>
                                        <th>${isEMDEMF ? 'Napomena' : 'Status'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${packageRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="exportToExcel('${voditelj}')">
                            <i class="fas fa-file-excel me-2"></i>Izvoz u Excel
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('unsuccessfulPackagesModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Store packages data for export
    window.unsuccessfulPackages = packages;
    window.currentVoditelj = voditelj;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('unsuccessfulPackagesModal'));
    modal.show();
}

// Function to export data to Excel
function exportToExcel(voditelj) {
    const packages = window.unsuccessfulPackages;
    if (!packages || packages.length === 0) return;

    // Determine package type
    const isEMDEMF = 'Priprema za uručenje - ured' in packages[0] || 'Napomena' in packages[0];
    const isJ = 'Ured pripreme za D/I' in packages[0];

    // Create worksheet data
    const ws_data = [
        ['Prijamni broj', 'Ured', isEMDEMF ? 'Napomena' : 'Status'] // Headers
    ];

    // Add package data
    packages.forEach(pkg => {
        ws_data.push([
            pkg['Prijamni broj'] || pkg['BARCODE'] || '',
            isEMDEMF ? 
                (pkg['Priprema za uručenje - ured'] || pkg['Priprema za uručenje – ured'] || '') :
                isJ ? pkg['Ured pripreme za D/I'] :
                (pkg['1P - PU zaduženja'] || ''),
            isEMDEMF ? 
                (pkg['Napomena'] || '') :
                (pkg['Status'] || pkg['STATUS'] || '')
        ]);
    });

    // Create workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Neuspješne dostave');

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Neuspjesne_dostave_${voditelj}_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const container = document.querySelector('.upload-container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// Setup event listeners
function setupEventListeners() {
    // Help button
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    
    // About button
    document.getElementById('aboutBtn').addEventListener('click', showAbout);

    // Export complete analysis button
    document.getElementById('exportCompleteBtn').addEventListener('click', exportCompleteAnalysis);

    // Reset and reload button
    document.getElementById('resetBtn').addEventListener('click', resetAndReload);
}

// Show help information
function showHelp() {
    const modalHtml = `
        <div class="modal fade" id="helpModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pomoć - Rang lista</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Učitavanje podataka</h6>
                        <p>Program analizira Excel datoteku koja sadrži listove EMF, J, SVI, JB, P24 i SASP-MMR. Nije nužno da su svi listovi prisutni.</p>
                        
                        <h6>Bodovanje</h6>
                        <ul>
                            <li>EMF: 3 boda</li>
                            <li>J pošiljke: 2 boda</li>
                            <li>SVI i JB: 4 boda</li>
                            <li>P24: 5 bodova</li>
                            <li>SASP-MMR: 2 boda</li>
                        </ul>
                        
                        <h6>Izračun bodova</h6>
                        <p>Za svaku analizu, voditelji se rangiraju po uspješnosti. Najslabiji dobiva 1 bod koji se množi s vrijednošću boda za tu analizu, a svaki sljedeći dobiva bod više.</p>
                        
                        <h6>Uspješna dostava</h6>
                        <p>Dostava se smatra uspješnom ako ima jedan od sljedećih statusa:</p>
                        <p><strong>Za EMF pošiljke (Međunarodni ekspres):</strong></p>
                        <ul>
                            <li>Pokušaj dostave D+1</li>
                            <li>Uručeno D+1</li>
                            <li>Priprema za isporuku D+1</li>
                            <li>Ubačeno u kovčežić D+1</li>
                            <li>Uručeno u kovčežić D+1</li>
                        </ul>
                        <p><strong>Za SVI i JB pošiljke:</strong></p>
                        <ul>
                            <li>Uručeno u roku D+3</li>
                            <li>Neuručena pošiljka</li>
                        </ul>
                        <p><strong>Za J pošiljke:</strong></p>
                        <ul>
                            <li>Uručeno u roku D+3</li>
                            <li>Vraćeno</li>
                        </ul>
                        <p><strong>Za P24 pošiljke:</strong></p>
                        <p>Kvaliteta se računa kao prosjek kvalitete svih ureda pojedinog voditelja.</p>
                        
                        <p><strong>Za SASP-MMR:</strong></p>
                        <p>Analiza se temelji na toleranciji (%). Voditelji se rangiraju prema apsolutnoj vrijednosti tolerancije, gdje je 0% najbolja vrijednost. Što je tolerancija bliža nuli, to je bolji rang.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('helpModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('helpModal'));
    modal.show();
}

// Show about information
function showAbout() {
    const modalHtml = `
        <div class="modal fade" id="aboutModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">O programu</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <p>© 2025 Andrej Vukić - v1.2.1</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('aboutModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('aboutModal'));
    modal.show();
}

// Function to export complete analysis to Excel
function exportCompleteAnalysis() {
    if (!globalAnalysisResults) {
        showAlert('Nema podataka za izvoz. Molimo prvo učitajte Excel datoteku.', 'warning');
        return;
    }

    // Create workbook
    const wb = XLSX.utils.book_new();

    // Add ranking sheet
    const rankingTable = document.getElementById('rankingTable');
    const rankingWs = XLSX.utils.table_to_sheet(rankingTable);
    XLSX.utils.book_append_sheet(wb, rankingWs, 'Rang lista');

    // Process EMF data if exists
    if (globalAnalysisResults.EMF) {
        const emfData = [['Voditelj', 'Uspješnost (%)', 'Uspješno', 'Neuspješno', 'Ukupno']];
        Object.entries(globalAnalysisResults.EMF.voditeljStats).forEach(([voditelj, stats]) => {
            emfData.push([
                voditelj,
                stats.successRate,
                stats.successful,
                stats.total - stats.successful,
                stats.total
            ]);
        });
        const emfWs = XLSX.utils.aoa_to_sheet(emfData);
        XLSX.utils.book_append_sheet(wb, emfWs, 'Međunarodni ekspres Analiza');
    }

    // Process J data if exists
    if (globalAnalysisResults.J) {
        const jData = [['Voditelj', 'Uspješnost (%)', 'Uspješno', 'Neuspješno', 'Ukupno']];
        Object.entries(globalAnalysisResults.J.voditeljStats).forEach(([voditelj, stats]) => {
            jData.push([
                voditelj,
                stats.successRate,
                stats.successful,
                stats.total - stats.successful,
                stats.total
            ]);
        });
        const jWs = XLSX.utils.aoa_to_sheet(jData);
        XLSX.utils.book_append_sheet(wb, jWs, 'J Analiza');
    }

    // Process SVI data if exists
    if (globalAnalysisResults.SVI) {
        const sviData = [['Voditelj', 'Uspješnost (%)', 'Uspješno', 'Neuspješno', 'Ukupno']];
        Object.entries(globalAnalysisResults.SVI.voditeljStats).forEach(([voditelj, stats]) => {
            // Calculate adjusted stats for SVI
            const packages = stats.packages || [];
            const total = packages.length;
            const successful = packages.filter(p => 
                p['STATUS']?.includes('Uručeno u roku D+3') || 
                p['STATUS']?.includes('Neuručena pošiljka')
            ).length;
            const successRate = total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0';
            
            sviData.push([
                voditelj,
                successRate,
                successful,
                total - successful,
                total
            ]);
        });
        const sviWs = XLSX.utils.aoa_to_sheet(sviData);
        XLSX.utils.book_append_sheet(wb, sviWs, 'SVI Analiza');
    }

    // Process JB data if exists
    if (globalAnalysisResults.JB) {
        const jbData = [['Voditelj', 'Uspješnost (%)', 'Uspješno', 'Neuspješno', 'Ukupno']];
        Object.entries(globalAnalysisResults.JB.voditeljStats).forEach(([voditelj, stats]) => {
            // Calculate adjusted stats for JB
            const packages = stats.packages || [];
            const total = packages.length;
            const successful = packages.filter(p => 
                p['STATUS']?.includes('Uručeno u roku D+3') || 
                p['STATUS']?.includes('Neuručena pošiljka')
            ).length;
            const successRate = total > 0 ? ((successful / total) * 100).toFixed(1) : '0.0';
            
            jbData.push([
                voditelj,
                successRate,
                successful,
                total - successful,
                total
            ]);
        });
        const jbWs = XLSX.utils.aoa_to_sheet(jbData);
        XLSX.utils.book_append_sheet(wb, jbWs, 'JB Analiza');
    }

    // Process P24 data if exists
    if (globalAnalysisResults.P24) {
        const p24Data = [['Voditelj', 'Prosječna kvaliteta (%)', 'Broj ureda']];
        Object.entries(globalAnalysisResults.P24.voditeljStats).forEach(([voditelj, stats]) => {
            p24Data.push([
                voditelj,
                stats.successRate,
                stats.uredi.length
            ]);

            // Add detailed DPU data
            if (stats.uredi.length > 0) {
                p24Data.push(['', '', '']);
                p24Data.push(['DPU', 'Kvaliteta (%)', '']);
                stats.uredi.forEach(ured => {
                    p24Data.push([ured.ured, parseFloat(ured.kvaliteta).toFixed(2), '']);
                });
                p24Data.push(['', '', '']);
            }
        });
        const p24Ws = XLSX.utils.aoa_to_sheet(p24Data);
        XLSX.utils.book_append_sheet(wb, p24Ws, 'P24 Analiza');
    }

    // Process SASP-MMR data if exists
    if (globalAnalysisResults.SASP) {
        const saspData = [['Voditelj', 'Tolerancija', 'Rang', 'Bodovi']];
        Object.entries(globalAnalysisResults.SASP.voditeljStats).forEach(([voditelj, stats]) => {
            saspData.push([
                voditelj,
                stats.tolerancija,
                stats.rank,
                stats.rank * 2
            ]);
        });
        const saspWs = XLSX.utils.aoa_to_sheet(saspData);
        XLSX.utils.book_append_sheet(wb, saspWs, 'SASP-MMR Analiza');
    }

    // Generate filename with current date
    const date = new Date().toISOString().split('T')[0];
    const filename = `Kompletna_analiza_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
}

// Function to reset and reload
function resetAndReload() {
    // Reset global variables
    globalAnalysisResults = null;
    emfChart = null;
    sviChart = null;
    jbChart = null;
    jChart = null;
    p24Chart = null;
    saspChart = null;

    // Clear table
    const tableBody = document.querySelector('#rankingTable tbody');
    if (tableBody) tableBody.innerHTML = '';

    // Hide dashboard and show upload section
    document.getElementById('dashboardContent').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'block';
}

// Funkcija za određivanje boje na temelju vrijednosti
function getColorForValue(value, min, max) {
    // Normaliziramo vrijednost između 0 i 1
    const normalized = (value - min) / (max - min);
    
    // Definiramo tri boje za gradijent (RGBA format)
    const alpha = 0.6;  // Smanjena neprozirnost za pastelni efekt
    const green = [144, 238, 144];    // Light green
    const yellow = [255, 255, 150];   // Light yellow
    const magenta = [255, 130, 255];  // Light magenta
    
    // Računamo boju ovisno o poziciji vrijednosti
    let color;
    if (normalized <= 0.5) {
        // Od magente do žute
        const factor = normalized * 2; // Skaliramo 0-0.5 na 0-1
        color = magenta.map((m, i) => Math.round(m + (yellow[i] - m) * factor));
    } else {
        // Od žute do zelene
        const factor = (normalized - 0.5) * 2; // Skaliramo 0.5-1 na 0-1
        color = yellow.map((y, i) => Math.round(y + (green[i] - y) * factor));
    }
    
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

// Process SASP-MMR sheet
function processSASPSheet(sheet) {
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log('SASP Raw Data:', data);
    console.log('SASP Column Names:', Object.keys(data[0] || {}));
    
    const voditeljStats = {};
    const unpairedData = [];

    // Mapping for SASP-MMR specific voditelj names
    const SASP_VODITELJ_MAPPING = {
        'ĆURIĆ': 'JASENKA ĆURIĆ',
        'MANDIĆ': 'ANĐELA MANDIĆ',
        'VRANJIĆ': 'IVICA VRANJIĆ',
        'VOJVODIĆ': 'SANJA VOJVODIĆ',
        'PILIŽOTA': 'VALENTINA PILIŽOTA',
        'ZORIĆ BEGONJA': 'JOSIPA ZORIĆ-BEGONJA',
        'DEŠIĆ': 'JASNA DEŠIĆ',
        'KULAŠ': 'TOMISLAV KULAŠ',
        'JOSIĆ': 'MARKO JOSIĆ',
        'GAĆINA': 'IVAN GAĆINA'
    };

    // Find the actual column names (case-insensitive)
    const columns = Object.keys(data[0] || {});
    console.log('Available columns:', columns);
    
    const prezimeColumn = columns.find(col => col.toLowerCase() === 'prezime');
    const tolerancijaColumn = columns.find(col => col.toLowerCase() === 'tolerancija');

    console.log('Found columns:', { prezimeColumn, tolerancijaColumn });

    if (!prezimeColumn || !tolerancijaColumn) {
        console.error('Required columns not found. Looking for "Prezime" and "Tolerancija"');
        return { voditeljStats: {}, unpairedData: [] };
    }

    // First pass - collect and normalize tolerance values
    data.forEach((row, index) => {
        console.log(`Processing row ${index}:`, row);

        let prezime = row[prezimeColumn];
        let tolerancija = row[tolerancijaColumn];

        console.log('Raw values:', { prezime, tolerancija });

        // Skip if either value is undefined
        if (prezime === undefined || tolerancija === undefined) {
            console.log('Skipping row due to undefined values');
            return;
        }

        // Convert prezime to string and clean it
        prezime = String(prezime).trim().toUpperCase();
        
        // Convert tolerancija to number and handle percentage values
        if (typeof tolerancija === 'string') {
            // Remove any % sign and convert to number
            tolerancija = Number(tolerancija.replace('%', ''));
        } else {
            tolerancija = Number(tolerancija);
            // If the value is in decimal format (e.g., 0.38), convert to percentage
            if (!isNaN(tolerancija) && Math.abs(tolerancija) <= 1) {
                tolerancija = tolerancija * 100;
            }
        }
        
        console.log('Processed values:', { prezime, tolerancija });

        if (isNaN(tolerancija)) {
            console.log('Warning: Invalid tolerance value:', row[tolerancijaColumn]);
            return;
        }

        const voditelj = SASP_VODITELJ_MAPPING[prezime];
        
        if (voditelj) {
            console.log(`Matched ${prezime} to ${voditelj} with tolerance ${tolerancija}`);
            if (!voditeljStats[voditelj]) {
                voditeljStats[voditelj] = {
                    tolerancija: tolerancija,
                    total: 1,
                    packages: []
                };
            }
            voditeljStats[voditelj].packages.push(row);
        } else {
            console.log('Unmatched prezime:', prezime);
            unpairedData.push(row);
        }
    });

    console.log('Collected voditelj stats:', voditeljStats);

    // Sort voditelji by absolute tolerance value (0 is best)
    const sortedVoditelji = Object.entries(voditeljStats)
        .sort(([,a], [,b]) => Math.abs(a.tolerancija) - Math.abs(b.tolerancija));

    console.log('Sorted voditelji:', sortedVoditelji);

    // Assign ranks (1 is best, increases for worse tolerance)
    let currentRank = 1;
    let lastTolerance = null;
    
    sortedVoditelji.forEach(([voditelj, stats], index) => {
        if (lastTolerance !== Math.abs(stats.tolerancija)) {
            currentRank = index + 1;
            lastTolerance = Math.abs(stats.tolerancija);
        }
        voditeljStats[voditelj].rank = currentRank;
    });

    // Calculate success rates and prepare final results
    const results = {
        voditeljStats: {},
        unpairedData
    };

    Object.entries(voditeljStats).forEach(([voditelj, stats]) => {
        results.voditeljStats[voditelj] = {
            ...stats,
            successRate: ((sortedVoditelji.length - stats.rank + 1) / sortedVoditelji.length * 100).toFixed(1)
        };
    });

    console.log('SASP Final Results:', results);
    return results;
}

// Update SASP chart
function updateSASPChart(stats) {
    const ctx = document.getElementById('saspChart').getContext('2d');
    
    if (saspChart) {
        saspChart.destroy();
    }

    // Sort voditelji by absolute tolerance value (0 is best)
    const sortedVoditelji = Object.entries(stats)
        .sort(([,a], [,b]) => Math.abs(a.tolerancija) - Math.abs(b.tolerancija));

    console.log('SASP Chart Data:', sortedVoditelji);

    const data = {
        labels: sortedVoditelji.map(([voditelj]) => voditelj),
        datasets: [{
            label: 'Tolerancija (%)',
            data: sortedVoditelji.map(([,stats]) => stats.tolerancija),
            backgroundColor: 'rgba(255, 182, 193, 0.2)',  // Light pink
            borderColor: 'rgba(255, 182, 193, 1)',       // Pink
            borderWidth: 1
        }]
    };

    saspChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                datalabels: {
                    color: '#000080',
                    anchor: 'end',
                    align: 'end',
                    offset: -5,
                    formatter: function(value) {
                        return value.toFixed(0) + '%';  // Changed to show whole numbers
                    }
                },
                title: {
                    display: true,
                    text: 'SASP-MMR Tolerancija (%)'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const voditelj = context.label;
                            const voditeljStats = stats[voditelj];
                            return [
                                `Tolerancija: ${voditeljStats.tolerancija.toFixed(0)}%`,  // Changed to show whole numbers
                                `Rang: ${voditeljStats.rank}`,
                                `Bodovi: ${voditeljStats.rank * 2}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Tolerancija (%)'
                    }
                }
            }
        }
    });
} 