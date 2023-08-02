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
        <div className="col-xs-12 col-lg-3 col-md-6">
          <div
            className="card shadow bg-primary bg-opacity-25 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 fw-bolder text-primary">
              <i className="bi bi-envelope-open text-primary mx-2"></i>Open
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-primary mx-4 fw-bolder display-6">8</div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={8}
                    styles={buildStyles({
                      pathColor: "darkblue",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* w2 */}
        <div className="col-xs-12 col-lg-3 col-md-6">
          <div
            className="card shadow bg-warning bg-opacity-25 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 fw-bolder text-warning">
              <i className="bi bi-hourglass-split text-warning  mx-2"></i>
              Progress
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-warning mx-4 fw-bolder display-6">
                20
              </div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={8}
                    styles={buildStyles({
                      pathColor: "darkgoldenrod",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* w3*/}
        <div className="col-xs-12 col-lg-3 col-md-6">
          <div
            className="card shadow bg-success bg-opacity-25 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 text-success">
              <i className="bi bi-check2-circle text-success mx-2"></i>Closed
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-success mx-4 fw-bolder display-6">
                78
              </div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={8}
                    styles={buildStyles({
                      pathColor: "darkgreen",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* w4 */}
        <div className="col-xs-12 col-lg-3 col-md-6">
          <div
            className="card shadow bg-secondary bg-opacity-25 text-center"
            style={{ width: 15 + "rem" }}
          >
            <h5 className="card-subtitle my-2 text-secondary">
              <i className="bi bi-slash-circle text-secondary mx-2"></i>Blocked
            </h5>
            <hr />
            <div className="row mb-2 d-flex align-items-center">
              <div className="col text-secondary mx-4 fw-bolder display-6">
                50
              </div>
              <div className="col">
                <div style={{ width: 40, height: 40 }}>
                  <CircularProgressbar
                    value={80}
                    styles={buildStyles({
                      pathColor: "darkgrey",
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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