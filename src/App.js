import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';




function App() {
  const [poats, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5
  const lastIndex = currentPage * recordsPerPage
  const firstIndex = lastIndex - recordsPerPage
  const records = poats.slice(firstIndex, lastIndex)
  const upage = Math.ceil(poats.length / recordsPerPage)
  const number = [...Array(upage + 1).keys()].slice(1)
  useEffect(() => {
    update()
  }, [])

  const update = () => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      setPosts(res.data)
    })
  }
  function changeCPage(id) {
    setCurrentPage(id)
  }
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  function nextPage() {
    if (currentPage !== upage) {
      setCurrentPage(currentPage + 1)
    }
  }
  return (
    <div >
      <table className='table'>
        <thead>
          <th>ID</th>
          <th>body</th>
          <th>title</th>
        </thead>
        <tbody>
          {records.map((e, i) => {
            return <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.body}</td>
              <td>{e.title}</td>
            </tr>
          })}
        </tbody>
      </table>
      <nav>
        <ul className='pagination'>
          <li className='page-item'>
            <button className='page-link' onClick={prePage}>Prev</button>
          </li>
          {number.map((n, i) => {
            return <li className={`page-item ${currentPage === n ? 'active' : ''} `} key={i}>
              <button  className='page-link' onClick={() => changeCPage(n)}>{n}</button>
            </li>
          })}
          <li className='page-item'>
            <button  className='page-link' onClick={nextPage}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
