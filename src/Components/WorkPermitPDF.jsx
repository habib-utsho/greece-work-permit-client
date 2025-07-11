/* eslint-disable react/prop-types */
import pdfHeader from "../assets/pdf_header_webp.webp";
import approved from "../assets/Approved.png";
import signature from "../assets/Signature.png";

const WorkPermitPDF = ({ printContentRef, workPermitData }) => {
  return (
    <div
      className={`font-bold bg-white min-h-screen text-black`}
      id="printContent"
      ref={printContentRef}
    >
      <div className="mx-[60px] py-4 space-y-3 !text-[13px]">
        {/* Header */}

        <div className=" ">
          <div className="text-sm font-semibold flex justify-between items-center gap-2 relative top-0">
            <p>e-ΕΦΚΑ Κλείσιμο ραντεβού Ηλεκτρονικό αίτημα εξυπηρέτησης</p>
            <a
              href="https://www.efka.gov.gr/rv.php"
              target="_blank"
              rel="noreferrer"
              className=""
            >
              https://oauth2gsisgr.vercel.app
            </a>
          </div>
          <div className="flex items-center justify-between w-full mt-10">
            <div>
              <img
                src={pdfHeader}
                alt="logo"
                className="h-auto w-[200px]  object-cover mb-6"
              />
              <p className="mt-4 text-[17px]">
                Αριθμός αίτησης: {workPermitData.applicationId}
              </p>
              <p className="text-[17px]">
                Ημερομηνία υποβολής: {workPermitData.dateOfApplication}
              </p>

              <h2 className="text-2xl font-bold mt-4">
                Έγκριση άδειας εργασίας
              </h2>
              <p className="text-[15px] font-bold mt-4">
                e-ΕΦΚΑ Κλείσιμο ραντεβού/ Ηλεκτρονικό αίτημα εξυπηρέτησης
              </p>
            </div>
            <div className="relative w-[160px] h-[180px]">
              <img
                src={workPermitData?.userImg}
                alt="Applicant"
                className="h-full w-full object-cover"
              />
              <img
                src={approved}
                alt="Approved"
                className="absolute bottom-[-65px] left-[10px] w-[140px]"
              />
            </div>
          </div>
        </div>

        {/* Application Details */}
        <h2 className="underline font-bold text-[16px]">ΣΤΟΙΧΕΙΑ ΑΙΤΟΥΝΤΟΣ:</h2>
        <div className="text-left text-sm font-normal mt-4 space-y-[10px]">
          {[
            ["ΕΠΩΝΥΜΟ", workPermitData.surName],
            ["ΟΝΟΜΑ", workPermitData.name],
            ["ΠΑΤΡΩΝΥΜΟ", workPermitData.fatherName],
            ["ΜΗΤΡΩΝΥΜΟ", workPermitData.motherName],
            ["ΑΦΜ", workPermitData.afm],
            ["ΑΜΚΑ", workPermitData.amka],
            ["ΤΑΧ. Δ/ΝΣΗ", workPermitData.address],
            ["ΠΟΛΗ", workPermitData.city],
            ["ΤΚ", workPermitData.postalCode],
            ["ΑΡΙΘΜΟΣ ΤΗΛΕΦΩΝΟΥ", workPermitData.phoneNumber],
            ["EMAIL", workPermitData.email],
            ["ΙΔΙΟΤΗΤΑ ΑΙΤΟΥΝΤΟΣ", workPermitData.occupationStatus],
            ["ΚΑΤΗΓΟΡΙΑ ΑΙΤΗΜΑΤΟΣ", workPermitData.requestCategory],
            ["ΠΡΟΣ", workPermitData.destinationOffice],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="font-bold w-[240px] text-[16px]">{label}:</span>
              <span className="flex-1 font-semibold text-[15.5px]">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Appointment Info */}
        <div className="text-left text-sm mt-4 font-semibold">
          <p className="my-4 text-[16px]">ΑΣΦΑΛΙΣΤΙΚΗ ΙΚΑΝΟΤΗΤΑ</p>
          <p className="flex gap-2 items-center">
            <p className="font-bold text-md">ΗΜΕΡΟΜΗΝΙΑ ΚΑΙ ΩΡΑ ΡΑΝΤΕΒΟΥ:</p>{" "}
            {workPermitData.appointmentDateTime}
          </p>
        </div>

        {/* Footer Signature */}
        <div className="flex justify-end">
          <img
            src={signature}
            alt="sig"
            className="h-auto w-[200px]  object-cover relative right-[100px]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-4 text-xs text-gray-600 absolute bottom-0 w-full">
        <p>1 of 1</p>
        <h2>{workPermitData.dateOfApplication}</h2>
      </div>
    </div>
  );
};

export default WorkPermitPDF;
