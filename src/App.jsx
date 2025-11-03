import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

  const fetchData = async () => {
    try{
      const result = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      )
      setData(result.data)
    }
    catch(err)
  {
    alert('Error fetching data:', err);
  }
  }

  useEffect(() => {
    
    fetchData()
  }, [])

  // pagination logic
  const indexOfLastRow = currentPage * rowsPerPage
  const indexOfFirstRow = indexOfLastRow - rowsPerPage
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow)
  const totalPages = Math.ceil(data.length / rowsPerPage)

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  return (
    <>
      <h1 className="heading">Employee Data Table</h1>

      <div className="table">
        <table className="table-main">
          <thead style={{ background: 'green' }}>
            <tr style={{ height: '30px', color: 'white' }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((newrow) => (
              <tr
                key={newrow.id}
                style={{ borderBottom: 'solid 1px gray', height: '30px' }}
              >
                <td>{newrow.id}</td>
                <td>{newrow.name}</td>
                <td>{newrow.email}</td>
                <td>{newrow.role}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div
          className="pagination"
          style={{ marginTop: '20px', textAlign: 'center' }}
        >
          <button onClick={handlePrev} >
            ◀ Previous
          </button>

          <span style={{ margin: '0 10px' }}>
           {currentPage}
          </span>

          <button onClick={handleNext}>
            Next ▶
          </button>
        </div>
      </div>
    </>
  )
}

export default App
