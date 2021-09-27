import { NextApiRequest, NextApiResponse } from 'next';

const initialReports = require('../../../data/reports.json');

import { sleep } from '../../../utils/promises';

export const reports = {
  ...initialReports
};

const getReports = async (req: NextApiRequest, res: NextApiResponse) => {
  await sleep(500);
  res.status(200).json(reports);
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getReports(req, res);
  }

  res.status(501).end();
}
