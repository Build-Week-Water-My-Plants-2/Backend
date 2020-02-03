exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'mario', password: '$2a$08$yEig39gfdB4BTA1/PSgEWeY51njIw0Xa6iuGiIxOaHdKsrCge7HbS', email: 'mario@mushroomkingdom.com', phone_number: 5618293857 },
        { id: 2, username: 'zelda', password: '$2a$08$kaPUcxYjsZvWygk9UJUp4Om/Y0F8TNTcuRy2VOdA0JoVfqX4fHgYi', email: 'zelda@hyrulekingdom.com', phone_number: 7632852541 },
        { id: 3, username: 'kirby', password: '$2a$08$w5lw.Y1pVrJRcP96NHfOWOGYY21uELIIM8daT18JleKXwGhEjP5Ya', email: 'kirby@planetpopstar.com', phone_number: 5864253361 },
        { id: 4, username: 'samus', password: '$2a$08$k76JHVoaKOOvAGCl292F5eOo6QXE6rNvRDU4NO4iUpQVLVTuiqH1y', email: 'samus@planetzebes.com', phone_number: 8643682279 },
        { id: 5, username: 'pikachu', password: '$2a$08$ETdknt0VVgZAKgwpDTlO6uItiDCnJuvzUHJ.qfL8RFswxgjMmn8bG', email: 'pikachu@kanto.com', phone_number: 3579752469 }
      ])
    })
}

//password key unhashed:
  // mario = mushroom
  // zelda = triforce
  // kirby = maxim
  // samus = metroid
  // pikachu = pikapika