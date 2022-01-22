import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { client } from '..';
import { Order } from '../entity/order.entity';
import { User } from '../entity/user.entity';
export const Ambassadors = async (req: Request, res: Response) => {
  res.send(
    await getRepository(User).find({
      is_ambassador: true
    })
  );
};

export const Rankings = async (req: Request, res: Response) => {
  // https://redis.io/commands/ZREVRANGEBYSCORE
  // sendCommand directly to redis and implementing ZREVRANGEBYSCORE
  const result: string[] = await client.sendCommand(['ZREVRANGEBYSCORE', 'rankings', '+inf','-inf', 'WITHSCORES'])

  let name;
  res.send(result.reduce((order, revenue) => {
    if(isNaN(parseInt(revenue))) {
      name = revenue;
      return order;
    } else {
      return {
        ...order,
        [name]: parseInt(revenue)
      }
    }
  }, {}))
};
