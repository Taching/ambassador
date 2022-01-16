import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
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
  const ambassadors = await getRepository(User).find({
    is_ambassador: true
  });
  const orderRepository = getRepository(Order);
  res.send(
    ambassadors.map(async (ambassador) => {
      const orders = await orderRepository.find({
        where: {
          user_id: ambassador.id,
          complete: true
        },
        relations: ['order_items']
      });
      return {
        name: ambassador.name,
        revenue: orders.reduce(
          (sum, order) => sum + order.ambassador_revenue,
          0
        )
      };
    })
  );
};
