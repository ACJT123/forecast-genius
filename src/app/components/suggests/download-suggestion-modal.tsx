import { Table } from "antd";
import { DateTime } from "luxon";
import { Margin, usePDF } from "react-to-pdf";

type IDownloadSuggestionModal = {
  suggestions: {
    activity: string;
    time: string;
    description: string;
  }[];
};

export default function DownloadSuggestionModal({
  suggestions,
}: IDownloadSuggestionModal) {
  const { toPDF, targetRef } = usePDF({
    filename: "suggestion.pdf",
    page: {
      margin: Margin.SMALL,
    },
  });

  const date = DateTime.fromISO(suggestions[0].time, { zone: "utc" }).toFormat(
    "yyyy-MM-dd"
  );

  suggestions.map(
    (item) =>
      (item.time = DateTime.fromISO(item.time, { zone: "utc" }).toFormat("t"))
  );

  const columns = [
    {
      title: "Activity",
      dataIndex: "activity",
      key: "activity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  return (
    <>
      <div ref={targetRef}>
        <h1>Date: {date}</h1>

        <Table
          columns={columns}
          dataSource={suggestions}
          className="mt-4"
          pagination={false}
        />
      </div>

      <div className="text-end">
        <button
          className="bg-green-400 p-4 rounded-lg mt-4"
          onClick={() => toPDF()}
        >
          Download PDF
        </button>
      </div>
    </>
  );
}
