import { useState, useEffect } from "react";
import Widget from "../components/Widget";
import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import { fetchTicket } from "../api/tickets";

const columns = [
  { title: "ID", field: "id" },
  { title: "TITLE", field: "title" },
  { title: "DESCRIPTION", field: "description" },
  { title: "REPORTER", field: "reporter" },
  { title: "ASSIGNEE", field: "assignee" },
  { title: "PRIORITY", field: "ticketPriority" },
  {
    title: "STATUS",
    field: "status",
    lookup: {
      OPEN: "OPEN",
      IN_PROGRESS: "IN_PROGRESS",
      CLOSED: "CLOSED",
      BLOCKED: "BLOCKED",
    },
  },
];

const userColumns = [
  { title: "ID", field: "id" },
  { title: "NAME", field: "name" },
  { title: "EMAIL", field: "email" },
  { title: "ROLE", field: "userTypes" },
  { title: "STATUS", field: "status" },
];


  
function Admin() {
const [ticketDetails, setTicketDetails] = useState([]);
const [ticketStatusCount, setTicketStatusCount] = useState({});
  
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      })
      .catch((err) => console.log(err));
  };

  const updateTicketCount = (tickets) => {
    // filling this empty object with the ticket counts
    // Segrating the tickets in 4 properties according to the status of the tickets
    const data = {
      open: 0,
      closed: 0,
      progress: 0,
      blocked: 0,
    };

    tickets.forEach((x) => {
      if (x.status === "OPEN") {
        data.open += 1;
      } else if (x.status === "CLOSED") {
        data.closed += 1;
      } else if (x.status === "IN_PROGRESS") {
        data.progress += 1;
      } else {
        data.blocked += 1;
      }
    });

    setTicketStatusCount(Object.assign({}, data));
  };

  console.log("***", ticketStatusCount);



  return (
    <div className="bg-light vh-100">
      <Sidebar />

      {/* welcome text container */}
      <div className="container">
        <h2 className="text text-center text-danger">
          Welcome {localStorage.getItem("name")}
        </h2>
        <p className="text-muted lead  text-center">
          Take a quick look at your admin stats below
        </p>
      </div>
      {/* Widgets container */}
      <div className="row ms-5 ps-5 mb-5">
        {/* w1 */}
        <Widget
          widget="Open"
          tickets={ticketStatusCount.open}
          icon="bi-envelope-open"
          progressBarColor="dark"
          bgColor="bg-primary"
          textColor="text-primary"
        />
        {/* w2 */}
        <Widget
          widget="Progress"
          tickets={ticketStatusCount.progress}
          icon="bi-hourglass-split"
          progressBarColor="darkgoldenrod"
          bgColor="bg-warning"
          textColor="text-warning"
        />
        {/* w3*/}
        <Widget
          widget="Closed"
          tickets={ticketStatusCount.closed}
          icon="bi-check2-circle"
          progressBarColor="darkGreen"
          bgColor="bg-success"
          textColor="text-success"
        />
        {/* w4 */}

        <Widget
          widget="Blocked"
          tickets={ticketStatusCount.blocked}
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
          data={ticketDetails}
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
