import { useState } from "react";
import MaterialTable from "@material-table/core";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import { Modal, ModalHeader } from "react-bootstrap";

import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";

/*
engineer signup -> contact admin to put them in approved state -> login 
*/

const columns = [
  {
    title: "ID",
    field: "id",
  },
  {
    title: "TITLE",
    field: "title",
  },
  {
    title: "REPORTER",
    field: "reporter",
  },
  {
    title: "DESCRIPTION",
    field: "description",
  },
  {
    title: "PRIORITY",
    field: "priority",
  },
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

function Engineer() {
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      <div className="container py-5">
        <h3 className="text-center text-primary">Welcome Engineer!</h3>
        <p className="lead text-muted text-center">
          {" "}
          Take a quick look at your engineer stats below!
        </p>
        {/* widget = title, icon, tickets = ticketcount, progressBarColor =pathColor, bgColor, textColor */}
        {/* Widgets starts : props : color, title, icon, ticketCount, pathColor */}
        <div className="row">
          <Widget
            bgColor="primary"
            widget="OPEN"
            icon="envelope-open"
            tickets="8"
            progressBarColor="darkblue"
            textColor= "primary"
          />
          <Widget
            bgColor="warning"
            widget="PROGRESS"
            icon="hourglass-split"
            tickets="80"
            progressBarColor="yellow"
            textColor="warning"
          />
          <Widget
            bgColor="success"
            widget="CLOSED"
            icon="check2-circle"
            tickets="23"
            progressBarColor="darkgreen"
            textColor="success"
          />
          <Widget
            bgColor="secondary"
            widget="BLOCKED"
            icon="slash-circle "
            tickets="43"
            progressBarColor="darkgrey"
            textColor="secondary"
          />
        </div>
        <hr />
        <MaterialTable
          columns={columns}
          title="TICKET ASSIGNED TO YOU"
          options={{
            filtering: true,
            exportMenu: [
              {
                label: "Export Pdf",
                exportFunc: (cols, data) =>
                  ExportPdf(cols, data, "Ticket Records"),
              },
              {
                label: "Export Csv",
                exportFunc: (cols, data) =>
                  ExportCsv(cols, data, "Ticket Records"),
              },
            ],
            headerStyle: {
              backgroundColor: "darkblue",
              color: "#fff",
            },
          }}
        />
        <button
          className="btn btn-primary m-1"
          onClick={() => setTicketUpdationModal(true)}
        >
          Edit Ticket
        </button>
        {ticketUpdationModal ? (
          <Modal
            show={ticketUpdationModal}
            onHide={() => setTicketUpdationModal(false)}
            backdrop="static"
            centered
          >
            <ModalHeader closeButton>
              <Modal.Title>UPDATE TICKET</Modal.Title>
            </ModalHeader>
            <Modal.Body>
              <form>
                <div className="p-1">
                  <h5 className="text-primary"> ID: </h5>
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    TITLE
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">
                    REPORTER
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default Engineer;
