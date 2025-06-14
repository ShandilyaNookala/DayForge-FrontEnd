import { useState } from "react";
import WorkRules from "../WorkRules/WorkRules";
import StandardWork from "../StandardWork/StandardWork";
import { TableBody, TableRow, TableCell, Button, Table } from "@mui/material";
import InputDate from "../../../global-components/InputDate/InputDate";
import { useRecords } from "../../../../contexts/RecordsContext";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";

export default function ChangedRecord({ taskId }) {
  const { changedRecordData, setRecordsData, setChangedRecordData } =
    useRecords();
  const [inputDate, setInputDate] = useState(
    new Date(changedRecordData?.nextDate)
  );
  const [work, setWork] = useState(changedRecordData?.work);

  async function handleSaveRecord() {
    const newWork = Array.isArray(work)
      ? work.filter((el) => el.checked).map((el) => el.id)
      : work;

    const data = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-or-create-record/${taskId}/${changedRecordData?.editId}`,
      {
        date: new Date(inputDate),
        work: newWork,
      }
    );

    setRecordsData(data.data);
    setChangedRecordData(null);
  }

  if (!changedRecordData) return null;

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <InputDate date={inputDate} setDate={setInputDate} />
          </TableCell>
          <TableCell>
            {Array.isArray(changedRecordData?.work) ? (
              <WorkRules work={work} setWork={setWork} />
            ) : (
              <StandardWork
                manualInputWork={work}
                onChangeManualInputWork={setWork}
              />
            )}
          </TableCell>
          <TableCell>
            <Button className="btn standard-btn" onClick={handleSaveRecord}>
              Save
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
