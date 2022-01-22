import { createConnection, getRepository } from 'typeorm';
import { createClient } from 'redis';
import { User } from '../entity/user.entity';
import { Order } from '../entity/order.entity';

createConnection().then(async () => {
  const client = createClient({
    url: 'redis://redis:6379'
  });

  await client.connect();

  const ambassadors = await getRepository(User).find({
    is_ambassador: true
  });
  for (let i = 0; i < ambassadors.length; i++) {
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({
      where: {
        user_id: ambassadors[i].id,
        complete: true
      },
      relations: ['order_items']
    });

    const revenue = orders.reduce((sum, order) => sum + order.ambassador_revenue, 0);


    // stored and sorting in redis
    // zAdd and zREVRANGEBYSCORE
    await client.zAdd('rankings', {
        value: ambassadors[i].name,
        score: revenue
    })
  }

  process.exit();
});
