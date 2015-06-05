# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create name: "Admin", email: "admin@gmail.com", password: "admin", role: "admin"
user2 = User.create name: "Angel", email: "prietoizq@gmail.com", password: "angel"
user3 = User.create name: "User3", email: "user3@gmail.com", password: "3"
user4 = User.create name: "User4", email: "user4@gmail.com", password: "4"
user5 = User.create name: "User5", email: "user5@gmail.com", password: "5"


image1 = user2.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image2 = user2.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image3 = user2.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image4 = user3.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image5 = user3.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image6 = user4.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image7 = user4.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image8 = user5.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
image9 = user5.images.create title: "titulo", direction: "direccion", description: "descripcion", rating: "5"
