import { v4 as uuid } from 'uuid'
import { Request, Response } from 'express'

export default (req: Request, res: Response) => {
	res.statusCode = 200
	res.json({ id: uuid() })
}
