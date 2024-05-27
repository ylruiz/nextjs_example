import { NextApiRequest, NextApiResponse } from "next";

type UserDetails = {
  message: string;
  data?: {
    name: string;
    email: string;
  };
};

let receivedData: { name: string; email: string } | null = null;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserDetails>
  ) {
    if (req.method === 'POST') {
      const { name, email } = req.body;
  
      // Simple validation
      if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
      }
  
      // Store the received data in a variable
      receivedData = { name, email };
  
      return res.status(200).json({
        message: 'Data received successfully',
        data: receivedData,
      });
    } else if (req.method === 'GET') {
      if (receivedData) {
        return res.status(200).json({
          message: 'Data retrieved successfully',
          data: receivedData,
        });
      } else {
        return res.status(200).json({
          message: 'No data available',
        });
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }