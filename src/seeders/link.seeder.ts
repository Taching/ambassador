import { createConnection, getRepository } from 'typeorm';
import * as faker from 'faker';
import { randomInt } from 'crypto';
import { Link } from '../entity/link.entity';
import { User } from '../entity/user.entity';

createConnection().then(async () => {
  const repositroy = getRepository(Link);

  for (let i = 0; i < 20; i++) {
    const user = new User();
    user.id = i + 1;
    await repositroy.save({
      code: faker.random.alphaNumeric(6),
      user,
      price: [randomInt(1,20)]
    });
  }

  process.exit();
});
