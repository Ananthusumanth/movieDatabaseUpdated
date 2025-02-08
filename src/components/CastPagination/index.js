import './index.css'

const CastPagination = props => {
  const {totalposts, postPerPage, setCurrentPage, currentPage} = props
  const currentPagePrev = currentPage === 1 ? 1 : currentPage - 1
  const currentPageNext =
    currentPage === Math.ceil(totalposts / postPerPage)
      ? Math.ceil(totalposts / postPerPage)
      : currentPage + 1

  return (
    <div className="pagination-container">
      <button
        type="button"
        disabled={currentPage === 1}
        className={currentPage === 1 ? 'prevNextButtonOver' : 'prevNextButton'}
        onClick={() => setCurrentPage(currentPagePrev)}
      >
        Prev
      </button>
      <p className="currentPage">
        {currentPage} / {Math.ceil(totalposts / postPerPage)}
      </p>
      <button
        type="button"
        disabled={currentPage === Math.ceil(totalposts / postPerPage)}
        className={
          currentPage === Math.ceil(totalposts / postPerPage)
            ? 'prevNextButtonOver'
            : 'prevNextButton'
        }
        onClick={() => setCurrentPage(currentPageNext)}
      >
        Next
      </button>
    </div>
  )
}
export default CastPagination
