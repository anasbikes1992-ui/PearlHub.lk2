import { Request, Response } from 'express';

export const forceApprove = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Add actual database logic here
  console.log(`[Admin Action] Force approved item: ${id}`);
  res.json({ success: true, message: `Item ${id} force approved.`, id });
};

export const hardDelete = (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Add actual database logic here
  console.log(`[Admin Action] Hard deleted item: ${id}`);
  res.json({ success: true, message: `Item ${id} permanently deleted.`, id });
};
