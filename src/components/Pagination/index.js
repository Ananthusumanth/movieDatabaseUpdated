import './index.css'

const Pagination = props => {
  const {totalposts, postPerPage, setCurrentPage, currentPage} = props
  let pages = []

  for (let i = 1; i <= Math.ceil(totalposts / postPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className="pagination-container">
      {pages.map((each, index) => {
        return (
          <button
            type="button"
            className={each === currentPage ? 'active' : 'inActive'}
            onClick={() => setCurrentPage(each)}
            key={index}
          >
            {each}
          </button>
        )
      })}
    </div>
  )
}
export default Pagination