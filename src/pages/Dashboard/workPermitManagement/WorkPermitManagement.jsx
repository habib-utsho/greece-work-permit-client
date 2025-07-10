import { useEffect, useRef, useState } from "react";
import {
  Space,
  Table,
  Popconfirm,
  Button,
  Input,
  Form,
  message,
  Skeleton,
  Select,
} from "antd";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import useDebounce from "../../../hooks/useDebounce";
import {
  useCreateWorkPermitMutation,
  useDeleteWorkPermitMutation,
  useGetAllWorkPermitsQuery,
  useUpdateWorkPermitMutation,
} from "../../../redux/api/workPermit/workPermitApi";
import { uploadToCloudinary } from "../../../utils/handleUplaodImgToCloudinary";
import ViewWorkPermitModal from "../_components/ViewWorkPermitModal";
import CreateUpdateWorkPermitModal from "../_components/CreateUpdateWorkPermitModal";

const WorkPermitManagement = () => {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOccupationStatus, setSelectedOccupationStatus] =
    useState("All");
  const debounceSearch = useDebounce(searchTerm, 500);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const {
    data: workPermitData,
    refetch,
    isLoading,
    isFetching,
  } = useGetAllWorkPermitsQuery([
    { name: "page", value: pagination.page },
    { name: "limit", value: pagination.limit },
    ...(debounceSearch ? [{ name: "searchTerm", value: debounceSearch }] : []),
    ...(selectedOccupationStatus !== "All"
      ? [{ name: "occupationStatus", value: selectedOccupationStatus }]
      : []),
  ]);

  const [deleteWorkPermit, { isLoading: deleteLoading }] =
    useDeleteWorkPermitMutation();
  const [createWorkPermit, { isLoading: createLoading }] =
    useCreateWorkPermitMutation();
  const [updateWorkPermit, { isLoading: updateLoading }] =
    useUpdateWorkPermitMutation();

  const [editingPermit, setEditingPermit] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [isViewDetailsModalVisible, setIsViewDetailsModalVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState({ name: "hey" });

  useEffect(() => {
    if (editingPermit) {
      form.setFieldsValue(editingPermit);
    } else {
      // need here default values for the form - add suggest dummy text
      // TODO:temp
      // form.setFieldsValue({
      //   // userImg: null, // Reset image field
      //   applicationId: "test",
      //   dateOfApplication: "test",
      //   surName: "test",
      //   name: "test",
      //   fatherName: "test",
      //   motherName: "test",
      //   afm: "test",
      //   amka: "test",
      //   address: "test",
      //   city: "test",
      //   postalCode: "test",
      //   phoneNumber: "test",
      //   email: "test@gmail.com",
      //   password: "test",
      //   occupationStatus: "Μισθωτός",
      //   requestCategory: "test",
      //   destinationOffice: "test",
      //   appointmentDateTime: "test",
      // });
      form.resetFields();
    }
  }, [editingPermit, form]);

  // const handleFileChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   try {
  //     const url = await uploadToCloudinary(file);
  //     console.log("Uploaded to Cloudinary:", url);
  //     setImageUrl(url);
  //   } catch (err) {
  //     console.error("Cloudinary Upload Error:", err);
  //   }
  // };

  const handleAddPermit = async (values) => {
    try {
      let uploadedImgUrl = "";

      const file = values?.userImg;
      if (!file) {
        throw new Error("Please upload a valid image file.");
      }
      setFileUploadLoading(true);
      try {
        if (file) {
          // check if file is more than 500kb
          if (file && file.size > 500 * 1024) {
            throw new Error("File size exceeds 500KB limit.");
          }
          // Upload the file to Cloudinary
          uploadedImgUrl = await uploadToCloudinary(file);
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        message.error(
          error?.message || error || `Image upload failed. Please try again.`
        );
        return;
      } finally {
        setFileUploadLoading(false);
      }

      // console.log(uploadedImgUrl);

      values.userImg = uploadedImgUrl;
      const res = await createWorkPermit(values).unwrap();
      message.success(res?.message || "Permit created!");
      refetch();
      form.resetFields();
      setModalVisible(false);
    } catch (error) {
      console.log(error, "err");
      message.error(
        error?.data?.message ||
          error?.data?.errorSources?.[0]?.message ||
          error?.message ||
          "Creation failed!"
      );
    }
  };

  const handleUpdatePermit = async (values) => {
    try {
      const res = await updateWorkPermit({
        ...values,
        _id: editingPermit?._id,
      }).unwrap();
      message.success(res?.message || "Permit updated!");
      refetch();
      setModalVisible(false);
    } catch (error) {
      message.error(error?.data?.message || "Update failed!");
    }
  };

  const handleDeletePermit = async (record) => {
    try {
      const res = await deleteWorkPermit(record._id).unwrap();
      message.success(res?.message || "Deleted!");
      refetch();
    } catch (error) {
      message.error(error?.data?.message || "Delete failed!");
    }
  };

  const formFields = [
    {
      name: "userImg",
      label: (
        <p>
          User Image [Εικόνα Χρήστη]{" "}
          <strong className="text-red-500">(500 KB max)</strong>
        </p>
      ),
      type: "file",
      placeholder: "Paste image URL",
    },
    {
      name: "applicationId",
      label: "Application ID [Αριθμός Αίτησης]",
      type: "text",
      placeholder: "Enter application ID",
    },
    {
      name: "dateOfApplication",
      label: "Date of Application [Ημερομηνία Υποβολής]",
      type: "text",
      placeholder: "YYYY-MM-DD",
    },
    {
      name: "surName",
      label: "Surname [ΕΠΩΝΥΜΟ]",
      type: "text",
      placeholder: "Enter surname",
    },
    {
      name: "name",
      label: "Name [ΟΝΟΜΑ]",
      type: "text",
      placeholder: "Enter given name",
    },
    {
      name: "fatherName",
      label: "Father's Name [ΠΑΤΡΩΝΥΜΟ]",
      type: "text",
      placeholder: "Enter father's name",
    },
    {
      name: "motherName",
      label: "Mother's Name [ΜΗΤΡΩΝΥΜΟ]",
      type: "text",
      placeholder: "Enter mother's name",
    },
    {
      name: "afm",
      label: "AFM (Tax ID) [ΑΦΜ]",
      type: "text",
      placeholder: "Enter AFM",
    },
    {
      name: "amka",
      label: "AMKA (Social Security No) [ΑΜΚΑ]",
      type: "text",
      placeholder: "Enter AMKA",
    },
    {
      name: "address",
      label: "Address [ΤΑΧ. Δ/ΝΣΗ]",
      type: "text",
      placeholder: "Enter full address",
    },
    {
      name: "city",
      label: "City [ΠΟΛΗ]",
      type: "text",
      placeholder: "Enter city",
    },
    {
      name: "postalCode",
      label: "Postal Code [ΤΚ]",
      type: "text",
      placeholder: "Enter postal code",
    },
    {
      name: "phoneNumber",
      label: "Phone Number [ΑΡΙΘΜΟΣ ΤΗΛΕΦΩΝΟΥ]",
      type: "text",
      placeholder: "Enter phone number",
    },
    {
      name: "email",
      label: "Email [EMAIL]",
      type: "text",
      placeholder: "Enter email address",
    },
    {
      name: "password",
      label: "Password [Κωδικός Πρόσβασης]",
      type: "password",
      placeholder: "Enter password",
    },
    {
      name: "occupationStatus",
      label: "Occupation Status [ΙΔΙΟΤΗΤΑ ΑΙΤΟΥΝΤΟΣ]",
      type: "select",
      placeholder: "Select status",
      options: [
        { value: "Μισθωτός", label: "Μισθωτός (Employed)" },
        { value: "Άνεργος", label: "Άνεργος (Unemployed)" },
        {
          value: "Αυτοαπασχολούμενος",
          label: "Αυτοαπασχολούμενος (Self-employed)",
        },
      ],
    },
    {
      name: "requestCategory",
      label: "Request Category [ΚΑΤΗΓΟΡΙΑ ΑΙΤΗΜΑΤΟΣ]",
      type: "text",
      placeholder: "Enter category",
    },
    {
      name: "destinationOffice",
      label: "Destination Office [ΠΡΟΣ]",
      type: "text",
      placeholder: "Enter office name",
    },
    {
      name: "appointmentDateTime",
      label: "Appointment Date & Time [ΗΜΕΡΟΜΗΝΙΑ ΚΑΙ ΩΡΑ ΡΑΝΤΕΒΟΥ]",
      type: "text",
      placeholder: "YYYY-MM-DD HH:mm",
    },
  ];

  const columns = [
    {
      title: "Image",
      dataIndex: "userImg",
      render: (text) => (
        <img src={text} alt="User" style={{ width: 50, height: 50 }} />
      ),
    },
    { title: "App ID", dataIndex: "applicationId" },
    { title: "Email", dataIndex: "email" },
    { title: "Date", dataIndex: "dateOfApplication" },
    { title: "Name", dataIndex: "name" },
    { title: "Surname", dataIndex: "surName" },
    { title: "Category", dataIndex: "requestCategory" },
    {
      title: "Action",
      render: (_, record) => (
        <Space>
          <Button
            icon={<BsEye />}
            onClick={() => {
              setSelectedRecord(record);
              setIsViewDetailsModalVisible(true);
            }}
          >
            View
          </Button>

          <Button
            icon={<MdDriveFileRenameOutline />}
            onClick={() => {
              setEditingPermit(record);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDeletePermit(record)}
          >
            <Button danger icon={<RiDeleteBin6Line />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="px-4">
      <div className="flex justify-end my-5">
        {isLoading ? (
          <Skeleton.Input active />
        ) : (
          <Button
            type="primary"
            icon={<MdDriveFileRenameOutline />}
            onClick={() => {
              setEditingPermit(null);
              setModalVisible(true);
            }}
          >
            Add Work Permit
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="flex gap-4 justify-between mb-8 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Input.Search
            placeholder="Search name or ID"
            size="large"
            className="w-[300px]"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPagination({ page: 1, limit: 10 });
            }}
            allowClear
            enterButton
          />
          <Select
            value={selectedOccupationStatus}
            size="large"
            onChange={(val) => {
              setSelectedOccupationStatus(val);
              setPagination({ page: 1, limit: 10 });
            }}
            className="w-[300px]"
            options={[
              { label: "All", value: "All" },
              { label: "Μισθωτός (Employed)", value: "Μισθωτός" },
              { label: "Άνεργος (Unemployed)", value: "Άνεργος" },
              {
                label: "Αυτοαπασχολούμενος (Self-employed)",
                value: "Αυτοαπασχολούμενος",
              },
            ].map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
        </div>
      </div>

      <Table
        rowKey="_id"
        dataSource={workPermitData?.data}
        columns={columns}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: workPermitData?.meta?.total,
          onChange: (page, limit) => setPagination({ page, limit }),
        }}
        scroll={{
          x: 750,
        }}
        loading={isLoading || isFetching}
      />

      {/* Form Modal */}
      <CreateUpdateWorkPermitModal
        editingPermit={editingPermit}
        modalVisible={modalVisible}
        setEditingPermit={setEditingPermit}
        setModalVisible={setModalVisible}
        form={form}
        formFields={formFields}
        handleAddPermit={handleAddPermit}
        handleUpdatePermit={handleUpdatePermit}
        updateLoading={updateLoading}
        createLoading={createLoading}
        fileUploadLoading={fileUploadLoading}
      />
      {/* View Modal */}
      <ViewWorkPermitModal
        isViewDetailsModalVisible={isViewDetailsModalVisible}
        setIsViewDetailsModalVisible={setIsViewDetailsModalVisible}
        selectedRecord={selectedRecord}
        setSelectedRecord={setSelectedRecord}
        formFields={formFields}
      />
    </div>
  );
};

export default WorkPermitManagement;
