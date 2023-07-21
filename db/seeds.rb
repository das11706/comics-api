# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)



Comic.destroy_all
Reader.destroy_all
Review.destroy_all




comic_1 = Comic.create( artist: "Stan Lee", title: "Spiderman" )
comic_2 = Comic.create( artist: "Frank Miller", title: "Batman The Dark Knight" )



reader_1 = Reader.create( name: "Agus" )
reader_2 = Reader.create( name: "Carlos" )


review_1 = Review.create( description: "Batman The Dark Knight is a masterpiece.", reader: reader_1, comic: comic_2 )
review_2 = Review.create( description: "Spider-man has amazing art and a great story.", reader: reader_2, comic: comic_1 ) 





