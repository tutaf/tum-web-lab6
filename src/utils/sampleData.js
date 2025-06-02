export const sampleMovies = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    status: "watched",
    review: "Mind-bending masterpiece with incredible visuals and a complex narrative that rewards multiple viewings.",
    isFavorite: true,
    dateAdded: "2024-01-15T10:00:00.000Z"
  },
  {
    id: 2,
    title: "The Grand Budapest Hotel",
    director: "Wes Anderson",
    year: 2014,
    genre: "Comedy",
    rating: 8.1,
    status: "watched",
    review: "Visually stunning with Anderson's signature style. Ralph Fiennes delivers a perfect performance.",
    isFavorite: true,
    dateAdded: "2024-01-20T14:30:00.000Z"
  },
  {
    id: 3,
    title: "Dune: Part Two",
    director: "Denis Villeneuve",
    year: 2024,
    genre: "Sci-Fi",
    rating: null,
    status: "want-to-watch",
    review: "",
    isFavorite: false,
    dateAdded: "2024-02-01T09:15:00.000Z"
  },
  {
    id: 4,
    title: "Parasite",
    director: "Bong Joon-ho",
    year: 2019,
    genre: "Thriller",
    rating: 9.2,
    status: "watched",
    review: "Brilliant social commentary wrapped in a thrilling narrative. Every shot is purposeful.",
    isFavorite: true,
    dateAdded: "2024-01-25T16:45:00.000Z"
  },
  {
    id: 5,
    title: "Everything Everywhere All at Once",
    director: "Daniels",
    year: 2022,
    genre: "Adventure",
    rating: 8.9,
    status: "watching",
    review: "Creative and emotional journey through multiple universes. Michelle Yeoh is phenomenal.",
    isFavorite: false,
    dateAdded: "2024-02-10T11:20:00.000Z"
  },
  {
    id: 6,
    title: "The Batman",
    director: "Matt Reeves",
    year: 2022,
    genre: "Action",
    rating: 7.8,
    status: "watched",
    review: "Dark and gritty take on Batman. Great cinematography and Robert Pattinson's solid performance.",
    isFavorite: false,
    dateAdded: "2024-01-30T13:10:00.000Z"
  }
]

export const addSampleData = (setMovies) => {
  const existingMovies = JSON.parse(localStorage.getItem('movies') || '[]')
  if (existingMovies.length === 0) {
    setMovies(sampleMovies)
  }
}