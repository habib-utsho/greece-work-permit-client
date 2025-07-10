/* eslint-disable react/prop-types */
import { Modal } from "antd";

const ViewWorkPermitModal = ({
  isViewDetailsModalVisible,
  setIsViewDetailsModalVisible,
  selectedRecord,
  setSelectedRecord,
  formFields,
}) => {
  return (
    <Modal
      title="Work Permit Details"
      open={isViewDetailsModalVisible}
      onCancel={() => {
        setSelectedRecord(null);
        setIsViewDetailsModalVisible(false);
      }}
      onOk={() => {
        setSelectedRecord(null);
        setIsViewDetailsModalVisible(false);
      }}
    >
      {selectedRecord && (
        <div className="space-y-2">
          {formFields?.map((field) => {
            if (field.name === "userImg") {
              return (
                <div
                  key={field.name}
                  className="flex items-center flex-col gap-2"
                >
                  <strong>{field.label}:</strong>
                  <img
                    src={selectedRecord[field.name]}
                    alt={field.label}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              );
            }
            return (
              <p key={field.name}>
                <strong>{field.label}:</strong> {selectedRecord[field.name]}
              </p>
            );
          })}
        </div>
      )}
    </Modal>
  );
};

export default ViewWorkPermitModal;
