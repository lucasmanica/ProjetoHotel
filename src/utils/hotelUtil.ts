export const imageHotel = (hotelImg: string) => {
  const image = new URL(`../assets/imgs/${hotelImg}.jpg`, import.meta.url)
  return image
}

export const typeSortObject = (type: string) => {
  const typesOfSort: any = {
    price: 'preço',
    rating: 'avaliação',
    rates: 'quantidade de avaliações',
    default: ''
  }
  return typesOfSort[type] || typesOfSort['default']
}
