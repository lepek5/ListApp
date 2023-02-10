export const ListRequestFormatter = (req: any, _res: any, next: any) => {
  try {
    const body = req.body;
    const list = {
      listId: body.listId as string,
      listItems: body.listItems as string[]
    }
    req.list = list;
    next()
  } catch (error) {
    next(error instanceof Error ? error.message : `Error formatting list`);
  }
}