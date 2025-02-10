import './index.css'

const Pagination = props => {
  const {
    totalposts,
    postPerPage,
    setpage,
    currentPage,
    page,
    totalpages,
  } = props

  const pagePrev = page === 1 ? 1 : page - 1
  const pageNext = page === totalpages ? totalpages : page + 1
  const pagelist = []
  for (let i = 1; i <= Math.ceil(totalposts / postPerPage); i += 1) {
    pagelist.push(i)
  }

  return (
    <div className="main-pagination-container">
      <div className="pageSection">
        <button
          type="button"
          disabled={page === 1}
          className={page === 1 ? 'prevNextButtonOver' : 'prevNextButton'}
          onClick={() => setpage(pagePrev)}
        >
          Prev
        </button>
        <p className="currentPage">{page}</p>
        <button
          type="button"
          disabled={page === totalpages}
          className={
            currentPage === totalpages ? 'prevNextButtonOver' : 'prevNextButton'
          }
          onClick={() => setpage(pageNext)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
export default Pagination
