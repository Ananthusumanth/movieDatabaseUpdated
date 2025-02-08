import './index.css'

const Pagination = props => {
  const {
    totalposts,
    postPerPage,
    setpage,
    setCurrentPage,
    currentPage,
    page,
    totalpages,
  } = props
  const pagePrev = page === 1 ? 1 : page - 1
  const pageNext = page === totalpages ? totalpages : page + 1

  // const currentPagePrev = currentPage === 1 ? 1 : currentPage - 1
  // const currentPageNext =
  //   currentPage === Math.ceil(totalposts / postPerPage)
  //     ? Math.ceil(totalposts / postPerPage)
  //     : currentPage + 1

  const pagelist = []
  for (let i = 1; i <= Math.ceil(totalposts / postPerPage); i += 1) {
    pagelist.push(i)
  }

  return (
    <div className="main-pagination-container">
      <div className="currentPageList">
        {pagelist.map(each => (
          <button
            type="button"
            key={each}
            className={currentPage !== each ? 'inActive' : 'Active'}
            onClick={() => setCurrentPage(each)}
          >
            {each}
          </button>
        ))}
      </div>
      <div className="pageSection">
        <button
          type="button"
          disabled={page === 1}
          className={page === 1 ? 'prevNextButtonOver' : 'prevNextButton'}
          onClick={() => setpage(pagePrev)}
        >
          Prev
        </button>
        <p className="currentPage">Page {page}</p>
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
