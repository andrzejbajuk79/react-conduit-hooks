import React from 'react'
import classNames from 'classnames'
import {range} from '../utils/range'
import {Link} from 'react-router-dom'

const PaginationItem = ({page, url, currentPage}) => {
 //musimy doalczyc dwie klasy jedna na stale i druga dynamicznie
 const liClasses = classNames({
  'page-item': true,
  active: currentPage === page,
 })

 return (
  <li className={liClasses}>
   <Link className="page-link" to={`${url}?page=${page}`}>
    {page}
   </Link>
  </li>
 )
}

export const Pagination = ({total, limit, url, currentPage}) => {
 const pagesCount = Math.ceil(total / limit)
 const pages = range(1, pagesCount)
 // console.log('strony', pages)

 return (
  <ul className="pagination">
   {pages.map((page) => (
    <PaginationItem
     currentPage={currentPage}
     page={page}
     key={page}
     url={url}
    />
   ))}
  </ul>
 )
}

export default Pagination
