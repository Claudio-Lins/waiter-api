import { Request, Response } from 'express'

import { Category } from '../../models/Category'

export async function createCategories(req: Request, res:Response){
  try {
    const { name, icon } = req.body

    const category = await Category.create({
      name,
      icon
    })

    res.status(201).json(category)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
