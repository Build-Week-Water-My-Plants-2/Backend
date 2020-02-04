exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { id: 1, user_id: 1, nickname: 'Petey', species: 'Piranha Plant', water_schedule: '2020-01-31 14:00', last_watered: '2019-01-30', image_url: 'https://www.smashbros.com/assets_v2/img/fighter/piranha_plant/main.png' },
        { id: 2, user_id: 1, nickname: 'Patrick', species: 'Piranha Plant', water_schedule: '2020-01-30 21:54', last_watered: '2019-01-28' },
        { id: 3, user_id: 2, nickname: 'Carl', species: 'Deku Baba', water_schedule: '2020-01-31 14:00', last_watered: '2019-01-30' },
        { id: 4, user_id: 2, nickname: 'Pettunia', species: 'Peahat', water_schedule: '2020-02-01 13:53', last_watered: '2019-01-31' },
        { id: 5, user_id: 3, nickname: 'Fargis', species: 'Foley', water_schedule: '2020-01-31 14:00', last_watered: '2019-01-30' },
        { id: 6, user_id: 3, nickname: 'Flo', species: 'Flora', water_schedule: '2020-02-02 17:31', last_watered: '2019-01-31' },
        { id: 7, user_id: 3, nickname: 'Whispy Woods', species: 'Apple Tree', water_schedule: '2020-02-04 18:12', last_watered: '2019-01-25' },
        { id: 8, user_id: 4, nickname: 'Kyle', species: 'Cacatac', water_schedule: '2020-01-31 14:00', last_watered: '2019-01-30' },
        { id: 9, user_id: 4, nickname: 'Sean', species: 'Spore Spawn', water_schedule: '2020-02-04 09:21', last_watered: '2019-01-20' },
        { id: 10, user_id: 5, nickname: 'Becky', species: 'Bellsprout', water_schedule: '2020-01-31 14:00', last_watered: '2019-01-30' },
        { id: 11, user_id: 5, nickname: 'Florence', species: 'Flabébé', water_schedule: '2020-01-25 08:28', last_watered: '2019-01-24' },
        { id: 12, user_id: 5, nickname: 'Dale', species: 'Oddish', water_schedule: '2020-01-21 19:26', last_watered: '2019-01-20' },
        { id: 13, user_id: 5, nickname: 'Barry', species: 'Budew', water_schedule: '2020-01-19 16:42', last_watered: '2019-01-18' }
      ])
    })
}