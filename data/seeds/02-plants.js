exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { id: 1, user_id: 1, nickname: 'Petey', species: 'Piranha Plant', water_schedule: '2020-01-31 14:00', frequency: 1, last_watered: '2019-01-30', image_url: 'https://tinyurl.com/wodheqg' },
        { id: 2, user_id: 1, nickname: 'Patrick', species: 'Piranha Plant', water_schedule: '2020-01-30 21:54', frequency: 2, last_watered: '2019-01-28', image_url: 'https://tinyurl.com/t6s3j8h' },
        { id: 3, user_id: 2, nickname: 'Dale', species: 'Deku Baba', water_schedule: '2020-01-31 14:00', frequency: 2, last_watered: '2019-01-30', image_url: 'https://tinyurl.com/vgoawdg' },
        { id: 4, user_id: 2, nickname: 'Chris', species: 'Korok', water_schedule: '2020-02-01 13:53', frequency: 3, last_watered: '2019-01-31', image_url: 'https://tinyurl.com/suhkcv4' },
        { id: 5, user_id: 3, nickname: 'Fargis', species: 'Foley', water_schedule: '2020-01-31 14:00', frequency: 1, last_watered: '2019-01-30', image_url: 'https://tinyurl.com/trarh5r' },
        { id: 6, user_id: 3, nickname: 'Flo', species: 'Flora', water_schedule: '2020-02-02 17:31', frequency: 1, last_watered: '2019-01-31', image_url: 'https://tinyurl.com/u3vn2e7' },
        { id: 7, user_id: 3, nickname: 'Whispy Woods', species: 'Apple Tree', water_schedule: '2020-02-04 18:12', frequency: 10, last_watered: '2019-01-25', image_url: 'https://tinyurl.com/rvfmncc' },
        { id: 8, user_id: 4, nickname: 'Kyle', species: 'Cacatac', water_schedule: '2020-01-31 14:00', frequency: 7, last_watered: '2019-01-30', image_url: 'https://tinyurl.com/yx62kgej' },
        { id: 9, user_id: 4, nickname: 'Sean', species: 'Spore Spawn', water_schedule: '2020-02-04 09:21', frequency: 5, last_watered: '2019-01-20', image_url: 'https://tinyurl.com/r9g7xjx' },
        { id: 10, user_id: 5, nickname: 'Becky', species: 'Bellsprout', water_schedule: '2020-01-31 14:00', frequency: 1, last_watered: '2019-01-30', image_url: 'https://tinyurl.com/sh3l46v' },
        { id: 11, user_id: 5, nickname: 'Florence', species: 'Flabébé', water_schedule: '2020-01-25 08:28', frequency: 2, last_watered: '2019-01-24', image_url: 'https://tinyurl.com/u2ggsg2' },
        { id: 12, user_id: 5, nickname: 'Dale', species: 'Oddish', water_schedule: '2020-01-21 19:26', frequency: 2, last_watered: '2019-01-20', image_url: 'https://tinyurl.com/tbjquqy' },
        { id: 13, user_id: 5, nickname: 'Barry', species: 'Budew', water_schedule: '2020-01-19 16:42', frequency: 1, last_watered: '2019-01-18', image_url: 'https://tinyurl.com/u9zuto2' }
      ])
    })
}