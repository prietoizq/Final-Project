# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create name: "Angel", email: "prietoizq@gmail.com", password: "angel", role: "editor"
user2 = User.create name: "Admin", email: "admin@gmail.com", password: "admin", role: "admin"

image1 = user1.images.create title: "aaa", direction: "aaa", description: "aaa", rating: "5"
image2 = user1.images.create title: "aaa", direction: "aaa", description: "aaa", rating: "5"
image3 = user2.images.create title: "aaa", direction: "aaa", description: "aaa", rating: "5"
