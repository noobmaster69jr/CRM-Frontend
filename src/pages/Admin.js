import Widget from '../components/Widget'
import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "title" },
  {title: "ASSIGNEE", field: "assignee"},
  { title: "PRIORITY", field: "title" },
  { title:"STATUS", field:"status", lookup:{
    "OPEN":"OPEN",
    "IN_PROGRESS":"IN_PROGRESS",
    "CLOSED":"CLOSED",
    "BLOCKED":"BLOCKED"

  }}
];

const userColumns = [
  { title: "ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  { title: "STATUS", field: "status" },
];

function Admin() {
  return (
    <div className="bg-light vh-100">
      <Sidebar />

      {/* welcome text container */}
      <div className="container">
        <h2 className="text text-center text-danger">Welcome Admin!</h2>
        <p className="text-muted lead  text-center">
          Take a quick look at your admin stats below
        </p>
      </div>
      {/* Widgets container */}
      <div className="row ms-5 ps-5 mb-5">
        {/* w1 */}
        <Widget
          widget="Open"
          tickets={8}
          icon="bi-envelope-open"
          progressBarColor="darkBlue"
          bgColor="bg-primary"
          textColor="text-primary"
        />
        {/* w2 */}
        <Widget
          widget="Progress"
          tickets={19}
          icon="bi-hourglass-split"
          progressBarColor="darkgoldenrod"
          bgColor="bg-warning"
          textColor="text-warning"
        />
        {/* w3*/}
        <Widget
          widget="Closed"
          tickets={45}
          icon="bi-check2-circle"
          progressBarColor="darkGreen"
          bgColor="bg-success"
          textColor="text-success"
        />
        {/* w4 */}

        <Widget
          widget="Blocked"
          tickets={20}
          icon="bi-slash-circle"
          progressBarColor="darkGrey"
          bgColor="bg-secondary"
          textColor="text-secondary"
        />
      </div>

      {/* Material table container */}
      <div className="container">
        <MaterialTable
          title="TICKET"
          columns={columns}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#d9534f",
              color: "#fff",
            },
            rowStyle: {
              backgroundColor: "#eee",
            },
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, data) => {
                  ExportPdf(cols, data, "ticketRecords");
                },
              },
              {
                label: "Export CSV",
                exportFunc: (cols, data) => {
                  ExportCsv(cols, data, "ticketRecords");
                },
              },
            ],
          }}
        />
        <hr />
        <MaterialTable
          title="USER DETAILS"
          columns={userColumns}
          options={{
            filtering: true,
            headerStyle: {
              backgroundColor: "#d9534f",
              color: "#fff",
            },
            rowStyle: {
              backgroundColor: "#eee",
            },
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "userRecords"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "userRecords"),
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Admin;