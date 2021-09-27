import classNames from "classnames";
import Head from "next/head";
import { useMemo, useState } from "react";

import { pickDebris } from "../api";
import { useReports } from "../hooks/useReports";
import styles from "../styles/Home.module.css";

enum Actions {
  Picked = "PICKED",
  Closed = "CLOSED",
}

const Report = ({ report, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = (reportId, state) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    pickDebris(reportId, state).then(
      () => {
        onSuccess();
      },
      (err) => {
        console.error(err);
        setIsLoading(false);
      }
    );
  };

  return (
    <div className={styles.report}>
      <div className={styles.reportColumn}>
        <span>ID: {report.id.split("-")[0]}</span>
        <span>State: {report.state}</span>
      </div>
      <div className={styles.reportColumn}>
        <span>Type: {report.payload.reportType}</span>
        <span>Message: {report.payload.message}</span>
      </div>
      <div className={styles.reportColumn}>
        {report.state === 'OPEN' && (
          <>
            <span>
              <button
                disabled={isLoading}
                onClick={() => handleAction(report.id, Actions.Closed)}
                className={classNames(styles.reportButton, {
                  [styles.reportButtonDisabled]: isLoading,
                })}
              >
                Destroy
              </button>
            </span>
            <span>
              <button
                disabled={isLoading}
                onClick={() => handleAction(report.id, Actions.Picked)}
                className={classNames(styles.reportButton, {
                  [styles.reportButtonDisabled]: isLoading,
                })}
              >
                Take In
              </button>
            </span>
          </>
        )}
      </div>
    </div>
  );
};

const Reports = ({ reports = [], onSuccess }) => {
  return (
    <div className={styles.reports}>
      {reports.map((report) => (
        <Report key={report.id} report={report} onSuccess={onSuccess} />
      ))}
    </div>
  );
};

export default function Home() {
  const { reports, error, mutate, isValidating } = useReports();

  return (
    <div className={styles.container}>
      <Head>
        <title>Space Debris</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Space Debris!</h1>

        {!reports && !error && <p>Loading reports...</p>}
        {reports && <Reports reports={reports.elements} onSuccess={mutate} />}
      </main>
    </div>
  );
}
