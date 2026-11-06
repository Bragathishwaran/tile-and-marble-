/**
 * ServicePro - Admin Dashboard JavaScript
 * Handles Charts (Chart.js), Sidebar Toggling, Table Search & Theme/RTL Synchronization
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------
     1. SIDEBAR TOGGLE & MOBILE DRAWER
     -------------------------------------------------- */
  const sidebar = document.getElementById('dashSidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarOverlay = document.getElementById('dashSidebarOverlay');

  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    });
  }

  /* --------------------------------------------------
     2. TABLE SEARCH & FILTER
     -------------------------------------------------- */
  const tableSearchInput = document.getElementById('tableSearchInput');
  const inquiriesTable = document.getElementById('inquiriesTable');

  if (tableSearchInput && inquiriesTable) {
    tableSearchInput.addEventListener('keyup', () => {
      const query = tableSearchInput.value.toLowerCase();
      const rows = inquiriesTable.querySelectorAll('tbody tr');

      rows.forEach((row) => {
        const text = row.innerText.toLowerCase();
        if (text.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  /* --------------------------------------------------
     3. CHART.JS ANALYTICS (USER PALETTE COLORED)
     -------------------------------------------------- */
  const revenueChartCanvas = document.getElementById('revenueChart');
  const serviceDistributionCanvas = document.getElementById('serviceDistributionChart');

  let revenueChartInstance = null;
  let serviceChartInstance = null;

  const getChartColors = () => {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    return {
      textColor: isDark ? '#b6ad90' : '#656d4a',
      gridColor: isDark ? 'rgba(164, 172, 134, 0.12)' : 'rgba(101, 109, 74, 0.12)',
      tooltipBg: isDark ? '#333d29' : '#414833',
      tooltipText: '#ffffff'
    };
  };

  const initCharts = () => {
    const colors = getChartColors();
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const primaryLine = isDark ? '#a68a64' : '#7f4f24';

    // 1. Revenue & Inquiries Bar/Line Chart
    if (revenueChartCanvas && typeof Chart !== 'undefined') {
      if (revenueChartInstance) revenueChartInstance.destroy();

      const ctxRevenue = revenueChartCanvas.getContext('2d');
      const gradientPrimary = ctxRevenue.createLinearGradient(0, 0, 0, 300);
      gradientPrimary.addColorStop(0, isDark ? 'rgba(166, 138, 100, 0.45)' : 'rgba(127, 79, 36, 0.45)');
      gradientPrimary.addColorStop(1, 'rgba(127, 79, 36, 0.02)');

      revenueChartInstance = new Chart(ctxRevenue, {
        type: 'line',
        data: {
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          datasets: [
            {
              label: 'Installation Revenue ($)',
              data: [42500, 58200, 71400, 68900, 89300, 114500],
              borderColor: primaryLine,
              backgroundColor: gradientPrimary,
              borderWidth: 3,
              fill: true,
              tension: 0.35,
              pointBackgroundColor: primaryLine,
              pointBorderColor: '#ffffff',
              pointRadius: 5,
              pointHoverRadius: 7
            },
            {
              label: 'Target Benchmark ($)',
              data: [40000, 50000, 65000, 75000, 85000, 100000],
              borderColor: '#656d4a',
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: colors.textColor,
                font: { family: 'Outfit', size: 12, weight: '600' }
              }
            },
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              padding: 12,
              callbacks: {
                label: (context) => ` ${context.dataset.label}: $${context.raw.toLocaleString()}`
              }
            }
          },
          scales: {
            x: {
              grid: { color: colors.gridColor },
              ticks: { color: colors.textColor }
            },
            y: {
              grid: { color: colors.gridColor },
              ticks: {
                color: colors.textColor,
                callback: (val) => `$${val / 1000}k`
              }
            }
          }
        }
      });
    }

    // 2. Service Distribution Doughnut Chart (Exact User Palette Tones)
    if (serviceDistributionCanvas && typeof Chart !== 'undefined') {
      if (serviceChartInstance) serviceChartInstance.destroy();

      const ctxDist = serviceDistributionCanvas.getContext('2d');
      serviceChartInstance = new Chart(ctxDist, {
        type: 'doughnut',
        data: {
          labels: ['Italian Marble', 'Porcelain Slabs', 'Granite Counters', 'Stone Restoration', 'Terrazzo Flooring'],
          datasets: [{
            data: [42, 26, 15, 11, 6],
            backgroundColor: [
              '#7f4f24', // Palette 2
              '#936639', // Palette 3
              '#a68a64', // Palette 4
              '#656d4a', // Palette 8
              '#333d29'  // Palette 10
            ],
            borderWidth: 2,
            borderColor: isDark ? '#1f2518' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: colors.textColor,
                padding: 15,
                font: { family: 'Outfit', size: 11, weight: '500' }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => ` ${context.label}: ${context.raw}% of bookings`
              }
            }
          },
          cutout: '72%'
        }
      });
    }
  };

  initCharts();

  window.addEventListener('themeChanged', () => {
    initCharts();
  });

  window.addEventListener('directionChanged', () => {
    initCharts();
  });
});
