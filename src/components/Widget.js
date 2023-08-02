import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Widget = ({widget, icon,  tickets, progressBarColor, bgColor, textColor}) => {
  return (
    <>
      <div className="col-xs-12 col-lg-3 col-md-6 my-1">
        <div
          className={`card shadow ${bgColor} bg-opacity-25 text-center`}
          style={{ width: 15 + "rem" }}
        >
          <h5 className={`card-subtitle my-2 fw-bolder ${textColor}`}>
            <i className={`bi ${icon +" "+textColor} mx-2`}></i>{widget}
          </h5>
          <hr />
          <div className="row mb-2 d-flex align-items-center">
            <div className={`col ${textColor} mx-4 fw-bolder display-6`}>{tickets}</div>
            <div className="col">
              <div style={{ width: 40, height: 40 }}>
                <CircularProgressbar
                  value={tickets}
                  styles={buildStyles({
                    pathColor: progressBarColor,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Widget;