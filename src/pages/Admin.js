import { useState, useEffect } from "react";
import Widget from "../components/Widget";
import MaterialTable from "@material-table/core";
import Sidebar from "../components/Sidebar";
import ExportCsv from "@material-table/exporters/csv";
import ExportPdf from "@material-table/exporters/pdf";
import { fetchTicket, ticketUpdation } from "../api/tickets";
import { Modal, Button } from "react-bootstrap";

// put logic 
/*
1. Grab the curr ticket : ticket id , all the curr data along with it 
2. Store the curr Ticket in a state -> display the curr ticket details in the modal 
3. Grab the new updated values and store in a state
4. Fetch the api with the new updated data 
*/

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
  {
    title: "STATUS",
    field: "status",
    lookup: {
      APPROVED: "APPROVED",
      REJECTED: "REJECTED",
      PENDING: "PENDING",
    },
  },
];


  
function Admin() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketStatusCount, setTicketStatusCount] = useState({});
  const [ticketUpdationModal, setTicketUpdationModal] = useState(false);
  const [selectedCurrTicket, setSelectedCurrTicket] = useState({});

  // get api and stor the data

  // eslint-disable-next-line
  const [userDetails, setUserDetails] = useState([]);
  // open and close user modal

  // eslint-disable-next-line
  const [userUpdationModal, setUserUpdationModal] = useState(false);
  // store the curr user details and the updated user details

  // eslint-disable-next-line
  const [selectedCurrUser, setSelectedCurrUser] = useState({});

  const [message, setMessage] = useState("");

  const updateSelectedCurrTicket = (data) => setSelectedCurrTicket(data);

  // eslint-disable-next-line
  const openTicketUpdationModal = () => setTicketUpdationModal(true);
  const closeTicketUpdationModal = () => setTicketUpdationModal(false);

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchTickets = () => {
    fetchTicket()
      .then((response) => {
        setTicketDetails(response.data);
        updateTicketCount(response.data);
      })
      .catch((error) => setMessage(error.response.data.message));
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

  // Storing the curr ticket details in a state
  const editTicket = (ticketDetail) => {
    const ticket = {
      assignee: ticketDetail.assignee,
      description: ticketDetail.description,
      title: ticketDetail.title,
      id: ticketDetail.id,
      reporter: ticketDetail.reporter,
      status: ticketDetail.status,
      ticketPriority: ticketDetail.ticketPriority,
    };
    console.log("selected ticket", ticketDetail);
    setTicketUpdationModal(true);
    setSelectedCurrTicket(ticket);
  };

  // 3. grabbing the new updated data and storing it in a state
  const onTicketUpdate = (e) => {
    if (e.target.name === "ticketPriority")
      selectedCurrTicket.ticketPriority = e.target.value;
    else if (e.target.name === "status")
      selectedCurrTicket.status = e.target.value;
    else if (e.target.name === "description")
      selectedCurrTicket.description = e.target.value;

    updateSelectedCurrTicket(Object.assign({}, selectedCurrTicket));

    console.log(selectedCurrTicket);
  };

  //  4. Call the api with the new updated data
  const updateTicket = (e) => {
    e.preventDefault();
    ticketUpdation(selectedCurrTicket.id, selectedCurrTicket)
      .then(function (response) {
        console.log(response);
        // closing the modal
        setTicketUpdationModal(false);
        // fetching the tickets again to update the table and the widgets
        fetchTickets();
      })
      .catch(function (error) {
        setMessage(error.response.data.message);
      });
  };

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
          tickets={ticketStatusCount.pending}
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

        {/* error message for material table */}
      </div>
      <div className="text-center">
        <h5 className="text-info">{message}</h5>
      </div>

      {/* Material table container */}
      <div className="container">
        <MaterialTable
          // 1. grabbing the specific ticket from the row
          onRowClick={(event, rowData) => editTicket(rowData)}
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

        {ticketUpdationModal ? (
          <Modal
            show={ticketUpdationModal}
            onHide={closeTicketUpdationModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateTicket}>
                <div className="p-1">
                  <h5 className="card-subtitle mb-2 text-danger">
                    User ID : {selectedCurrTicket.id}{" "}
                  </h5>
                </div>

                <div className="input-group mb-2">
                  {/* If equal labels needed , set height and width for labelSize */}
                  <label className="label input-group-text label-md labelSize">
                    Title
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedCurrTicket.title}
                    className="form-control"
                  />
                </div>

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Reporter
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedCurrTicket.reporter}
                    className="form-control"
                  />
                </div>

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Assignee
                  </label>
                  <select className="form-control" name="assignee">
                    <option>Ashwin</option>
                  </select>
                </div>
                {/* Onchange : grabbing teh new updates values from UI  */}

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Priority
                  </label>
                  <input
                    type="number"
                    value={selectedCurrTicket.ticketPriority}
                    className="form-control"
                    name="ticketPriority"
                    onChange={onTicketUpdate}
                  />
                </div>

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Status
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    value={selectedCurrTicket.status}
                    onChange={onTicketUpdate}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                    <option value="CLOSED">CLOSED</option>
                    <option value="BLOCKED">BLOCKED</option>
                  </select>
                </div>

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Description
                  </label>
                  <textarea
                    type="text"
                    value={selectedCurrTicket.description}
                    onChange={onTicketUpdate}
                    className=" md-textarea form-control"
                    rows="3"
                    name="description"
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="m-1"
                    onClick={() => closeTicketUpdationModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}

        {userUpdationModal ? (
          <Modal
            show={userUpdationModal}
            onHide={closeTicketUpdationModal}
            backdrop="static"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update USER DETAILS</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* submit the details and we will call the api  */}
              <form
              // onSubmit={updateUser}
              >
                <div className="p-1">
                  <h5 className="card-subtitle mb-2 text-danger">User ID : </h5>
                </div>
                <div className="input-group mb-2">
                  {/* If equal labels needed , set height and width for labelSize */}
                  <label className="label input-group-text label-md labelSize">
                    Name
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Email
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Role
                  </label>
                  <input type="text" disabled className="form-control" />
                </div>
                {/* Onchange : grabbing the new updates value from UI  */}

                <div className="input-group mb-2">
                  <label className="label input-group-text label-md">
                    Status
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    value={selectedCurrTicket.status}
                    // onChange={onUserUpdate}
                  >
                    <option value="APPROVED">APPROVED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="m-1"
                    onClick={() => closeTicketUpdationModal}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        ) : null}
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
      <button
        className="btn btn-danger m-1"
        onClick={() => setUserUpdationModal(true)}
      >
        Update user details
      </button>
    </div>
  );
}

export default Admin;
