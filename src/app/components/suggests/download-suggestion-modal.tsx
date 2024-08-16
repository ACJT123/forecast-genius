import { ISuggested } from "@/app/types/suggested";
import { convertToUTC } from "@/app/util/date";
import { Table } from "antd";
import { DateTime } from "luxon";
import { Margin, usePDF } from "react-to-pdf";

type IDownloadSuggestionModal = {
  suggestions: ISuggested[];
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

  const f = suggestions.map((suggestion) => ({
    ...suggestion,
    startTime: convertToUTC(suggestion.startTime.toString()),
    endTime: convertToUTC(suggestion.endTime.toString()),
  }));

  const date = f[0].startTime.toFormat("yyyy-MM-dd");

  const suggestionsData = f
    .sort((a, b) => a.startTime.toMillis() - b.startTime.toMillis())
    .map((suggestion) => ({
      ...suggestion,
      time: `${suggestion.startTime.toFormat(
        "t"
      )} - ${suggestion.endTime.toFormat("t")}`,
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

  // add space after the all commas
  const storedLocation = localStorage.getItem("location")?.replace(/,/g, ", ");

  return (
    <>
      <div ref={targetRef}>
        <h1>Date: {date}</h1>
        {storedLocation && <h1>Location: {storedLocation}</h1>}

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
