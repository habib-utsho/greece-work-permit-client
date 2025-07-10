/* eslint-disable react/prop-types */
import { Button, Form, Modal, Spin } from "antd";
import MyInp from "../../../Components/ui/Form/MyInp";

const CreateUpdateWorkPermitModal = ({
  editingPermit,
  modalVisible,
  setEditingPermit,
  setModalVisible,
  form,
  formFields,
  handleAddPermit,
  handleUpdatePermit,
  updateLoading,
  createLoading,
  fileUploadLoading,
}) => {
  return (
    <Modal
      title={editingPermit ? "Update Work Permit" : "Add Work Permit"}
      open={modalVisible}
      onCancel={() => {
        setEditingPermit(null);
        setModalVisible(false);
        form.resetFields();
      }}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        onFinish={editingPermit ? handleUpdatePermit : handleAddPermit}
        layout="vertical"
        className="max-h-[600px] overflow-y-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formFields.map((field, i) => (
            <MyInp
              key={i}
              label={field.label}
              name={field.name}
              rules={[
                { required: true, message: `Please enter ${field.label}` },
              ]}
              placeholder={field.placeholder}
              // multiple={true}
              type={field.type}
              size="large"
              options={field.options || []}
              isUpdate={editingPermit}
            />
          ))}
        </div>
        <Form.Item className="mt-4">
          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            loading={
              editingPermit
                ? updateLoading || fileUploadLoading
                : createLoading || fileUploadLoading
            }
          >
            {editingPermit ? "Update" : "Add"} Work Permit
          </Button>
          {fileUploadLoading && (
            <h2 className="font-bold text-primary text-lg text-center mt-4">
              File uplaoding... <Spin />
            </h2>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateUpdateWorkPermitModal;
