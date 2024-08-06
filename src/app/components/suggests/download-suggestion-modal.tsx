import { Table } from "antd";
import { DateTime } from "luxon";
import { Margin, usePDF } from "react-to-pdf";

type IDownloadSuggestionModal = {
  suggestions: {
    activity: string;
    time: DateTime;
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

  const date = suggestions[0].time.toFormat("yyyy-MM-dd");

  const suggestionsData = suggestions
    .sort((a, b) => a.time.toMillis() - b.time.toMillis())
    .map((suggestion) => ({
      ...suggestion,
      time: suggestion.time.toFormat("t"),
    }));

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
          dataSource={suggestionsData}
          className="mt-4"
          rowKey={(record) => record.activity}
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
