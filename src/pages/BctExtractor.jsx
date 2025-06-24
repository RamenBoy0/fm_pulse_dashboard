import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import DataTable from "../components/DataTable";
import Papa from "papaparse";

// colors
import { MAIN_BLUE } from "../constants/colors";
// icons
import { MdDownload } from "react-icons/md";

export default function BctExtractor() {
  const [buildingOwner, setBuildingOwner] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [tenderer, setTenderer] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  // to display extracted df
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);

  // to export
  const [csvText, setCsvText] = useState(""); // store raw CSV text for download

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setExcelFile(file);
      console.log("Selected file:", file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("file", excelFile);
    formData.append("building_owner", buildingOwner);
    formData.append("tenderer", tenderer);

    fetch("http://localhost:8000/bct_extractor", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) // because it's plain CSV text
      .then((csvText) => {
        setCsvText(csvText); // save csvText for export
        const parsed = Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
        });
        console.log(parsed.data); // array of objects

        if (parsed.data.length > 0) {
          const colNames = Object.keys(parsed.data[0]);
          setColumns(colNames);
        }

        setTableData(parsed.data);
      });
  };

  const handleDownload = () => {
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "extracted_data.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.headerText}>bct extractor</div>
      <div style={styles.formContainer}>
        <div style={styles.formRow}>
          <label style={styles.formLabel}>Building Owner:</label>
          <TextField
            id="building-owner"
            variant="outlined"
            size="small"
            value={buildingOwner}
            onChange={(e) => setBuildingOwner(e.target.value)}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.formLabel}>Tender Publish Date:</label>
          <TextField
            id="publish-date"
            variant="outlined"
            size="small"
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.formLabel}>Tenderer:</label>
          <TextField
            id="tenderer"
            variant="outlined"
            size="small"
            value={tenderer}
            onChange={(e) => setTenderer(e.target.value)}
          />
        </div>

        <div style={styles.formRow}>
          <label style={styles.formLabel}>BCT File:</label>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            style={{ flex: 1 }}
          />
        </div>
        <div style={styles.helperText}>Supported format: .xlsx</div>

        <Button
          style={{ marginTop: 30, backgroundColor: MAIN_BLUE }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      {csvText && (
        <Button
          style={{ marginTop: 10, marginLeft: 10, color: MAIN_BLUE }}
          variant="outlined"
          onClick={handleDownload}
          startIcon={<MdDownload />}
        >
          Download CSV
        </Button>
      )}
      {tableData.length > 0 && (
        <div style={styles.tableContainer}>
          <DataTable
            columns={columns}
            rows={tableData}
            defaultRowsPerPage={5}
          />
        </div>
      )}{" "}
    </div>
  );
}

const styles = {
  headerText: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
  },

  formLabel: {
    width: 160,
    marginRight: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    color: "#888",
  },
  tableContainer: {
    backgroundColor: "#F6F6F6",
    maxWidth: "85vw", // or any width you want to constrain to
    overflowX: "auto",
    maxHeight: "90vh", // vertical height constraint (px or any unit)
    overflowY: "auto", // vertical scroll if needed
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
};
