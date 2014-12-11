# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Task.delete_all

Task.create({ description: "Everlane Square zip wallet", completed: true })
Task.create({ description: "Fragrance by Mandy Aftel" })
Task.create({ description: "Knitty Gritty: Knitting for the Absolute Beginner" })
