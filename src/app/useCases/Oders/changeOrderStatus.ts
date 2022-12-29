import { Request, Response } from 'express'
import { io } from '../../..'
import { Order } from '../../models/Order'


export async function changeOrderStatus(req: Request, res:Response){
  try {
    const { orderId } = req.params
    const { status, table } = req.body


    io.emit('orders@status', table, status)

    if (!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)) {
      return res.status(401).json({ error: 'Invalid status' })
    }

    await Order.findByIdAndUpdate(orderId, {
      status
    }, { new: true })

    res.status(204)

  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
