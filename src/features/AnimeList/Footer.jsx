/* eslint-disable react/prop-types */
function Footer ({data,pageNum})
{
  const finalpage = data?.pagination?.last_visible_page??0;
const currentPage = data?.pagination?.current_page??0;

    return (
      <ul className="pagination">
        <li>{currentPage}</li>
        <li>{pageNum}</li>
        <li>{pageNum + 1}</li>
        <li>{pageNum+2}</li>
        <li>...</li>
        <li> {finalpage}</li>
      </ul>
    );
}

export default Footer
