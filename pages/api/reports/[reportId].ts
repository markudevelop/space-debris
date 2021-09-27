import { NextApiRequest, NextApiResponse } from 'next';
import { sleep } from '../../../utils/promises';

import { reports } from '../reports';

const putReports = async ({ query: { reportId }, body = {}}: NextApiRequest, res: NextApiResponse) => {
    const { ticketState } = JSON.parse(body);

    if (!reportId && !ticketState) {
        return res.status(400).end();
    }
    const report = reports.elements.find(r => r.id === reportId);

    if (report) {
        await sleep(300);
        // DEMO mutation
        report.state = ticketState;
        res.status(200).json(report);
    } else {
        res.status(400).json({ error: 'Cant find report by reportId '});
    }
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    return putReports(req, res);
  }

  res.status(501).end();
}
