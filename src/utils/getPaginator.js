import {parse} from 'query-string'
//liczba wynikow na stronie
export const limit = 10

export const getPaginator = (querySearch) => {
 //chcemy wiedziec na ktorej jestesmy stronie, a dla API
 //musima znac od ktorej strony  zaczac pobieranie
 const parseSearch = parse(querySearch)
 const currentPage = parseSearch.page ? Number(parseSearch.page) : 1

 const offset = currentPage * limit - limit
 //jezeli strona 4 to chcemt pobrac 40-10, czyl od 31-40 w zwyz

 return {currentPage, offset}
}
