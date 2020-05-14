export const range = (start, end) => {
 return [...Array(end).keys()].map((el) => el + start)
}

// Array(20) Array(20).keys() [...Array(20).keys()].map(el=>el+1)
