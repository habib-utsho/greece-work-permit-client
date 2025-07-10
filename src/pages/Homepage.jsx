import { Button, Form, Input, message, Divider, Space, Table } from "antd";
import { Link } from "react-router-dom";
import Container from "../Components/ui/Container";
import { FaAngleRight } from "react-icons/fa";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Navbar from "../Header/Navbar";
import { useLazyGetSingleWorkPermitQuery } from "../redux/api/workPermit/workPermitApi";
import WorkPermitPDF from "../Components/WorkPermitPDF";

const Homepage = () => {
  const [form] = Form.useForm();
  const [language, setLanguage] = useState("en");
  const [getSingleWorkPermit, { data, isLoading }] =
    useLazyGetSingleWorkPermitQuery();
  const workPermitData = data?.data || {};
  const printContentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => printContentRef.current,
    documentTitle: `greece-work-permit-${workPermitData?.applicationId}`,
    removeAfterPrint: false,
  });

  const handleSubmitId = async ({ email, password }) => {
    try {
      if (!email || !password) {
        message.error("Please enter both ID and Password.");
        return;
      }
      const workPermit = await getSingleWorkPermit({
        email,
        password,
      }).unwrap();
      if (workPermit.success) {
        message.success(workPermit.message);
      }
    } catch (e) {
      message.error(e.data?.message);
    }
  };

  const t = {
    en: {
      login: "Login",
      email: "Email:",
      password: "Password:",
      enterEmail: "Enter ID here",
      enterPassword: "Enter password here",
      submit: "Login",
      welcome: "Hello",
      message: "Your work permit is ready to view! 🎉",
      print: "Print",
      tryAgain: "Try Again",
      instruction: "Please enter your TaxisNet credentials to log in.",
      footer:
        "Interoperability Center of the Ministry of Digital Governance (KE.D)",
    },
    gr: {
      login: "Σύνδεση",
      email: "Ηλεκτρονική διεύθυνση:",
      password: "Κωδικός:",
      enterEmail: "Εισαγάγετε το αναγνωριστικό εδώ",
      enterPassword: "Εισαγάγετε τον κωδικό πρόσβασης εδώ",
      submit: "Σύνδεση",
      welcome: "Γειά σου",
      message: "Η άδεια εργασίας σας είναι έτοιμη! 🎉",
      print: "Εκτύπωση",
      tryAgain: "Προσπάθησε ξανά",
      instruction:
        "Παρακαλώ εισάγετε τα διαπιστευτήριά σας στο TaxisNet για να συνδεθείτε.",
      footer:
        "Κέντρο Διαλειτουργικότητας του Υπουργείου Ψηφιακής Διακυβέρνησης (ΚΕΔ)",
    },
  };

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
          <button
            type="button"
            onClick={handlePrint}
            className="primary-btn !mx-auto !mt-2 w-[200px]"
          >
            {t[language].print}
          </button>
          <Button
            type="default"
            className="text-primary !mx-auto !mt-3 block"
            onClick={() => window.location.reload()}
          >
            {t[language].tryAgain}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="mx-6">
      {!data ? (
        <Container>
          <div className="my-4 rounded-md shadow-md bg-white pb-5">
            <Navbar />
            <div className="bg-[#537aa2] text-white py-6 flex items-center justify-between gap-4 px-4">
              <div></div>
              <div className="font-semibold text-2xl">{t[language].login}</div>
              <Button
                onClick={() => setLanguage(language === "en" ? "gr" : "en")}
                className="primary-btn border-none rounded-none relative -left-7 top-3"
              >
                {language === "en" ? "English" : "Greek"}
              </Button>
            </div>

            <div className="text-center space-y-2">
              <h2 className="font-semibold text-2xl">{t[language].login}</h2>
              <p>{t[language].instruction}</p>
            </div>

            <Divider className="my-4" />

            <Form
              form={form}
              layout="vertical"
              className="my-4 w-3/6 mx-auto"
              name="workPermitIdForm"
              onFinish={handleSubmitId}
              autoComplete="off"
            >
              <Form.Item
                label={t[language].email}
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder={t[language].enterEmail}
                  className="rounded-none"
                />
              </Form.Item>
              <Form.Item
                label={t[language].password}
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder={t[language].enterPassword}
                  className="rounded-none"
                />
              </Form.Item>

              <Button
                loading={isLoading}
                size="large"
                htmlType="submit"
                className="primary-btn rounded-none mx-auto"
                block
              >
                {t[language].submit} <FaAngleRight />
              </Button>
            </Form>

            <Link
              to="/"
              className="text-primary text-sm font-semibold text-center block mt-9"
            >
              {t[language].footer}
            </Link>
          </div>
        </Container>
      ) : (
        <div className="my-4 mb-8 px-4  py-8 rounded-md border border-primary flex items-center justify-center bg-white">
          <div className="text-center w-full">
            {/* Language toggle button */}
            <Button
              onClick={() => setLanguage(language === "en" ? "gr" : "en")}
              className="primary-btn border-none rounded-none ml-auto mb-4 float-right"
            >
              {language === "en" ? "English" : "Greek"}
            </Button>
            {/* Heading */}
            <div className="space-y-2 mb-8">
              <p className="font-semibold">
                {t[language].welcome}, {workPermitData?.name},
              </p>
              <h2 className="font-bold text-xl mb-4">{t[language].message}</h2>
            </div>
            {/* Table Preview */}
            <Table
              rowKey="_id"
              dataSource={[workPermitData]}
              columns={columns}
              // pagination={{
              //   current: pagination.page,
              //   pageSize: pagination.limit,
              //   total: workPermitData?.meta?.total,
              //   onChange: (page, limit) => setPagination({ page, limit }),
              // }}
              loading={isLoading}
            />
          </div>

          {/* PDF Component */}
          <WorkPermitPDF
            printContentRef={printContentRef}
            workPermitData={workPermitData}
          />
        </div>
      )}
    </div>
  );
};

export default Homepage;
