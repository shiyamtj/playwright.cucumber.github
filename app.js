let originalData = []
// let originalData = [
//   {
//     folderName: 'report_2024-12-10_00-56-51',
//     linkText: 'report_2024-12-10_00-56-51',
//   },
//   {
//     folderName: 'report_2024-12-10_01-01-57',
//     linkText: 'report_2024-12-10_01-01-57',
//   },
//   {
//     folderName: 'report_2024-12-10_01-02-40',
//     linkText: 'report_2024-12-10_01-02-40',
//   },
//   {
//     folderName: 'report_2024-12-10_01-02-43',
//     linkText: 'report_2024-12-10_01-02-43',
//   },
//   {
//     folderName: 'report_2024-12-10_09-54-31',
//     linkText: 'report_2024-12-10_09-54-31',
//   },
// ]

let filteredData = []

const itemsPerPage = 3
let currentPage = 1

// Fetch data from JSON file
async function loadData() {
  try {
    const response = await fetch('data.json')
    const data = await response.json()
    originalData = data
    filteredData = [...originalData]
    displayData(currentPage)
    setupPagination()
  } catch (error) {
    console.error('Error loading data:', error)
    document.getElementById('dataList').innerHTML = `
          <div class="list-group-item text-center">
              <p class="mb-1">Error loading data. Please try again later.</p>
          </div>
      `
  }
}

function handleSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase()
  filteredData = originalData.filter((item) =>
    item.folderName.toLowerCase().includes(searchTerm)
  )
  currentPage = 1
  displayData(currentPage)
  setupPagination()
}

function displayData(page) {
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const dataList = document.getElementById('dataList')
  dataList.innerHTML = ''

  if (paginatedData.length === 0) {
    dataList.innerHTML = `
          <div class="list-group-item text-center">
              <p class="mb-1">No results found</p>
          </div>
      `
    return
  }

  paginatedData.forEach((item) => {
    dataList.innerHTML += `
          <a href=${item.folderName}/cucumber-report.html class="list-group-item list-group-item-action">
              <h5 class="mb-1">${item.folderName}</h5>
          </a>
      `
  })
}

function setupPagination() {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginationElement = document.getElementById('pagination')
  paginationElement.innerHTML = ''

  if (totalPages <= 1) {
    return
  }

  // Previous button
  paginationElement.innerHTML += `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${
            currentPage - 1
          })">«</a>
      </li>
  `

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    paginationElement.innerHTML += `
          <li class="page-item ${currentPage === i ? 'active' : ''}">
              <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
          </li>
      `
  }

  // Next button
  paginationElement.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" href="#" onclick="changePage(${
            currentPage + 1
          })">»</a>
      </li>
  `
}

function changePage(page) {
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  if (page < 1 || page > totalPages) return
  currentPage = page
  displayData(currentPage)
  setupPagination()
}

// Initialize the application by loading data
document.addEventListener('DOMContentLoaded', loadData)
