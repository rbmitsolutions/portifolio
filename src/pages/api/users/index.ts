import { data } from "../data";

export default function handler(req: any, res: any) {
  if (req.method === "GET") {
    return res.status(200).json(...data.user);
  }
}
