// Required column names in Excel file
const REQUIRED_COLUMNS = [
    'Barcode',
    'ItemType',
    'LastEvent',
    'LastEventNote',
    'StatusDateTime'
];

// Chart instances
let trendChart = null;
let distributionChart = null;
let timeChart = null;

// Global data storage
let globalData = null;
let currentFilters = {
    itemType: 'all',
    status: 'all'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Register Chart.js plugins
    Chart.register(ChartDataLabels);
    
    initializeDropZone();
    initializeCharts();
    setupEventListeners();
    
    // Initialize sidebar toggle
    document.getElementById('sidebarCollapse').addEventListener('click', function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
        // Update charts after sidebar toggle to ensure proper sizing
        if (trendChart) trendChart.resize();
        if (distributionChart) distributionChart.resize();
        if (timeChart) timeChart.resize();
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
        const data = await readExcelFile(file);
        if (validateExcelData(data)) {
            processData(data);
            document.getElementById('uploadSection').style.display = 'none';
            document.getElementById('dashboardContent').style.display = 'block';
        }
    } catch (error) {
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
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Validate Excel data structure
function validateExcelData(data) {
    if (!data || !data.length) {
        showAlert('Excel datoteka je prazna', 'danger');
        return false;
    }

    // Define required and optional columns
    const REQUIRED_COLUMNS_NO_NOTES = [
        'Barcode',
        'ItemType',
        'LastEvent',
        'StatusDateTime'
    ];

    const columns = Object.keys(data[0]);
    
    // Check required columns (excluding LastEventNote)
    const missingColumns = REQUIRED_COLUMNS_NO_NOTES.filter(col => !columns.includes(col));

    if (missingColumns.length) {
        showAlert(`Nedostaju obavezni stupci: ${missingColumns.join(', ')}`, 'danger');
        return false;
    }

    // LastEventNote is optional, no need to validate its presence for each row
    return true;
}

// Process data and update dashboard
function processData(data) {
    globalData = data;
    
    // Initialize filters
    initializeFilters(data);
    
    // Update all visualizations
    updateAnaliza();
}

// Initialize filters
function initializeFilters(data) {
    const itemTypes = [...new Set(data.map(row => row.ItemType))];
    const statuses = [...new Set(data.map(row => row.LastEvent))];
    
    const itemTypeSelect = document.getElementById('itemTypeFilter');
    const statusSelect = document.getElementById('statusFilter');
    
    // Clear existing options
    itemTypeSelect.innerHTML = '<option value="all">Sve vrste</option>';
    statusSelect.innerHTML = '<option value="all">Svi statusi</option>';
    
    // Add new options
    itemTypes.forEach(type => {
        itemTypeSelect.innerHTML += `<option value="${type}">${type}</option>`;
    });
    
    statuses.forEach(status => {
        statusSelect.innerHTML += `<option value="${status}">${status}</option>`;
    });
}

// Update dashboard with current filters
function updateAnaliza() {
    const filteredData = filterData(globalData);
    
    // Update summary statistics
    updateSummaryStats(filteredData);
    
    // Update charts
    updateStatusChart(filteredData);
    updateItemTypeDistribution(filteredData);
    updateTimeChart(filteredData);
    
    // Update detailed analysis table
    updateAnalysisTable(filteredData);
}

// Filter data based on current selections
function filterData(data) {
    return data.filter(row => {
        const matchesItemType = currentFilters.itemType === 'all' || row.ItemType === currentFilters.itemType;
        const matchesStatus = currentFilters.status === 'all' || row.LastEvent === currentFilters.status;
        return matchesItemType && matchesStatus;
    });
}

// Update summary statistics
function updateSummaryStats(data) {
    document.getElementById('totalRecords').textContent = data.length;
    
    const uniqueItemTypes = new Set(data.map(row => row.ItemType)).size;
    document.getElementById('avgRealization').textContent = uniqueItemTypes;

    // Calculate total successful deliveries and total packages
    let totalSuccessful = 0;
    const totalPackages = data.length;
    
    // Count successful deliveries across all package types
    data.forEach(row => {
        const status = row.LastEvent ? row.LastEvent.trim() : '';
        if (status === 'Uruceno' || 
            status === 'Posiljka isporucena primatelju' || 
            status === 'Pošiljka predana u paketomat' ||
            status === 'Prikup posiljaka kod posiljatelja') {
            totalSuccessful++;
        }
    });

    // Calculate and display overall success rate
    const successRate = totalPackages > 0 ? (totalSuccessful / totalPackages * 100).toFixed(1) : '0.0';
    document.getElementById('bestResult').textContent = successRate + '%';
    
    const uniqueStatuses = new Set(data.map(row => row.LastEvent)).size;
    document.getElementById('totalPostmen').textContent = uniqueStatuses;
}

// Initialize charts
function initializeCharts() {
    try {
        const trendCtx = document.getElementById('trendChart').getContext('2d');
        const distributionCtx = document.getElementById('distributionChart').getContext('2d');
        const timeCtx = document.getElementById('timeChart').getContext('2d');

        // Destroy existing charts if they exist
        if (trendChart) trendChart.destroy();
        if (distributionChart) distributionChart.destroy();
        if (timeChart) timeChart.destroy();

        trendChart = new Chart(trendCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const datasetIndex = element.datasetIndex;
                        const index = element.index;
                        
                        const itemType = trendChart.data.labels[index];
                        const status = datasetIndex === 0 ? 'successful' : 'unsuccessful';
                        
                        // Filter packages based on success/failure
                        let filteredPackages = globalData.filter(row => row.ItemType === itemType);
                        if (status === 'successful') {
                            filteredPackages = filteredPackages.filter(row => {
                                const eventStatus = row.LastEvent ? row.LastEvent.trim() : '';
                                return eventStatus === 'Uruceno' || 
                                       eventStatus === 'Posiljka isporucena primatelju' || 
                                       eventStatus === 'Pošiljka predana u paketomat' ||
                                       eventStatus === 'Prikup posiljaka kod posiljatelja';
                            });
                        } else {
                            filteredPackages = filteredPackages.filter(row => {
                                const eventStatus = row.LastEvent ? row.LastEvent.trim() : '';
                                return !(eventStatus === 'Uruceno' || 
                                       eventStatus === 'Posiljka isporucena primatelju' || 
                                       eventStatus === 'Pošiljka predana u paketomat' ||
                                       eventStatus === 'Prikup posiljaka kod posiljatelja');
                            });
                        }
                        
                        // Create and show modal with filtered packages
                        const modalTitle = `${itemType} - ${status === 'successful' ? 'Uspješne' : 'Neuspješne'} dostave`;
                        const modalHtml = `
                            <div class="modal fade" id="packageDetailsModal" tabindex="-1">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">${modalTitle}</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="table-responsive">
                                                <table class="table table-striped" id="packageDetailsTable">
                                                    <thead>
                                                        <tr>
                                                            <th>Barcode</th>
                                                            <th>Status</th>
                                                            <th>Vrijeme statusa</th>
                                                            <th>Napomena</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        ${filteredPackages.map(pkg => `
                                                            <tr>
                                                                <td>${pkg.Barcode}</td>
                                                                <td>${pkg.LastEvent}</td>
                                                                <td>${formatDateTime(pkg.StatusDateTime)}</td>
                                                                <td>${pkg.LastEventNote || ''}</td>
                                                            </tr>
                                                        `).join('')}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" onclick="exportModalTableToExcel('packageDetailsTable', 'detalji_posiljaka')">
                                                <i class='bx bx-download'></i> Izvoz u Excel
                                            </button>
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

                        // Remove existing modal if any
                        const existingModal = document.getElementById('packageDetailsModal');
                        if (existingModal) {
                            existingModal.remove();
                        }

                        // Add modal to document
                        document.body.insertAdjacentHTML('beforeend', modalHtml);

                        // Show modal
                        const modal = new bootstrap.Modal(document.getElementById('packageDetailsModal'));
                        modal.show();
                    }
                },
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20
                        }
                    },
                    datalabels: {
                        color: '#000',
                        anchor: function(context) {
                            return context.datasetIndex === 1 ? 'top' : 'end';
                        },
                        align: function(context) {
                            return context.datasetIndex === 1 ? 'bottom' : 'end';
                        },
                        offset: function(context) {
                            return context.datasetIndex === 1 ? -10 : 0;
                        },
                        formatter: (value) => {
                            if (value > 0) return value;
                            return '';
                        }
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'nearest',
                        intersect: true,
                        callbacks: {
                            label: function(context) {
                                const itemType = context.chart.data.labels[context.dataIndex];
                                const value = context.parsed.y;
                                const total = analysisData[itemType].total;
                                const percentage = ((value / total) * 100).toFixed(1);
                                
                                if (context.datasetIndex === 0) {
                                    return `Uspješno: ${value} (${percentage}%)`;
                                } else {
                                    return `Neuspješno: ${value} (${percentage}%)`;
                                }
                            },
                            footer: function() {
                                return 'Kliknite za detalje';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        },
                        title: {
                            display: true,
                            text: 'Broj pošiljaka'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 20,
                        bottom: 20
                    }
                }
            }
        });

        distributionChart = new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const index = element.index;
                        const itemType = distributionChart.data.labels[index];
                        
                        // Show all packages of selected type
                        showPackageDetails(itemType, 'all');
                    }
                },
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        position: 'left',
                        align: 'center',
                        labels: {
                            padding: 10,
                            boxWidth: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    datalabels: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const dataset = context.chart.data.datasets[0];
                                const total = dataset.data.reduce((acc, data) => acc + data, 0);
                                const value = dataset.data[context.dataIndex];
                                const percentage = ((value * 100) / total).toFixed(1);
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 10,
                        right: 30,
                        top: 20,
                        bottom: 20
                    }
                },
                radius: '80%'
            }
        });

        timeChart = new Chart(timeCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Broj dodijeljenih statusa po satu',
                    data: [],
                    backgroundColor: 'rgba(78, 115, 223, 0.2)',
                    borderColor: '#4e73df',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const element = elements[0];
                        const index = element.index;
                        const hour = timeChart.data.labels[index];
                        
                        // Show packages for selected hour
                        showPackagesByHour(hour);
                    }
                },
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        display: false
                    },
                    datalabels: {
                        display: true,
                        color: '#000',
                        anchor: 'end',
                        align: 'top',
                        formatter: (value) => value || ''
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Broj statusa: ${context.parsed.y}`;
                            },
                            footer: function() {
                                return 'Klikni za detalje';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        title: {
                            display: true,
                            text: 'Vrijeme'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#f0f0f0'
                        },
                        title: {
                            display: true,
                            text: 'Broj dodijeljenih statusa'
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 30,
                        bottom: 20
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing charts:', error);
        showAlert('Greška pri inicijalizaciji grafova: ' + error.message, 'danger');
    }
}

// Get specific color for item type
function getItemTypeColor(itemType) {
    const colorMap = {
        'Paket 24': 'rgba(255, 182, 193, 0.7)',       // Pastel ružičasta s transparentnosti
        'Preporučena pošiljka': 'rgba(135, 206, 235, 0.7)', // Sky Blue s transparentnosti
        'Praćena pošiljka': 'rgba(152, 251, 152, 0.7)',      // Pale Green s transparentnosti
        'Connect paket': 'rgba(255, 160, 122, 0.7)',    // Pastel narančasta s transparentnosti
        'Paket': 'rgba(255, 255, 160, 0.7)',            // Pastel žuta s transparentnosti
        'Pismo': 'rgba(51, 51, 255, 0.7)',              // RGB(51, 51, 255) s transparentnosti
        'EMS': 'rgba(255, 179, 71, 0.7)',               // Pastel narančasta s transparentnosti
        'Mali paket': 'rgba(255, 105, 97, 0.7)'         // Pastel crvena s transparentnosti
    };
    return colorMap[itemType] || 'rgba(211, 211, 211, 0.7)'; // Light gray s transparentnosti
}

// Get status color
function getStatusColor(status) {
    const colorMap = {
        'Delivered': 'rgba(144, 238, 144, 0.7)',    // Pastel zelena s transparentnosti
        'Failed': 'rgba(255, 182, 193, 0.7)',       // Pastel crvena s transparentnosti
        'Returned': 'rgba(255, 160, 122, 0.7)',     // Pastel narančasta s transparentnosti
        'Cancelled': 'rgba(222, 184, 135, 0.7)',    // Pastel smeđa s transparentnosti
        'In Progress': 'rgba(182, 208, 226, 0.7)'   // Pastel plava s transparentnosti
    };
    return colorMap[status] || 'rgba(211, 211, 211, 0.7)'; // Light gray s transparentnosti
}

// Update status chart - shows bars for successful deliveries and line for unsuccessful
function updateStatusChart(data) {
    try {
        const itemTypes = [...new Set(data.map(row => row.ItemType))];
        
        // Get data from analysis table calculations
        const analysisData = {};
        itemTypes.forEach(itemType => {
            const itemTypeData = data.filter(row => row.ItemType === itemType);
            analysisData[itemType] = {
                total: itemTypeData.length,
                delivered: 0,
                failed: 0
            };
            
            // Use the same logic as in updateAnalysisTable
            itemTypeData.forEach(row => {
                const status = row.LastEvent ? row.LastEvent.trim() : '';
                // Check for successful delivery - same for all package types
                if (status === 'Uruceno' || 
                    status === 'Posiljka isporucena primatelju' || 
                    status === 'Pošiljka predana u paketomat' ||
                    status === 'Prikup posiljaka kod posiljatelja') {
                    analysisData[itemType].delivered++;
                }
            });

            // Calculate failed deliveries as total - delivered
            if (itemType !== 'Preporučena pošiljka') {
                analysisData[itemType].failed = analysisData[itemType].total - analysisData[itemType].delivered;
            } else {
                // For Preporučena pošiljka, count failed explicitly
                itemTypeData.forEach(row => {
                    const status = row.LastEvent ? row.LastEvent.trim() : '';
                    if (status === 'Neuruceno' || 
                        status === 'Pošiljka predana u poštanski ured' ||
                        status === 'Neuspješna predaja pošiljke u poštanski ured' ||
                        status === 'Neuspješna predaja pošiljke u paketomat') {
                        analysisData[itemType].failed++;
                    }
                });
            }
        });

        // Prepare data for chart
        const successData = itemTypes.map(itemType => analysisData[itemType].delivered);
        const unsuccessfulData = itemTypes.map(itemType => analysisData[itemType].failed);

        // Update chart data
        trendChart.data.labels = itemTypes;
        trendChart.data.datasets = [
            {
                label: 'Uspješno',
                data: successData,
                backgroundColor: itemTypes.map(itemType => getItemTypeColor(itemType)),
                borderWidth: 1,
                type: 'bar',
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                }
            },
            {
                label: 'Neuspješno',
                data: unsuccessfulData,
                type: 'line',
                borderColor: '#ff4757',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#ff4757',
                pointRadius: 4,
                datalabels: {
                    align: 'top',
                    anchor: 'bottom'
                }
            }
        ];

        // Update chart options
        trendChart.options.plugins.title.text = 'Uspješnost dostave po vrsti pošiljke';
        trendChart.options.scales.y.stacked = false;
        trendChart.options.scales.x.stacked = false;
        
        // Configure datalabels plugin for both datasets
        trendChart.options.plugins.datalabels = {
            display: false  // This will hide all data labels
        };
        
        // Configure tooltip
        trendChart.options.plugins.tooltip = {
            enabled: true,
            mode: 'nearest',
            intersect: true,
            callbacks: {
                label: function(context) {
                    const itemType = context.chart.data.labels[context.dataIndex];
                    const value = context.parsed.y;
                    const total = analysisData[itemType].total;
                    const percentage = ((value / total) * 100).toFixed(1);
                    
                    if (context.datasetIndex === 0) {
                        return `Uspješno: ${value} (${percentage}%)`;
                    } else {
                        return `Neuspješno: ${value} (${percentage}%)`;
                    }
                },
                footer: function() {
                    return 'Kliknite za detalje';
                }
            }
        };
        
        trendChart.update('none');
    } catch (error) {
        console.error('Error updating status chart:', error);
    }
}

// Update item type distribution chart
function updateItemTypeDistribution(data) {
    try {
        const itemTypeCounts = {};
        data.forEach(row => {
            itemTypeCounts[row.ItemType] = (itemTypeCounts[row.ItemType] || 0) + 1;
        });

        const labels = Object.keys(itemTypeCounts);
        const colors = labels.map(itemType => getItemTypeColor(itemType));

        distributionChart.data.labels = labels;
        distributionChart.data.datasets = [{
            data: Object.values(itemTypeCounts),
            backgroundColor: colors
        }];

        distributionChart.update('none');
    } catch (error) {
        console.error('Error updating distribution chart:', error);
    }
}

// Update time trend chart
function updateTimeChart(data) {
    try {
        console.log('Raw data sample:', data.slice(0, 3));
        
        // Initialize hourly data structure
        const hourlyData = {};
        
        // Process each row and count statuses by hour
        data.forEach(row => {
            try {
                // Convert Excel serial date to JavaScript Date
                // Excel serial date is number of days since 1/1/1900
                // Need to adjust for Excel's leap year bug in 1900
                const excelDate = row.StatusDateTime;
                const millisecondsPerDay = 24 * 60 * 60 * 1000;
                const excelEpoch = new Date(1899, 11, 30); // Dec 30, 1899
                const javascriptDate = new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);
                
                console.log('Converting Excel date:', excelDate, 'to:', javascriptDate);
                
                // Get hour from the JavaScript Date
                const hour = javascriptDate.getHours();
                
                // Initialize or increment counter for this hour
                hourlyData[hour] = (hourlyData[hour] || 0) + 1;
            } catch (err) {
                console.warn('Error processing row:', row, err);
            }
        });

        console.log('Hourly data:', hourlyData);

        // Get sorted hours and their counts
        const sortedHours = Object.keys(hourlyData)
            .map(Number)
            .sort((a, b) => a - b);
            
        console.log('Sorted hours:', sortedHours);

        if (sortedHours.length === 0) {
            console.warn('No valid hours found in data');
            return;
        }

        // Prepare data for the chart
        const hourCounts = sortedHours.map(hour => hourlyData[hour]);
        const hourLabels = sortedHours.map(hour => 
            `${hour.toString().padStart(2, '0')}:00`
        );

        console.log('Chart data:', {
            labels: hourLabels,
            counts: hourCounts
        });

        // Update chart data
        timeChart.data.labels = hourLabels;
        timeChart.data.datasets[0].data = hourCounts;
        timeChart.data.datasets[0].backgroundColor = 'rgba(78, 115, 223, 0.5)';
        timeChart.data.datasets[0].borderColor = '#4e73df';

        // Make sure we're using bar type
        timeChart.config.type = 'bar';

        // Update chart options
        timeChart.options.scales.x.type = 'category';
        timeChart.options.plugins.tooltip = {
            callbacks: {
                label: function(context) {
                    return `Broj statusa: ${context.parsed.y}`;
                },
                footer: function() {
                    return 'Klikni za detalje';
                }
            }
        };

        timeChart.update('none');
    } catch (error) {
        console.error('Error updating time chart:', error);
    }
}

// Get delivery status badge based on success rate
function getDeliveryStatusBadge(successRate, itemType) {
    const rate = parseFloat(successRate);
    
    if (itemType === 'Paket 24') {
        if (rate >= 97) {
            return '<span class="badge bg-success">Izvrsno</span>';
        } else if (rate >= 95) {
            return '<span class="badge bg-primary">Dobro</span>';
        } else if (rate >= 90) {
            return '<span class="badge bg-warning">Potrebno poboljšanje</span>';
        } else {
            return '<span class="badge bg-danger">Kritično</span>';
        }
    } else {
        // Za ostale vrste pošiljaka ostaje isto
        if (rate >= 90) {
            return '<span class="badge bg-success">Izvrsno</span>';
        } else if (rate >= 70) {
            return '<span class="badge bg-primary">Dobro</span>';
        } else if (rate < 50) {
            return '<span class="badge bg-danger">Kritično</span>';
        } else {
            return '<span class="badge bg-warning">Potrebno poboljšanje</span>';
        }
    }
}

// Update analysis table with more detailed information
function updateAnalysisTable(data) {
    const tableBody = document.querySelector('#analysisTable tbody');
    tableBody.innerHTML = '';

    // Group data by ItemType
    const itemTypeAnalysis = {};
    data.forEach(row => {
        if (!itemTypeAnalysis[row.ItemType]) {
            itemTypeAnalysis[row.ItemType] = {
                total: 0,
                delivered: 0,
                failed: 0
            };
        }
        
        itemTypeAnalysis[row.ItemType].total++;
        
        // Same success criteria for all package types
        const status = row.LastEvent ? row.LastEvent.trim() : '';
        if (status === 'Uruceno' || 
            status === 'Posiljka isporucena primatelju' || 
            status === 'Pošiljka predana u paketomat' ||
            status === 'Prikup posiljaka kod posiljatelja') {
            itemTypeAnalysis[row.ItemType].delivered++;
        }
    });

    // Create table rows with calculated statistics
    Object.entries(itemTypeAnalysis).forEach(([itemType, stats]) => {
        // Calculate failed as total - delivered for all types
        stats.failed = stats.total - stats.delivered;
        
        const successRate = (stats.delivered / stats.total * 100).toFixed(1);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><a href="#" class="package-type-link" style="text-decoration: none; color: inherit;">${itemType}</a></td>
            <td>${stats.total}</td>
            <td>${stats.delivered}</td>
            <td>${stats.failed}</td>
            <td>${successRate}%</td>
            <td>${getDeliveryStatusBadge(successRate, itemType)}</td>
        `;
        
        // Add click event listener to the package type link
        row.querySelector('.package-type-link').addEventListener('click', (e) => {
            e.preventDefault();
            showPackageDetails(itemType, 'all');
        });
        
        tableBody.appendChild(row);
    });
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

// Setup additional event listeners including filters
function setupEventListeners() {
    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportAnalysis);
    
    // Help button
    document.getElementById('helpBtn').addEventListener('click', showHelp);
    
    // About button
    document.getElementById('aboutBtn').addEventListener('click', showAbout);
    
    // Upload button
    document.getElementById('uploadBtn').addEventListener('click', (e) => {
        e.preventDefault();
        // Reset view to upload section
        const dashboardContent = document.getElementById('dashboardContent');
        const uploadSection = document.getElementById('uploadSection');
        
        dashboardContent.style.display = 'none';
        uploadSection.style.display = 'flex';
    });

    // Filter change events
    document.getElementById('itemTypeFilter').addEventListener('change', () => {
        currentFilters.itemType = document.getElementById('itemTypeFilter').value;
        updateAnaliza();
    });
    
    document.getElementById('statusFilter').addEventListener('change', () => {
        currentFilters.status = document.getElementById('statusFilter').value;
        updateAnaliza();
    });
    
    document.getElementById('resetFilters').addEventListener('click', () => {
        document.getElementById('itemTypeFilter').value = 'all';
        document.getElementById('statusFilter').value = 'all';
        currentFilters.itemType = 'all';
        currentFilters.status = 'all';
        updateAnaliza();
    });
    
    // Sidebar toggle for mobile
    document.getElementById('sidebar').addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            this.classList.toggle('active');
        }
    });
}

// Export analysis
function exportAnalysis() {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    
    // Get table data
    const table = document.getElementById('analysisTable');
    const ws = XLSX.utils.table_to_sheet(table);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Analiza');
    
    // Save file
    XLSX.writeFile(wb, 'analiza_posiljaka.xlsx');
}

// Function to show package details in a modal
window.showPackageDetails = function(itemType, status) {
    // Filter packages based on type and status
    let packages = globalData.filter(row => row.ItemType === itemType);
    
    // If status is not 'all', filter by status as well
    if (status !== 'all') {
        packages = packages.filter(row => row.LastEvent === status);
    }
    
    // Create modal HTML
    const modalHtml = `
        <div class="modal fade" id="packageDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detalji pošiljaka - ${itemType}${status !== 'all' ? ` (${status})` : ''}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped" id="packageDetailsTable">
                                <thead>
                                    <tr>
                                        <th>Barcode</th>
                                        <th>Status</th>
                                        <th>Vrijeme statusa</th>
                                        <th>Napomena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${packages.map(pkg => `
                                        <tr>
                                            <td>${pkg.Barcode}</td>
                                            <td>${pkg.LastEvent}</td>
                                            <td>${formatDateTime(pkg.StatusDateTime)}</td>
                                            <td>${pkg.LastEventNote || ''}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="exportModalTableToExcel('packageDetailsTable', 'detalji_posiljaka')">
                            <i class='bx bx-download'></i> Izvoz u Excel
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('packageDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal using Bootstrap 5 Modal
    const modalElement = document.getElementById('packageDetailsModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Function to show packages for a specific hour
function showPackagesByHour(hour) {
    // Convert hour string (e.g., "08:00") to hour number (8)
    const hourNum = parseInt(hour);
    
    // Filter packages that were processed in the selected hour
    const packages = globalData.filter(row => {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const excelEpoch = new Date(1899, 11, 30);
        const date = new Date(excelEpoch.getTime() + row.StatusDateTime * millisecondsPerDay);
        return date.getHours() === hourNum;
    });
    
    // Create modal HTML
    const modalHtml = `
        <div class="modal fade" id="packageDetailsModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pošiljke obrađene u ${hour}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped" id="hourlyPackagesTable">
                                <thead>
                                    <tr>
                                        <th>Barcode</th>
                                        <th>Vrsta pošiljke</th>
                                        <th>Status</th>
                                        <th>Vrijeme statusa</th>
                                        <th>Napomena</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${packages.map(pkg => `
                                        <tr>
                                            <td>${pkg.Barcode}</td>
                                            <td>${pkg.ItemType}</td>
                                            <td>${pkg.LastEvent}</td>
                                            <td>${formatDateTime(pkg.StatusDateTime)}</td>
                                            <td>${pkg.LastEventNote || ''}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="exportModalTableToExcel('hourlyPackagesTable', 'posiljke_po_satu')">
                            <i class='bx bx-download'></i> Izvoz u Excel
                        </button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zatvori</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('packageDetailsModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('packageDetailsModal'));
    modal.show();
}

// Function to export modal table to Excel
function exportModalTableToExcel(tableId, fileName) {
    const table = document.getElementById(tableId);
    const wb = XLSX.utils.book_new();
    
    // First, get the raw data from the table
    const rows = Array.from(table.querySelectorAll('tr'));
    const data = rows.map(row => Array.from(row.cells).map(cell => cell.textContent));
    
    // Create a new worksheet from the raw data
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Find the column with date/time values
    const dateColumnIndex = data[0].findIndex(header => header === 'Vrijeme statusa');
    
    if (dateColumnIndex !== -1) {
        // Get all packages that match the current view
        let packages;
        if (tableId === 'packageDetailsTable') {
            const itemType = document.querySelector('#packageDetailsModal .modal-title').textContent.split(' - ')[1].split(' (')[0];
            const statusText = document.querySelector('#packageDetailsModal .modal-title').textContent;
            const status = statusText.includes('(') ? statusText.split('(')[1].replace(')', '') : 'all';
            
            packages = globalData.filter(row => row.ItemType === itemType);
            if (status !== 'all') {
                packages = packages.filter(row => row.LastEvent === status);
            }
        } else if (tableId === 'hourlyPackagesTable') {
            const hour = document.querySelector('#packageDetailsModal .modal-title').textContent.split('u ')[1];
            const hourNum = parseInt(hour);
            
            packages = globalData.filter(row => {
                const millisecondsPerDay = 24 * 60 * 60 * 1000;
                const excelEpoch = new Date(1899, 11, 30);
                const date = new Date(excelEpoch.getTime() + row.StatusDateTime * millisecondsPerDay);
                return date.getHours() === hourNum;
            });
        }

        // Format dates for each row (skipping header)
        for (let i = 1; i < data.length; i++) {
            const cellRef = XLSX.utils.encode_cell({ r: i, c: dateColumnIndex });
            const pkg = packages[i - 1]; // -1 because data includes header row
            
            if (pkg) {
                const excelDate = pkg.StatusDateTime;
                const millisecondsPerDay = 24 * 60 * 60 * 1000;
                const excelEpoch = new Date(1899, 11, 30);
                const date = new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);
                
                // Format as d.m.yy h:mm
                const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${String(date.getFullYear()).slice(2)} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
                
                ws[cellRef] = {
                    v: formattedDate,
                    t: 's'
                };
            }
        }
    }
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Pošiljke');
    
    // Save file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
}

// Helper function to format date and time
function formatDateTime(excelDate) {
    try {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const excelEpoch = new Date(1899, 11, 30);
        const date = new Date(excelEpoch.getTime() + excelDate * millisecondsPerDay);
        
        return date.toLocaleString('hr-HR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return '';
    }
}

// Function to show help information
function showHelp() {
    const modalHtml = `
        <div class="modal fade" id="helpModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Pomoć</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Info</h6>
                        <p>Program služi za analizu realizacije poštanskih pošiljaka. Omogućuje učitavanje Excel datoteke s podacima o pošiljkama te prikazuje različite analize i statistike o dostavi.</p>
                        
                        <h6>Zahtjevi za Excel datoteku</h6>
                        <p>Excel datoteka mora sadržavati sljedeće stupce (ostali su opcionalni):</p>
                        <ul>
                            <li><strong>naziv Barcode</strong> - Jedinstveni identifikator pošiljke</li>
                            <li><strong>naziv ItemType</strong> - Vrsta pošiljke</li>
                            <li><strong>naziv LastEvent</strong> - Status pošiljke</li>
                            <li><strong>naziv LastEventNote</strong> - Napomena (opcionalno)</li>
                            <li><strong>naziv StatusDateTime</strong> - Datum i vrijeme zadnjeg statusa</li>
                        </ul>
                        
                        <h6>Funkcionalnosti</h6>
                        <ul>
                            <li>Učitavanje Excel datoteke povlačenjem ili odabirom</li>
                            <li>Filtriranje podataka po vrsti pošiljke i statusu</li>
                            <li>Grafički prikaz statusa pošiljaka</li>
                            <li>Prikaz distribucije vrsta pošiljaka</li>
                            <li>Analiza vremena dodjele statusa</li>
                            <li>Detaljna analiza uspješnosti po vrsti pošiljke</li>
                            <li>Izvoz analize u Excel format</li>
                        </ul>
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

// Function to show about information
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
                        <p>© 2025 Andrej Vukić - v1.3</p>
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